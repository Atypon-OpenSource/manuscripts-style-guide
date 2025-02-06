/*!
 * © 2024 Atypon Systems LLC
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
import React, { useState } from 'react'
import styled from 'styled-components'

import { commonStyles } from './TextField'

// Styled Components
const Container = styled.div`
  ${commonStyles}

  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  padding: 0;
  background: hotpink


  &:hover Input {
    background-color: ${(props) => props.theme.colors.background.fifth};
  }
  &:has(Input:focus) {
    background-color: ${(props) => props.theme.colors.background.fifth};
    border-color: ${(props) => props.theme.colors.border.field.hover};
  }
`

const Chip = styled.span`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  color: ${(props) => props.theme.colors.text.primary};
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.border.tertiary};
  padding: ${(props) => props.theme.grid.unit}px;
  font-size: ${(props) => props.theme.font.size.small};
  line-height: ${(props) => props.theme.font.lineHeight.normal};

  & + Input {
    padding-left: 0;
  }
`

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
  color: white;
  background: #6e6e6e;
  margin-left: 4px;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  font-size: 10px;

  &:hover {
    background: black;
  }
`

const Input = styled.input`
  ${commonStyles}

  border: none;
  flex: 1;
  min-width: 6em;
  padding: 10px 16px;

  appearance: none;
  -moz-appearance: textfield;
  -webkit-appearance: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::-moz-appearance: textfield;
`

// Component
export interface MultiValueInputProps {
  id?: string
  inputType: 'text' | 'number'
  placeholder: string
  initialValues?: string[]
  onChange?: (values: string[]) => void
}

export const MultiValueInput: React.FC<MultiValueInputProps> = ({
  id,
  inputType,
  placeholder = '',
  initialValues = [],
  onChange,
}) => {
  const [values, setValues] = useState<string[]>(initialValues)
  const [currentValue, setCurrentValue] = useState<string>('')

  // Add a value when "Enter" is pressed
  const handleAddValue = (value: string) => {
    if (value.trim() && !values.includes(value.trim())) {
      const updatedValues = [...values, value.trim()]
      setValues(updatedValues)
      onChange?.(updatedValues)
    }
    setCurrentValue('')
  }

  // Handle typing in the input field and allow only numeric input if type is "number"
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (inputType === 'number' && /^\d*$/.test(value)) {
      setCurrentValue(value) // Allow only numbers if inputType is number
    } else if (inputType === 'text') {
      setCurrentValue(value) // Allow any value for text
    }
  }

  const handleBlur = () => {
    if (currentValue) {
      handleAddValue(currentValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddValue(currentValue)
    }
  }

  // Remove a value by index
  const handleRemoveValue = (index: number) => {
    const updatedValues = values.filter((_, i) => i !== index)
    setValues(updatedValues)
    onChange?.(updatedValues) // Notify parent component of the updated values
  }

  const xplaceholder = placeholder
    ? placeholder
    : inputType === 'number'
    ? 'Enter number and press enter'
    : 'Enter text and press enter'

  return (
    <Container>
      {values.map((value, index) => (
        <Chip key={index}>
          {value}
          <RemoveButton onMouseUp={() => handleRemoveValue(index)}>
            &times;
          </RemoveButton>
        </Chip>
      ))}
      <Input
        id={id}
        type={inputType} // Dynamically set input type based on prop
        value={currentValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder={xplaceholder}
      />
    </Container>
  )
}
