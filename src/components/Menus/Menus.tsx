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
              <SubmenusContainerWrapper>
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
              </SubmenusContainerWrapper>
            )}
          </MenuContainer>
        )
      })}
    </MenusContainer>
  )
}
