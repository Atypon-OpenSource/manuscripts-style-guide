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
import TriangleCollapsed from '../icons/triangle-collapsed'
import {
  Block,
  BlockItem,
  bulletListContextMenu,
  Label,
  ListContainer,
  orderedListContextMenu,
  StyleBlock,
} from './Menus'
import { Shortcut } from './Shortcut'

export const Text = styled.div`
  flex: 1 0 auto;
`

const SubmenuContainer = styled.div`
  position: relative;
`

export const SubmenusContainer = styled.div`
  background: #fff;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  box-shadow: 0 4px 9px 0 rgba(84, 83, 83, 0.3);
  color: #353535;
  min-width: 150px;
  padding: 4px 0;
  white-space: nowrap;
  width: auto;
  z-index: 10;

  position: absolute;

  &[data-placement='bottom-start'] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  &[data-placement='right-start'] {
    top: 8px;
  }
`

const NestedSubmenusContainer = styled(SubmenusContainer)`
  top: 0;
  left: 100%;
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

const Arrow = styled(TriangleCollapsed)`
  margin-left: 8px;
`

const Container = styled.div<{ isOpen: boolean }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  padding: 8px 16px 8px 4px;
  position: relative;
  ${(props) => props.isOpen && 'background: #f2fbfc;'}

  &:hover {
    background: #f2fbfc;
  }

  &.disabled {
    cursor: default;
    opacity: 0.4;
  }
`

const activeContent = (menu: Menu) => (menu.isActive ? '✓' : '')

interface SubmenuProps {
  menu: Menu | MenuSeparator
  handleClick: (position: number[]) => void
}

export const Submenu: React.FC<SubmenuProps> = ({ menu, handleClick }) => {
  if (isMenuSeparator(menu)) {
    return <Separator />
  }

  if (!menu.submenu && !menu.options) {
    return (
      <Container
        isOpen={menu.isOpen}
        className={menu.isEnabled ? '' : 'disabled'}
        onMouseDown={(e) => {
          e.preventDefault()
          handleClick([])
        }}
      >
        <Active>{activeContent(menu)}</Active>
        <Text>{menu.label}</Text>
        {menu.shortcut && <Shortcut shortcut={menu.shortcut} />}
      </Container>
    )
  }

  if (menu.options) {
    const styles =
      menu.id === 'bullet-list-context-menu'
        ? bulletListContextMenu
        : orderedListContextMenu

    return (
      <ListContainer>
        {styles.map((style, index) => (
          <StyleBlock
            key={index}
            onClick={() => {
              menu.options && menu.options[style.type]()
              handleClick([-1, -1])
            }}
          >
            {style.items.map((style, index) => (
              <BlockItem key={index}>
                <Label hide={style === '-'}>{style}</Label>
                <Block />
              </BlockItem>
            ))}
          </StyleBlock>
        ))}
      </ListContainer>
    )
  }

  return (
    <SubmenuContainer>
      <Container
        onMouseDown={(e) => {
          e.preventDefault()
          handleClick([])
        }}
        isOpen={menu.isOpen}
        className={menu.isEnabled ? '' : 'disabled'}
      >
        <Active>{activeContent(menu)}</Active>
        <Text>{menu.label}</Text>
        {menu.submenu && <Arrow />}
        {menu.shortcut && <Shortcut shortcut={menu.shortcut} />}
      </Container>
      {menu.submenu && menu.isOpen && (
        <NestedSubmenusContainer>
          {menu.submenu.map((submenu, index) => (
            <Submenu
              key={`menu-${index}`}
              menu={submenu}
              handleClick={(i) => handleClick([index, ...i])}
            />
          ))}
        </NestedSubmenusContainer>
      )}
    </SubmenuContainer>
  )
}
