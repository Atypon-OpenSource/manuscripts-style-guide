/*!
 * © 2024 Atypon Systems LLC
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

/**
 * Options for makeKeyboardActivatable function
 */
export interface MakeKeyboardActivatableOptions {
  /** Keys that trigger the handler. Default: ['Enter', ' '] */
  keys?: string[]
  /** Whether to prevent default behavior. Default: true */
  preventDefault?: boolean
  /** Whether to stop event propagation. Default: false */
  stopPropagation?: boolean
}

/**
 * Makes an element keyboard-activatable following ARIA button pattern.
 * Adds both click and keydown listeners to trigger the handler.
 *
 * @param element - The HTML element to make keyboard-activatable
 * @param handler - The function to call when activated
 * @param options - Optional configuration
 * @returns Cleanup function that removes all listeners
 *
 * @example
 * ```typescript
 * const cleanup = makeKeyboardActivatable(button, () => openMenu())
 * // Later: cleanup()
 * ```
 */
export function makeKeyboardActivatable(
  element: HTMLElement,
  handler: (event: Event) => void,
  options?: MakeKeyboardActivatableOptions
): () => void {
  const {
    keys = ['Enter', ' '],
    preventDefault = true,
    stopPropagation = false,
  } = options || {}

  const handleKeyDown = (event: KeyboardEvent) => {
    if (keys.includes(event.key)) {
      if (preventDefault) {
        event.preventDefault()
      }
      if (stopPropagation) {
        event.stopPropagation()
      }
      handler(event)
    }
  }

  element.addEventListener('click', handler)
  element.addEventListener('keydown', handleKeyDown)

  return () => {
    element.removeEventListener('click', handler)
    element.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Options for addArrowKeyNavigation function
 */
export interface AddArrowKeyNavigationOptions {
  /** Selector for navigable items. Default: '[tabindex]' */
  selector?: string
  /** Navigation direction. Default: 'both' */
  direction?: 'horizontal' | 'vertical' | 'both'
  /** Whether to loop at the ends. Default: true */
  loop?: boolean
  /** Whether to auto-focus first item on mount. Default: false */
  focusFirstOnMount?: boolean
  /** Callback when Escape key is pressed */
  onEscape?: () => void
  /** Additional custom key handlers */
  additionalKeys?: Record<
    string,
    (currentIndex: number, items: HTMLElement[]) => void
  >
}

/**
 * Adds arrow key navigation to a group of elements using the roving tabindex pattern.
 * Implements WAI-ARIA keyboard navigation guidelines.
 *
 * @param container - The container element holding navigable items
 * @param options - Optional configuration
 * @returns Cleanup function that removes all listeners
 *
 * @example
 * ```typescript
 * const cleanup = addArrowKeyNavigation(menu, {
 *   selector: '.menu-item',
 *   direction: 'vertical',
 *   loop: true,
 *   onEscape: () => closeMenu()
 * })
 * ```
 */
export function addArrowKeyNavigation(
  container: HTMLElement,
  options?: AddArrowKeyNavigationOptions
): () => void {
  const {
    selector = '[tabindex]',
    direction = 'both',
    loop = true,
    focusFirstOnMount = false,
    onEscape,
    additionalKeys = {},
  } = options || {}

  // Get all navigable items
  const getItems = (): HTMLElement[] => {
    return Array.from(container.querySelectorAll(selector)) as HTMLElement[]
  }

  // Initialize roving tabindex: first item is tabbable, others are not
  const initializeTabIndex = () => {
    const items = getItems()
    if (items.length === 0) {
      return
    }

    items.forEach((item, index) => {
      item.tabIndex = index === 0 ? 0 : -1
    })

    if (focusFirstOnMount) {
      items[0].focus()
    }
  }

  // Update tabindex when focus moves
  const updateTabIndex = (items: HTMLElement[], newIndex: number) => {
    items.forEach((item, index) => {
      item.tabIndex = index === newIndex ? 0 : -1
    })
  }

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    const items = getItems()
    if (items.length === 0) {
      return
    }

    const target = event.target as HTMLElement
    const currentIndex = items.indexOf(target)
    if (currentIndex === -1) {
      return
    }

    let nextIndex: number | null = null
    let shouldHandle = false

    // Arrow key navigation based on direction
    if (direction === 'horizontal' || direction === 'both') {
      if (event.key === 'ArrowRight') {
        shouldHandle = true
        nextIndex = currentIndex + 1
        if (nextIndex >= items.length) {
          nextIndex = loop ? 0 : items.length - 1
        }
      } else if (event.key === 'ArrowLeft') {
        shouldHandle = true
        nextIndex = currentIndex - 1
        if (nextIndex < 0) {
          nextIndex = loop ? items.length - 1 : 0
        }
      }
    }

    if (direction === 'vertical' || direction === 'both') {
      if (event.key === 'ArrowDown') {
        shouldHandle = true
        nextIndex = currentIndex + 1
        if (nextIndex >= items.length) {
          nextIndex = loop ? 0 : items.length - 1
        }
      } else if (event.key === 'ArrowUp') {
        shouldHandle = true
        nextIndex = currentIndex - 1
        if (nextIndex < 0) {
          nextIndex = loop ? items.length - 1 : 0
        }
      }
    }

    // Home/End keys
    if (event.key === 'Home') {
      shouldHandle = true
      nextIndex = 0
    } else if (event.key === 'End') {
      shouldHandle = true
      nextIndex = items.length - 1
    }

    // Escape key
    if (event.key === 'Escape' && onEscape) {
      event.preventDefault()
      onEscape()
      return
    }

    // Additional custom keys
    if (additionalKeys[event.key]) {
      event.preventDefault()
      additionalKeys[event.key](currentIndex, items)
      return
    }

    // Move focus if we handled a navigation key
    if (shouldHandle && nextIndex !== null && nextIndex !== currentIndex) {
      event.preventDefault()
      updateTabIndex(items, nextIndex)
      items[nextIndex].focus()
    }
  }

  // Initialize
  initializeTabIndex()

  // Add event listener
  container.addEventListener('keydown', handleKeyDown)

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}
