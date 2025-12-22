/*!
 * © 2019 Atypon Systems LLC
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

import React, { Ref, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { Menu } from '../../lib/menus'
import {
  Submenu,
  SubmenusContainer,
  SubmenusContainerWrapper,
  Text,
} from './Submenu'

const MenusContainer = styled.div`
  display: flex;
  font-size: 14px;
`

const MenuHeading = styled.div<{ isOpen: boolean }>`
  padding: 4px 8px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${(props) => props.theme.colors.outline.focus};
    outline-offset: -2px;
  }
`

const MenuContainer = styled.div<{ isEnabled: boolean }>`
  position: relative;

  & ${MenuHeading} {
    background-color: ${(props) => props.theme.colors.background.secondary};
    line-height: 24px;
    color: ${(props) => (props.isEnabled ? '#353535' : '#e2e2e2')};

    &:hover {
      background-color: ${(props) => (props.isEnabled ? '#f2fbfc' : '#fff')};
    }
  }
`

interface MenusProps {
  menus: Menu[]
  innerRef: Ref<HTMLDivElement>
  handleClick: (position: number[]) => void
  closeAll: () => void
}

export const Menus: React.FC<MenusProps> = ({
  menus,
  innerRef,
  handleClick,
  closeAll,
}) => {
  const menuHeadingsRef = useRef<(HTMLDivElement | null)[]>([])

  // Set roving tabindex: only first menu button is tabbable
  useEffect(() => {
    menuHeadingsRef.current.forEach((heading, index) => {
      if (heading) {
        heading.tabIndex = index === 0 ? 0 : -1
      }
    })
  }, [menus])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement

    const currentIndex = menuHeadingsRef.current.findIndex(
      (heading) => heading === target
    )

    if (currentIndex === -1) {
      return
    }

    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault()
        const nextIndex = (currentIndex + 1) % menuHeadingsRef.current.length
        menuHeadingsRef.current[nextIndex]?.focus()
        break
      }
      case 'ArrowLeft': {
        event.preventDefault()
        const prevIndex =
          (currentIndex - 1 + menuHeadingsRef.current.length) %
          menuHeadingsRef.current.length
        menuHeadingsRef.current[prevIndex]?.focus()
        break
      }
      case 'Enter': {
        event.preventDefault()
        handleClick([currentIndex])
        break
      }
      case 'Escape': {
        event.preventDefault()
        event.stopPropagation()
        closeAll()
        break
      }
      case 'ArrowDown': {
        event.preventDefault()
        const menu = menus[currentIndex]
        if (menu && !menu.isOpen) {
          handleClick([currentIndex])
        }
        // Focus first menu item after it opens
        const menuContainer = event.currentTarget.children[
          currentIndex
        ] as HTMLElement
        setTimeout(() => {
          const firstItem = menuContainer?.querySelector(
            '[data-submenu-item]'
          ) as HTMLElement
          firstItem?.focus()
        }, 0)
        break
      }
    }
  }

  return (
    <MenusContainer
      ref={innerRef}
      data-cy={'manuscript-menus'}
      onKeyDown={handleKeyDown}
    >
      {menus.map((menu, index) => {
        return (
          <MenuContainer
            data-cy={'menu'}
            key={`menu-${index}`}
            isEnabled={menu.isEnabled}
          >
            <MenuHeading
              ref={(el) => {
                menuHeadingsRef.current[index] = el
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                handleClick([index])
              }}
              isOpen={menu.isOpen}
            >
              <Text>{menu.label}</Text>
            </MenuHeading>

            {menu.isEnabled && menu.isOpen && menu.submenu && (
              <SubmenusContainerWrapper>
                <SubmenusContainer data-submenu-container tabIndex={-1}>
                  {menu.submenu.map((submenu, sindex) => {
                    return (
                      <Submenu
                        key={`${index}-${sindex}`}
                        menu={submenu}
                        handleClick={(i) => handleClick([index, sindex, ...i])}
                        closeAll={closeAll}
                      />
                    )
                  })}
                </SubmenusContainer>
              </SubmenusContainerWrapper>
            )}
          </MenuContainer>
        )
      })}
    </MenusContainer>
  )
}
