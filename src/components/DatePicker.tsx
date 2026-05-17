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

import 'react-datepicker/dist/react-datepicker.css'

import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'

import { CalendarIcon } from './icons'

export interface DatePickerProps {
  id?: string
  date?: Date
  originalDate?: Date
  handleDateChange: (date: Date | null) => void
  placeholder?: string
  showTimeSelect?: boolean
  required?: boolean
}

export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  originalDate,
  date,
  handleDateChange,
  placeholder,
  showTimeSelect,
  required,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(date || null)

  useEffect(() => {
    setSelectedDate(date ?? null)
  }, [date])

  const handleChange = (date: Date | null) => {
    setSelectedDate(date)
    handleDateChange(date)
  }

  const format = showTimeSelect
    ? 'd MMM yyyy, EEEE h:mm aa'
    : 'd MMM yyyy, EEEE'

  return (
    <Calendar>
      <ReactDatePicker
        id={id}
        selected={selectedDate}
        onChange={handleChange}
        placeholderText={placeholder}
        minDate={originalDate}
        showTimeSelect={showTimeSelect}
        dateFormat={format}
        className="calendar-input"
        popperPlacement="bottom"
        required={required}
      />
      <IconWrapper>
        <CalendarIcon width={16} height={16} />
      </IconWrapper>
    </Calendar>
  )
}

const Calendar = styled.div`
  width: 100%;
  position: relative;
  display: block;

  .react-datepicker {
    display: flex;
    padding: ${(props) => props.theme.grid.unit * 5}px;
    font-size: ${(props) => props.theme.font.size.normal};
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block;
    width: 100% !important;

    input::placeholder {
      color: ${(props) =>
        props.theme.colors.text.greyMuted ||
        props.theme.colors.text.secondary ||
        '#6E6E6E'};
      opacity: 1;
      font-family: 'PT Sans', sans-serif;
      font-size: ${(props) => props.theme.font.size.medium};
      font-style: italic;
      font-weight: ${(props) => props.theme.font.weight.normal};
      line-height: ${(props) => props.theme.font.lineHeight.large};
    }

    input:focus::placeholder {
      color: ${(props) =>
        props.theme.colors.text.greyLight || '#C9C9C9'} !important;
      opacity: 1 !important;
    }
  }

  .react-datepicker__header {
    background-color: unset;
    border: unset;
  }

  .react-datepicker__day.react-datepicker__day--disabled {
    color: #ccc;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: #000000cc;
    padding: ${(props) => props.theme.grid.unit}px;
  }

  .react-datepicker__day-names .react-datepicker__day-name {
    color: #d4d4d4;
  }

  .react-datepicker__time {
    .react-datepicker__time-box {
      width: 95px;

      .react-datepicker__time-list {
        overflow-y: unset;
      }
    }
  }

  h2.react-datepicker__current-month {
    padding-bottom: ${(props) => props.theme.grid.unit * 5}px;
    font-weight: 400;
    font-size: ${(props) => props.theme.font.size.medium};
  }

  .react-datepicker[aria-label='Choose Date and Time'] {
    .react-datepicker__navigation--next {
      right: 150px;
    }
  }

  .react-datepicker__navigation--next {
    right: 65px;
    top: 24px;
  }

  .react-datepicker__navigation--previous {
    left: 65px;
    top: 24px;
  }

  .react-datepicker__day--selected {
    border: 1px solid rgb(188, 231, 246);
    background-color: rgb(242, 251, 252);
    border-radius: 50%;
  }

  .react-datepicker__day:not(.-selected):hover {
    border-radius: 50%;
    background-color: rgb(242, 251, 252);
  }

  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle {
    fill: white;
    color: white;
  }

  .react-datepicker__day--outside-month {
    visibility: hidden;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: unset;
  }

  .calendar-input {
    width: 100%;
    box-sizing: border-box;
    min-height: 40px;
    border-radius: 3px;
    font: ${(props) => props.theme.font.weight.normal}
      ${(props) => props.theme.font.size.medium} / 1
      ${(props) => props.theme.font.family.sans};
    line-height: ${(props) => props.theme.font.lineHeight.large};
    padding: 0 ${(props) => props.theme.grid.unit * 10}px 0
      ${(props) => props.theme.grid.unit * 4}px;
    text-align: start;
    border: 1px solid ${(props) => props.theme.colors.border.field.default};
    color: ${(props) => props.theme.colors.text.primary};
    outline: 0;
    background-color: #fff;

    &::placeholder {
      color: ${(props) =>
        props.theme.colors.text.greyMuted ||
        props.theme.colors.text.secondary ||
        '#6E6E6E'};
      opacity: 1;
      font-family: 'PT Sans', sans-serif;
      font-size: ${(props) => props.theme.font.size.medium};
      font-style: italic;
      font-weight: ${(props) => props.theme.font.weight.normal};
      line-height: ${(props) => props.theme.font.lineHeight.large};
    }

    &:focus {
      border: 2px solid ${(props) => props.theme.colors.brand.default};
      background-color: #f2fbfc;
      padding: 0 ${(props) => props.theme.grid.unit * 10 - 1}px 0
        ${(props) => props.theme.grid.unit * 4 - 1}px;
      outline: none;
    }

    &:hover {
      border-color: ${(props) => props.theme.colors.text.greyMuted};
      background-color: #f2fbfc;
    }
  }
`

const IconWrapper = styled.div`
  position: absolute;
  right: ${(props) => props.theme.grid.unit * 3}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  color: ${(props) => props.theme.colors.border.secondary};
`
