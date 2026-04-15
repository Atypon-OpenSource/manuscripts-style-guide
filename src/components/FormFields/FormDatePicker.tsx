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

import { DatePicker } from '../DatePicker'
import { FormFieldContainer } from '../FormFieldContainer'

export interface DatePickerFieldProps {
  name: string
  label: string
  required?: boolean
  showTimeSelect?: boolean
  info?: string
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  name,
  showTimeSelect = false,
  info,
  required,
}) => {
  const [field, meta, helpers] = useField(name)
  const error = meta.touched && meta.error ? meta.error : undefined

  const handleChange = (date: Date | null) => {
    let formattedDate = ''
    if (date) {
      formattedDate = showTimeSelect
        ? date.toISOString().split('.')[0] + 'Z'
        : date.toISOString().split('T')[0] + 'T00:00:00Z'
    }
    helpers.setValue(formattedDate)
  }

  return (
    <FormFieldContainer label={label} error={error} info={info} id={name}>
      <DatePicker
        date={field.value ? new Date(field.value) : undefined}
        handleDateChange={handleChange}
        placeholder={`Select ${label}`}
        showTimeSelect={showTimeSelect}
        required={required}
      />
    </FormFieldContainer>
  )
}
