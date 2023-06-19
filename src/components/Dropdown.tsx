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
import styled from 'styled-components'

export const DropdownList = styled.div<{
  direction?: 'left' | 'right'
  width?: number
  height?: number
  top?: number
}>`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.3);
  background: ${(props) => props.theme.colors.background.primary};
  width: ${(props) => (props.width ? props.width + 'px' : 'auto')};
  ${(props) => props.height && `max-height: ${props.height}px`};
  ${(props) => (props.direction === 'right' ? ' right: 0' : 'left : 0')};
  top: ${(props) => props.theme.grid.unit * (props.top || 3)}px;
  position: absolute;
  z-index: 10;
  justify-content: space-evenly;
`

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

export const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  background: none;

  &:focus {
    outline: none;
  }
`
