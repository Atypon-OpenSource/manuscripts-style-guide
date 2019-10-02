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
import { styled } from '../styled-components'

const Input = styled.input`
    position: absolute;
    left: -9999px;
    opacity: 0;

    + label {
      cursor: pointer;
      margin: 0;
      display: inline-block;
      font-size: ${props => props.theme.font.size.large};
      color: ${props => props.theme.colors.text.primary};
      line-height: ${props => props.theme.font.lineHeight.large};
      margin-bottom: 4px;
      position: relative;
      padding-left: 28px;
      text-align: left;

      &::before {
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 1px
          ${props => props.theme.colors.border.field.default};
        box-sizing: border-box;
        content: ' ';
        display: block;
        height: 18px;
        position: absolute;
        left: 0;
        top: 4px;
        width: 18px;
        z-index: 0;
      }
    }

    &:checked + label::before {
      background: ${props => props.theme.colors.brand.default};
    }
    &:hover,
    &:focus {
      + label::before {
      }
    }
  }
`

interface RadioProps {
  checked?: boolean
  id: string
  label: string
  name: string
}

export const RadioButton: React.FunctionComponent<RadioProps> = ({
  checked,
  id,
  label,
  name,
}) => (
  <>
    <Input checked={checked} type="radio" name={name} id={id} />
    <label htmlFor={id}>{label}</label>
  </>
)
