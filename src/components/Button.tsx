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

import { styled } from '../styled-components'

export const Button = styled.button.attrs({
  type: 'button',
})`
  background-color: transparent;
  color: ${props => props.theme.colors.button.primary};
  border: 2px solid transparent;
  border-radius: 4px;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1px 10px 3px;
  font-family: ${props => props.theme.fontFamily};
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => (props.disabled ? 'text' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.5' : '1.0')};
  transition: border 0.1s, color 0.1s, background-color 0.1s;
  white-space: nowrap;

  &:hover:disabled {
    background-color: transparent;
    color: ${props => props.theme.colors.button.primary};
    border-color: transparent;
  }

  &:hover {
    background-color: transparent;
    color: ${props => props.theme.colors.button.primary};
    border-color: ${props => props.theme.colors.button.primary};
  }

  &:active {
    background-color: ${props => props.theme.colors.button.primary};
    border-color: ${props => props.theme.colors.button.primary};
    color: white;
  }
`

export const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.button.primary};
  color: white;

  &:hover {
    border-color: ${props => props.theme.colors.button.primary};
  }

  &:hover:disabled {
    border-color: ${props => props.theme.colors.button.primary};
    color: white;
    background-color: ${props => props.theme.colors.button.primary};
    cursor: unset;
  }
`

export const PrimarySubmitButton = styled(PrimaryButton).attrs({
  type: 'submit',
})``

export const DangerButton = styled(Button)`
  border-color: ${props => props.theme.colors.button.danger};
  color: ${props => props.theme.colors.button.danger};

  &:hover {
    background-color: ${props => props.theme.colors.button.danger};
    border-color: ${props => props.theme.colors.button.danger};
    color: white;
  }

  &:active {
    background-color: ${props => props.theme.colors.button.danger};
    border-color: ${props => props.theme.colors.button.danger};
    color: transparent;
  }

  &:hover:disabled {
    border-color: ${props => props.theme.colors.button.danger};
    color: ${props => props.theme.colors.button.danger};
  }
`

export const DangerSubmitButton = styled(DangerButton).attrs({
  type: 'submit',
})``

export const GreyButton = styled(Button)`
  color: ${props => props.theme.colors.button.secondary};
  background-color: transparent;

  &:hover {
    background-color: transparent;
    border-color: ${props => props.theme.colors.button.primary};
    color: ${props => props.theme.colors.button.primary};
  }

  &:active {
    border-color: transparent;
    background-color: transparent;
    color: ${props => props.theme.colors.button.secondary};
  }

  &:hover:disabled {
    color: ${props => props.theme.colors.button.secondary};
    background-color: transparent;
  }
`

export const IconButton = styled.button.attrs({
  type: 'button',
})<{ size?: number }>`
  border: none;
  background: none;
  cursor: pointer;

  width: ${props => props.size || 64}px;
  height: ${props => props.size || 64}px;

  & img {
    width: 100%;
    height: 100%;
  }
`

export const MiniButton = styled(Button)`
  padding: 0 7px;
  margin: 0 5px;
  height: 20px;
  font-size: 12px;
  border-radius: 5px;
`

export const PrimaryMiniButton = styled(PrimaryButton)`
  padding: 0 7px;
  margin: 0 5px;
  height: 20px;
  font-size: 12px;
  border-radius: 5px;
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button:not(:first-child) {
    margin-left: 4px;
  }
`
