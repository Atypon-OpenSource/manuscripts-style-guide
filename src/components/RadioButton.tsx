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
import styled from 'styled-components'

const Input = styled.input`
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

  + label {
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    align-items: center;
    font-family: ${(props) => props.theme.font.family.sans};
    font-size: ${(props) => props.theme.font.size.normal};
    font-weight: ${(props) => props.theme.font.weight.normal};
    color: ${(props) => props.theme.colors.text.primary};
    line-height: 20px;
    margin-bottom: ${(props) => props.theme.grid.unit}px;
    position: relative;
    padding-left: 24px;
    text-align: left;
    user-select: none;

    &::before {
      border: 1.5px solid ${(props) => props.theme.colors.border.field.default};
      border-radius: 50%;
      box-sizing: border-box;
      content: ' ';
      display: block;
      height: 16px;
      width: 16px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background: ${(props) => props.theme.colors.background.primary};
    }
  }

  &:checked + label::before {
    background: ${(props) => props.theme.colors.background.primary};
    box-shadow: inset 0 0 0 4px #0d79d0;
    border-color: #0d79d0;
  }

  &:hover:not(:disabled) + label::before {
    border-color: ${(props) => props.theme.colors.text.secondary};
  }

  &:focus-visible + label::before {
    border-color: #0d79d0;
  }

  &:disabled + label {
    color: ${(props) => props.theme.colors.text.secondary};
    cursor: not-allowed;
  }

  &:disabled + label::before {
    background: #c9c9c9;
    filter: grayscale(1) opacity(0.4);
    border-color: #e4e4e4;
  }
`

interface RadioProps {
  checked?: boolean
  id: string
  label: string | React.ReactNode
  name?: string
}

export const RadioButton: React.FunctionComponent<RadioProps> = ({
  checked,
  id,
  label,
  name,
  ...rest
}) => (
  <>
    <Input checked={checked} type="radio" name={name} id={id} {...rest} />
    <label htmlFor={id}>{label}</label>
  </>
)
