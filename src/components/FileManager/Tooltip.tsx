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
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

export const Tooltip = styled(ReactTooltip)`
  &.tooltip {
    font-size: 12px;
    line-height: 16px;
    font-family: ${(props) => props.theme.font.family.Lato};
    padding: 8px;
    border-radius: 6px;
    background: #353535;
    color: ${(props) => props.theme.colors.text.onDark};
    text-align: center;
    white-space: nowrap;
    pointer-events: none;

    &.place-bottom::after {
      background: #353535;
    }
  }
`
