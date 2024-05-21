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

import React, { Ref } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'

import { Menu } from '../../lib/menus'
import { Submenu, SubmenusContainer, Text } from './Submenu'

const MenusContainer = styled.div`
  display: flex;
  font-size: 14px;
`

const MenuHeading = styled.div<{ isOpen: boolean }>`
  padding: 4px 8px;
  cursor: pointer;
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
}

export const Menus: React.FC<MenusProps> = ({
  menus,
  innerRef,
  handleClick,
}) => {
  return (
    <MenusContainer ref={innerRef}>
      {menus.map((menu, index) => {
        return (
          <MenuContainer key={`menu-${index}`} isEnabled={menu.isEnabled}>
            <MenuHeading
              onMouseDown={(e) => {
                e.preventDefault()
                handleClick([index])
              }}
              isOpen={menu.isOpen}
            >
              <Text>{menu.label}</Text>
            </MenuHeading>

            {menu.isEnabled && menu.isOpen && menu.submenu && (
              <SubmenusContainer>
                {menu.submenu.map((submenu, sindex) => {
                  return (
                    <Submenu
                      key={`${index}-${sindex}`}
                      menu={submenu}
                      handleClick={(i) => handleClick([index, sindex, ...i])}
                    />
                  )
                })}
              </SubmenusContainer>
            )}
          </MenuContainer>
        )
      })}
    </MenusContainer>
  )
}

export const orderedListContextMenu = [
  { items: ['1.', '2.', '3.'], type: 'order' },
  { items: ['A.', 'B.', 'C.'], type: 'alpha-upper' },
  { items: ['a.', 'b.', 'c.'], type: 'alpha-lower' },
  { items: ['I.', 'II.', 'III.'], type: 'roman-upper' },
  { items: ['i.', 'ii.', 'iii.'], type: 'roman-lower' },
]

export const bulletListContextMenu = [
  { items: ['•', '•', '•'], type: 'bullet' },
  { items: ['-', '-', '-'], type: 'simple' },
]

export const ListContainer = styled.div`
  padding: ${(props) => props.theme.grid.unit * 4}px;
  display: grid;
  grid-template-columns:
    ${(props) => props.theme.grid.unit * 21}px
    ${(props) => props.theme.grid.unit * 21}px;
  gap: 6px;
`

export const StyleBlock = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border.tertiary};
  padding: ${(props) => props.theme.grid.unit * 2}px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  row-gap: ${(props) => props.theme.grid.unit * 2}px;

  &:hover {
    background: ${(props) => props.theme.colors.button.default.border.hover};
  }

  &:active {
    border-color: ${(props) => props.theme.colors.border.primary};
  }
`

export const BlockItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const Block = styled.div`
  height: 3px;
  width: ${(props) => props.theme.grid.unit * 14}px;
  background: ${(props) => props.theme.colors.border.tertiary};
`

export const Label = styled.div<{ hide?: boolean }>`
  font-family: Lato, serif;
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: ${(props) => props.theme.font.weight.normal};
  line-height: ${(props) => props.theme.font.lineHeight.small};
  font-style: normal;
  color: ${(props) => (props.hide && 'white') || 'initial'};
`
