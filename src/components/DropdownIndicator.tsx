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

import ArrowDownBlack from '@manuscripts/assets/react/ArrowDownBlack'
import { styled } from '../styled-components'

interface Props {
  color?: string
  size?: string
  isOpen?: boolean
  encircled?: boolean
}

export const DropdownIndicator = styled(ArrowDownBlack)<Props>`
  width: ${props => props.size || '2rem'};
  height: ${props => props.size || '2rem'};
  font-size: ${props => props.size || '2rem'};
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'none')};

  path {
    stroke: ${props =>
      props.color || props.theme.colors.alertMessage.info.text};
  }

  border-radius: 0.5em;
  padding: 0.1em;
  border: 2px solid
    ${props =>
      props.encircled
        ? props.color || props.theme.colors.alertMessage.info.text
        : 'transparent'};
`
