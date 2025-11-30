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

import React from 'react'
import styled from 'styled-components'

import { isMenuSeparator, Menu, MenuSeparator } from '../../lib/menus'
import { TriangleCollapsedIcon } from '../icons'
import { Shortcut } from './Shortcut'

export const Text = styled.div`
  flex: 1 0 auto;
`

export const SubmenuContainer = styled.div``
export const SubmenusContainerWrapper = styled.div`
  position: absolute;
  z-index: 10;
  min-width: 150px;
  width: auto;
`
export const SubmenusContainer = styled.div`
  background: #fff;
  color: #353535;
  white-space: nowrap;
  max-height: 70vh;
  overflow: auto;
  padding: 4px 0;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  box-shadow: 0 4px 9px 0 rgba(84, 83, 83, 0.3);

  &[data-placement='bottom-start'] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  &[data-placement='right-start'] {
    top: 8px;
  }
`

export const NestedSubmenusContainer = styled(SubmenusContainer)`
  position: absolute;
  top: 0;
  left: 100%;
  overflow: visible;
`

const Separator = styled.div`
  height: 0;
  border-bottom: 1px solid #e2e2e2;
  margin: 4px 0;
`

const Active = styled.div`
  width: 16px;
  display: inline-flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`

const Arrow = styled(TriangleCollapsedIcon)`
  margin-left: 8px;
`

const Container = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 16px 8px 4px;
  outline: none;
  ${(props) => props.isOpen && 'background: #f2fbfc;'}

  &:hover, &:focus {
    background: #f2fbfc;
  }

  &.disabled {
    cursor: default;
    opacity: 0.4;
  }
`

const activeContent = (menu: Menu) => (menu.isActive ? '✓' : '')

export interface SubmenuProps {
  menu: Menu | MenuSeparator
  handleClick: (position: number[]) => void
  closeAll: () => void
}

export const SubmenuLabel: React.FC<SubmenuProps> = ({
  menu,
  handleClick,
  closeAll,
}) => {
  if (isMenuSeparator(menu)) {
    return null
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isMenuSeparator(menu)) {
      return
    }

    const currentElement = e.currentTarget
    const submenuContainer = currentElement.closest('[data-submenu-container]')

    if (!submenuContainer) {
      return
    }

    const items = submenuContainer
      ? (Array.from(
          submenuContainer.querySelectorAll('[data-submenu-item]')
        ) as HTMLElement[])
      : []
    const currentIndex = items.indexOf(currentElement)

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        e.stopPropagation()
        const nextIndex = currentIndex + 1
        const nextItem = items[nextIndex] || items[0]
        nextItem?.focus()
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        e.stopPropagation()
        const prevIndex = currentIndex - 1
        const prevItem = items[prevIndex] || items[items.length - 1]
        prevItem?.focus()
        break
      }
      case 'ArrowRight': {
        if (menu.submenu) {
          e.preventDefault()
          e.stopPropagation()
          handleClick([])
        }
        break
      }
      case 'ArrowLeft': {
        e.preventDefault()
        e.stopPropagation()

        // Find parent submenu container (going up from current container)
        const currentContainer = currentElement.closest(
          '[data-submenu-container]'
        )
        const parentContainer = currentContainer?.parentElement?.closest(
          '[data-submenu-container]'
        )

        if (parentContainer) {
          const parentLabel = parentContainer.querySelector(
            ':scope > [data-submenu-item]'
          ) as HTMLElement
          parentLabel?.focus()
        } else {
          // At top level: go back to main menu heading
          const menuContainer = currentElement.closest('[data-cy="menu"]')
          const menuHeading = menuContainer?.querySelector(
            '[tabindex]'
          ) as HTMLElement
          menuHeading?.focus()
        }
        break
      }
      case 'Escape': {
        e.preventDefault()
        e.stopPropagation()
        closeAll()
        // Return focus to menu heading
        const menuContainer = currentElement.closest(
          '[data-cy="menu"]'
        ) as HTMLElement
        const menuHeading = menuContainer?.querySelector(
          '[tabindex]'
        ) as HTMLElement
        menuHeading?.focus()

        break
      }
      case 'Enter': {
        e.preventDefault()
        e.stopPropagation()
        if (menu.isEnabled) {
          handleClick([])
        }
        break
      }
    }
  }

  return (
    <Container
      isOpen={menu.isOpen}
      data-cy={'submenu'}
      data-submenu-item
      className={menu.isEnabled ? '' : 'disabled'}
      tabIndex={-1}
      onMouseDown={(e) => {
        e.preventDefault()
        handleClick([])
      }}
      onKeyDown={handleKeyDown}
    >
      <Active>{activeContent(menu)}</Active>
      <Text>{menu.label}</Text>
      {menu.submenu && <Arrow />}
      {menu.shortcut && <Shortcut shortcut={menu.shortcut} />}
    </Container>
  )
}

export const Submenu: React.FC<SubmenuProps> = ({
  menu,
  handleClick,
  closeAll,
}) => {
  if (isMenuSeparator(menu)) {
    return <Separator />
  }

  if (menu.component) {
    return <menu.component menu={menu} handleClick={handleClick} />
  }

  if (!menu.submenu) {
    return (
      <SubmenuLabel menu={menu} handleClick={handleClick} closeAll={closeAll} />
    )
  }

  return (
    <SubmenuContainer data-cy={'submenu'}>
      <SubmenuLabel menu={menu} handleClick={handleClick} closeAll={closeAll} />
      {menu.submenu && menu.isOpen && (
        <NestedSubmenusContainer data-submenu-container>
          {menu.submenu.map((submenu, index) => (
            <Submenu
              key={`menu-${index}`}
              menu={submenu}
              handleClick={(i) => handleClick([index, ...i])}
              closeAll={closeAll}
            />
          ))}
        </NestedSubmenusContainer>
      )}
    </SubmenuContainer>
  )
}
