/*!
 * © 2026 Atypon Systems LLC
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

import React, { FC } from 'react'
import styled from 'styled-components'

import { RadioButton } from './RadioButton'

export interface StyledRadioGroupOption {
  label: string
  value: string
}

export interface StyledRadioGroupProps {
  name: string
  options: StyledRadioGroupOption[]
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.grid.unit * 4}px;
  padding: ${(props) => props.theme.grid.unit * 2}px 0;

  & > * {
    margin-right: ${(props) => props.theme.grid.unit * 4}px;
    &:last-child {
      margin-right: 0;
    }
  }
`

export const StyledRadioGroup: FC<StyledRadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  disabled,
}) => {
  return (
    <RadioWrapper>
      {options.map((option, index) => (
        <RadioButton
          key={index}
          name={name}
          id={`${name}-option-${index}`}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          onChange={onChange}
          disabled={disabled}
        />
      ))}
    </RadioWrapper>
  )
}
