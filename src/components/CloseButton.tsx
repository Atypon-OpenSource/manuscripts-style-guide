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

import Closeblue from '@manuscripts/assets/react/Closeblue'
import React from 'react'
import { styled } from '../styled-components'

interface Props {
  onClick: () => void
  color?: string
  size?: string
  encircled?: boolean
}

const Button = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  color: ${props => props.color || props.theme.colors.alertMessage.error.text};
  width: ${props => props.size || '2rem'};
  height: ${props => props.size || '2rem'};
  font-size: ${props => props.size || '2rem'};
  line-height: 1;
  cursor: pointer;

  border: ${props =>
    props.encircled
      ? `2px solid ${props.color || props.theme.colors.alertMessage.error.text}`
      : 'none'};
  border-radius: 50%;
`

const CloseIcon = styled(Closeblue)<{
  color?: string
}>`
  background: transparent;
  border: none;
  width: 0.5em;
  height: 0.5em;

  rect {
    fill: ${props => props.color || props.theme.colors.alertMessage.error.text};
  }
`

export const CloseButton: React.FC<Props> = props => (
  <Button type="button" {...props}>
    <CloseIcon color={props.color} />
  </Button>
)
