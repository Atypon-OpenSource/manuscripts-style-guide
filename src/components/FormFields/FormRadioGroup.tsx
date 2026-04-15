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
import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useField } from 'formik'

import { FormFieldContainer } from '../FormFieldContainer'
import { RadioButton } from '../RadioButton'

export interface RadioGroupOption {
  label: string
  value: string
}

export interface FormRadioGroupProps {
  name: string
  label: string
  options: RadioGroupOption[]
  info?: string
}

export const FormRadioGroup: FC<FormRadioGroupProps> = ({
  label,
  options,
  name,
  info,
}) => {
  const [field, meta, helpers] = useField(name)
  const error = meta.touched && meta.error ? meta.error : undefined

  useEffect(() => {
    if (!field.value && options.length > 0) {
      helpers.setValue(options[0].value)
    }
  }, [field.value, options, helpers])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(e.target.value)
  }

  return (
    <FormFieldContainer label={label} error={error} info={info} id={name}>
      <RadioWrapper>
        {options.map((option, index) => (
          <RadioButton
            key={index}
            name={name}
            id={`${name}-option-${index}`}
            label={option.label}
            value={option.value}
            checked={field.value === option.value}
            onChange={handleChange}
          />
        ))}
      </RadioWrapper>
    </FormFieldContainer>
  )
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
