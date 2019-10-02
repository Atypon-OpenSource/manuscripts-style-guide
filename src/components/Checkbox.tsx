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

/*!
 * © 2019 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Check from '@manuscripts/assets/react/Check'
import React from 'react'
import { styled } from '../styled-components'

export const CheckboxLabel = styled.label`
  input {
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  div {
    align-items: center;
    color: ${props => props.theme.colors.text.tertiary};
    display: flex;
    flex-wrap: nowrap;
    line-height: 16px;
    margin: 16px 0 8px;

    &::before {
      content: ' ';
      display: inline-block;
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      border: 1px solid ${props => props.theme.colors.border.field.default};
      border-radius: 4px;
      margin-right: 1em;
      text-align: center;
    }
  }

  input:checked + div::before {
    background: ${props =>
      props.theme.colors.button.primary.background.default};
    border-color: ${props => props.theme.colors.button.primary.border.default};
    color: white;
    content: '✓';
  }

  input:focus + div {
    border-color: ${props => props.theme.colors.button.primary.border.hover};
  }
`

export const CheckboxField = styled.input.attrs({
  type: 'checkbox',
})<{ type?: string }>``
