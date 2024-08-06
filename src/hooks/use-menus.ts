/*!
 * © 2020 Atypon Systems LLC
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
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  isMenuSeparator,
  Menu,
  MenuPointer,
  MenuSeparator,
  MenuSpec,
} from '../lib/menus'

const initialPointer = [-1, -1, -1] as MenuPointer

const transformPointer =
  (depth: number, index: number) => (pointer: MenuPointer) =>
    pointer.map((pointerPart, i) => {
      if (i === depth) {
        return index
      }
      if (i > depth) {
        return -1
      }
      return pointerPart
    }) as MenuPointer

const isPart = (pointer: MenuPointer, position: number[]) => {
  const limit = position.length < 3 ? position.length : 3
  for (let i = 0; i < limit; i++) {
    if (position[i] !== pointer[i]) {
      return false
    }
  }
  return true
}

const getSubmenuState = (
  specs: (MenuSpec | MenuSeparator)[],
  pointer: MenuPointer,
  position: number[]
): (Menu | MenuSeparator)[] => {
  return specs.map((spec, index) => {
    if (isMenuSeparator(spec)) {
      return spec
    }
    const current = [...position, index]
    return {
      ...spec,
      submenu: spec.submenu && getSubmenuState(spec.submenu, pointer, current),
      isOpen: isPart(pointer, current),
    } as Menu
  })
}
const getMenuState = (specs: MenuSpec[], pointer: MenuPointer): Menu[] => {
  return specs.map((spec, index) => {
    const position = [index]
    return {
      ...spec,
      submenu: spec.submenu && getSubmenuState(spec.submenu, pointer, position),
      isOpen: isPart(pointer, position),
    } as Menu
  })
}

const getMenuAt = (
  state: (Menu | MenuSeparator)[],
  position: number[]
): Menu | undefined => {
  const [head, ...tail] = position.filter((i) => i !== -1)
  const menu = state[head]
  if (isMenuSeparator(menu)) {
    return
  }

  if (!tail.length) {
    return menu
  } else if (menu.submenu) {
    return getMenuAt(menu.submenu, tail)
  }
}

export const useMenus = (menus: MenuSpec[]) => {
  const [pointer, setPointer] = useState(initialPointer)
  const state = getMenuState(menus, pointer)

  const handleClick = useCallback(
    (indices: number[]) => {
      const menu = getMenuAt(state, indices)

      if (!menu || !menu.isEnabled) {
        return
      }

      if (menu.run) {
        menu.run()
        setPointer([-1, -1, -1])
      } else if (menu.submenu) {
        const depth = indices.length - 1
        const index = indices[depth]
        setPointer(transformPointer(depth, index))
      }
    },
    [state]
  )

  /*
   ** Ref to wrap the menu itself:
   */
  const ref = useRef<HTMLDivElement>(null)

  /*
   ** Bind click handler to close on click outside of the menu
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Element)) {
        setPointer([-1, -1, -1])
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return {
    menus: state,
    handleClick,
    ref,
  }
}
