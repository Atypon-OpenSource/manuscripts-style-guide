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
import { RefObject, useEffect } from 'react'

export function getFocusableElements(element: HTMLElement) {
  const selectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
  ]
  return Array.from(element.querySelectorAll(selectors.join(','))).filter(
    (el) => {
      // Filter out hidden elements
      const style = window.getComputedStyle(el)
      return (
        el instanceof HTMLElement &&
        el.offsetParent &&
        style.visibility !== 'hidden' &&
        style.display !== 'none'
      )
    }
  ) as HTMLElement[]
}

/** Creates focus cycling within a container element */
export function trapFocus(e: KeyboardEvent, element: HTMLElement | null) {
  if (
    e.key !== 'Tab' ||
    !element ||
    !element?.contains(document.activeElement)
  ) {
    return
  }

  // Get all currently focusable elements (visible and enabled)
  const focusableElements = getFocusableElements(element)

  if (focusableElements.length === 0) {
    return
  }

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement as HTMLElement

  // Tab forward from last element → loop to first
  if (!e.shiftKey && activeElement === lastElement) {
    e.preventDefault()
    firstElement.focus()
  }
  // Shift+Tab backward from first element → loop to last
  else if (e.shiftKey && activeElement === firstElement) {
    e.preventDefault()
    lastElement.focus()
  }
}

/**
 * Creates focus cycling within a container element.
 * When Tab reaches the last focusable element, focus loops back to the first.
 * When Shift+Tab reaches the first element, focus loops back to the last.
 */
export const useFocusCycle = (
  containerRef: RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      trapFocus(e, containerRef.current as HTMLElement)

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [containerRef])
}
