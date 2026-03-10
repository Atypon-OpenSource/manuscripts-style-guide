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

import { DatePicker } from '../DatePicker'
import { FormFieldContainer } from '../FormFieldContainer'

type CalendarDatePickerProps = {
  date?: Date
  originalDate?: Date
  handleDateChange: (name: string, date: string) => void
  placeholder?: string
  name: string
  showTimeSelect?: boolean
  required?: boolean
}

export const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  originalDate,
  date,
  handleDateChange,
  placeholder,
  name,
  showTimeSelect,
  required,
}) => {
  const handleChange = (date: Date | null) => {
    if (date) {
      let formattedDate: string

      if (showTimeSelect) {
        formattedDate = date.toISOString().split('.')[0] + 'Z'
      } else {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        formattedDate = `${year}-${month}-${day}T00:00:00Z`
      }

      handleDateChange(name, formattedDate)
    } else {
      handleDateChange(name, '')
    }
  }

  return (
    <DatePicker
      date={date}
      originalDate={originalDate}
      handleDateChange={handleChange}
      placeholder={placeholder}
      showTimeSelect={showTimeSelect}
      required={required}
    />
  )
}

export type DatePickerFieldProps = Omit<
  CalendarDatePickerProps,
  'date'
> & {
  label?: string
  value?: string
  error?: string
  disabled?: boolean
  required?: boolean
  showTimeSelect?: boolean
  info?: string
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  originalDate,
  handleDateChange,
  error,
  placeholder,
  name,
  showTimeSelect,
  info,
  required,
}) => (
  <FormFieldContainer label={label} error={error} info={info} id={name}>
    <CalendarDatePicker
      originalDate={originalDate}
      showTimeSelect={showTimeSelect}
      placeholder={placeholder}
      date={value ? new Date(value) : undefined}
      name={name}
      handleDateChange={handleDateChange}
      required={required}
    />
  </FormFieldContainer>
)
