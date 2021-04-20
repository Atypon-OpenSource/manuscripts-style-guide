/*!
 * © 2021 Atypon Systems LLC
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

export const ActionsBox = styled.ul`
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  min-width: 180px;
  background: ${(props) => props.theme.colors.background.primary};
  margin: 0;
  padding: 8px 0;
  z-index: 999;
  text-align: left;
  list-style-type: none;
`

export const ActionsItem = styled.li`
  font-family: ${(props) => props.theme.font.family.Lato};
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.text.primary};
  list-style: none;
  padding: 8px 16px;
  &:hover,
  &:focus {
    background: #f2fbfc;
  }
`

export const ActionsLabel = styled.li`
  font-family: ${(props) => props.theme.font.family.Lato};
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.theme.colors.text.onLight};
  list-style: none;
  padding: 8px 16px;
  cursor: default;
`

export const ActionsSeparator = styled.li`
  height: 1px;
  background: ${(props) => props.theme.colors.background.tertiary};
  margin: 8px 0;
  cursor: default;
`
