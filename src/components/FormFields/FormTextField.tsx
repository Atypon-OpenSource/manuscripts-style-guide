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
import React from 'react'
import { useField } from 'formik'

import { FormFieldContainer } from '../FormFieldContainer'
import { TextField, TextFieldProps } from '../TextField'

export interface FormTextFieldProps extends Omit<TextFieldProps, 'error' | 'value' | 'onChange' | 'onBlur'> {
  name: string
  label: string
  required?: boolean
  info?: string
}

export const FormTextField: React.FC<FormTextFieldProps> = ({
  label,
  required,
  info,
  name,
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(name)
  const error = meta.touched && meta.error ? meta.error : undefined

  return (
    <FormFieldContainer label={label} error={error} info={info} id={name}>
      <TextField 
        id={name} 
        required={required} 
        error={error} 
        placeholder={placeholder || `Type ${label}`}
        {...field} 
        {...props}
      />
    </FormFieldContainer>
  )
}
