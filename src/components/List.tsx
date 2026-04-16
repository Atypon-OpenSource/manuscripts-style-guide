/*!
 * © 2026 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, {
  ComponentType,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react'
import styled from 'styled-components'

import { outlineStyle } from './Button'
import { getFocusableElements, trapFocus } from '../hooks/use-focus-cycle'

function mergeRefs<T>(
  ...refs: (React.Ref<T | null> | undefined)[]
): (instance: T | null) => void {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.RefObject<T | null>).current = value
      }
    })
  }
}

/** This to keep focus on the list in case list item has a focusable element
 *  - Tab of the last child in current list item will move to the next list item
 *  - Tab+Shift of the first child will return focus to current list item
 */
function handleTabWithinListItem(e: KeyboardEvent, items: HTMLElement[]) {
  if (e.key !== 'Tab') {
    return false
  }

  const activeElement = document.activeElement as HTMLElement
  const currentItem = activeElement.closest<HTMLElement>('[data-list-item]')
  const isOnInternalElement =
    currentItem &&
    currentItem !== activeElement &&
    currentItem.contains(activeElement)
  if (currentItem && isOnInternalElement) {
    const focusableElements = getFocusableElements(currentItem)
    const currentIndex = focusableElements.indexOf(activeElement)
    const isFirstElement = currentIndex === 0
    const isLastElement = currentIndex === focusableElements.length - 1
    if (e.shiftKey && isFirstElement) {
      e.preventDefault()
      currentItem.focus()
      return true
    } else if (!e.shiftKey && isLastElement) {
      const currentIndex = items.indexOf(currentItem)
      const nextItem = items[currentIndex + 1]
      if (nextItem) {
        e.preventDefault()
        nextItem.focus()
        return true
      }
    }
  }
  return false
}

/** HOC for styled element that add keyboard navigation from arrow keys */
export function withListNavigation<P extends object>(
  Component: ComponentType<P>
) {
  return styled(
    forwardRef<HTMLElement, P>((props, forwardedRef) => {
      const containerRef = useRef<HTMLElement | null>(null)
      const tappingOutIndex = useRef(0)

      const getListItems = useCallback((): HTMLElement[] => {
        const element = containerRef.current
        if (!element) {
          return []
        }
        return Array.from(element.querySelectorAll('[data-list-item]'))
      }, [])

      const getColumnCount = useCallback(() => {
        const element = containerRef.current
        if (!element) {
          return 1
        }
        const gridStyle = window.getComputedStyle(element)
        return gridStyle
          .getPropertyValue('grid-template-columns')
          .split(' ')
          .filter((val) => val !== '').length
      }, [])

      // TODO:: replace that with the `navigation-utils.ts` in LEAN-5122
      const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
          const items = getListItems()

          const handled = handleTabWithinListItem(e, items)
          if (handled) {
            return
          }

          const currentIndex = items.indexOf(
            document.activeElement as HTMLElement
          )
          const element = containerRef.current
          const columnCount = getColumnCount()

          if (currentIndex === -1 || !element) {
            return
          }
          let newIndex = currentIndex
          switch (e.key) {
            case 'ArrowUp': {
              e.preventDefault()
              newIndex =
                (currentIndex - columnCount + items.length) % items.length
              break
            }
            case 'ArrowDown': {
              e.preventDefault()
              newIndex = (currentIndex + columnCount) % items.length
              break
            }
            case 'ArrowLeft': {
              if (columnCount > 1) {
                e.preventDefault()
                newIndex = (currentIndex - 1 + items.length) % items.length
              }
              break
            }
            case 'ArrowRight': {
              if (columnCount > 1) {
                e.preventDefault()
                newIndex = (currentIndex + 1) % items.length
              }
              break
            }
            case 'Tab': {
              tappingOutIndex.current = currentIndex
              break
            }
          }
          if (currentIndex !== newIndex) {
            items[currentIndex].setAttribute('tabindex', '-1')
            items[newIndex].setAttribute('tabindex', '0')
            items[newIndex].focus()
          }
        },
        [getListItems, getColumnCount, containerRef]
      )

      /** reset tabindex to the first item in the list */
      const handelOnBlur = useCallback(() => {
        if (tappingOutIndex.current) {
          const items = getListItems()
          items[tappingOutIndex.current].setAttribute('tabindex', '-1')
          items[0].setAttribute('tabindex', '0')
          tappingOutIndex.current = 0
        }
      }, [getListItems])

      useLayoutEffect(() => {
        const element = containerRef.current
        if (!element) {
          return
        }

        const firstItem = element.querySelector<HTMLElement>('[data-list-item]')
        if (!firstItem) {
          return
        }

        if (firstItem.tabIndex === 0) {
          return
        }

        const tabbedElement = element.querySelector<HTMLElement>(
          '[data-list-item][tabindex="0"]'
        )
        if (tabbedElement) {
          tabbedElement.tabIndex = -1
        }
        // reset tabIndex to the first element
        firstItem.tabIndex = 0
      })

      return (
        <Component
          ref={mergeRefs(containerRef, forwardedRef)}
          {...(props as P)}
          onKeyDown={handleKeyDown}
          onBlur={handelOnBlur}
        />
      )
    })
  )`
    outline: none;
  `
}

/** HOC for styled element that adds:
 * + add common style for focused item
 * + fire click event on Enter key
 * + add tabindex for the first initial list item */
export function withNavigableListItem<P extends object>(
  Component: ComponentType<P>
) {
  return styled(
    forwardRef<HTMLElement, P>((props, forwardedRef) => {
      const listItemRef = useRef<HTMLElement | null>(null)

      const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const listItem = listItemRef.current
        const element = e.target
        if (element && listItem && element === listItem && e.key === 'Enter') {
          const interactiveElements = [
            'BUTTON',
            'A',
            'INPUT',
            'TEXTAREA',
            'SELECT',
          ]
          if (!interactiveElements.includes(listItem.tagName)) {
            e.preventDefault()
            listItem.click()
          }
        }
      }, [])

      return (
        <Component
          tabIndex={-1}
          data-list-item
          ref={mergeRefs(listItemRef, forwardedRef)}
          onKeyDown={handleKeyDown}
          {...(props as P)}
        />
      )
    })
  )`
    &:not([disabled]):focus-visible {
      background-color: ${(props) => props.theme.colors.background.fifth};
    }
    ${outlineStyle}
  `
}

/** HOC for styled element to make sure focus stays trapped in this container view */
export function withFocusTrap<P extends object>(Component: ComponentType<P>) {
  return forwardRef<HTMLElement, P>((props, forwardedRef) => {
    const containerRef = useRef<HTMLElement | null>(null)

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => trapFocus(e, containerRef.current),
      []
    )

    return (
      <Component
        ref={mergeRefs(containerRef, forwardedRef)}
        onKeyDown={handleKeyDown}
        {...(props as P)}
      />
    )
  })
}
