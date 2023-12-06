/*!
 * © 2023 Atypon Systems LLC
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
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

import { add, format, intervalToDuration } from 'date-fns'
import React, { useCallback, useMemo, useState } from 'react'
import DatePicker, {
  Day,
  DayValue,
  RenderInputProps,
} from 'react-modern-calendar-datepicker'
import styled from 'styled-components'

import { Category, Dialog, MessageContainer } from '../Dialog'

const calendarGetDay = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
})

const calendarPotentialDueDate = (
  stepDueDate: Date,
  dueDate: Day,
  submissionDueDate: Date
) => {
  const duration = intervalToDuration({
    start: stepDueDate,
    end: new Date(
      `${dueDate.year}-${
        dueDate.month < 10 ? `0${dueDate.month}` : dueDate.month
      }-${dueDate.day < 10 ? `0${dueDate.day}` : dueDate.day}`
    ),
  })
  return add(submissionDueDate, duration)
}

const calendarDatePickerDefaultDateFormat = 'd MMM, EEEE'

type CalendarDatePickerConfigs = {
  color?: string
  position?: 'auto' | 'top' | 'bottom'
  calendarClassName?: string
  selectedDayClassName?: string
}

type CalendarDialogConfigs = {
  header?: string
  dueDateMessage?: string
}

type CalendarDatePickerProps = {
  currentDueDate: Date
  originalDueDate: Date
  handleDateChange: (day: DayValue) => void
  datePickerConfigs?: CalendarDatePickerConfigs
  dialogConfigs?: CalendarDialogConfigs
  Button: React.FC<RenderInputProps>
  primaryButtonTitle?: string
  secondaryButtonTitle?: string
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  Button,
  handleDateChange,
  originalDueDate,
  currentDueDate,
  datePickerConfigs,
  dialogConfigs,
  primaryButtonTitle = 'Reschedule',
  secondaryButtonTitle = 'Cancel',
}) => {
  datePickerConfigs = {
    position: 'bottom',
    color: '#f2fbfc',
    selectedDayClassName: 'selected-day',
    calendarClassName: 'responsive-calendar',
    ...datePickerConfigs,
  }

  const dialog = Object.assign({}, dialogConfigs, {
    header: 'Change the task due date?',
  })

  const [dueDate, setDueDate] = useState<DayValue | undefined>()
  const [toggleDialog, setToggleDialog] = useState<boolean>(false)

  const onConfirmClick = useCallback(() => {
    handleDateChange(dueDate)
    setToggleDialog(false)
  }, [dueDate, setToggleDialog, handleDateChange])

  const formattedDueDate = useMemo(
    () =>
      dueDate &&
      format(
        new Date(dueDate.year, dueDate.month, dueDate.day),
        calendarDatePickerDefaultDateFormat
      ),
    [dueDate]
  )
  const formattedPotentialDueDate = useMemo(
    () =>
      dueDate &&
      format(
        calendarPotentialDueDate(currentDueDate, dueDate, originalDueDate),
        calendarDatePickerDefaultDateFormat
      ),
    [originalDueDate, currentDueDate, dueDate]
  )

  const onDatePickerChange = useCallback((date: DayValue) => {
    setDueDate(date)
    setToggleDialog(true)
    const button = document.querySelector(
      '.DatePicker button'
    ) as HTMLButtonElement
    button.blur()
  }, [])

  return (
    <>
      <Calendar>
        <DatePicker
          value={calendarGetDay(currentDueDate)}
          onChange={onDatePickerChange}
          calendarPopperPosition={datePickerConfigs.position}
          colorPrimary={datePickerConfigs.color}
          calendarSelectedDayClassName={datePickerConfigs.selectedDayClassName}
          calendarClassName={datePickerConfigs.calendarClassName}
          renderInput={Button}
        />
      </Calendar>
      <Dialog
        isOpen={toggleDialog}
        category={Category.confirmation}
        header={dialog.header}
        message={
          <>
            <UpdatedDueDate>{formattedDueDate}</UpdatedDueDate>

            {dialog.dueDateMessage && (
              <DueDateMessage>{dialog.dueDateMessage}</DueDateMessage>
            )}

            <Value>
              <StrikeDueDate as={'del'}>
                {format(originalDueDate, calendarDatePickerDefaultDateFormat)}
              </StrikeDueDate>
              {formattedPotentialDueDate}
            </Value>
          </>
        }
        actions={{
          primary: {
            action: onConfirmClick,
            title: primaryButtonTitle,
          },
          secondary: {
            action: () => setToggleDialog(false),
            title: secondaryButtonTitle,
          },
        }}
      />
    </>
  )
}

const StrikeDueDate = styled(MessageContainer)`
  margin: 0;
  min-height: min-content;
  padding-right: ${(props) => props.theme.grid.unit}px;
`

const Value = styled.div`
  flex: 1;
  display: flex;
  color: ${(props) => props.theme.colors.text.primary};
  align-items: center;
  line-height: 1;
`

const Calendar = styled.div`
  flex: 1;

  .DatePicker {
    width: 100%;
  }

  .DatePicker__calendarContainer {
    position: absolute;
    top: unset;
    left: unset !important;
    right: 0 !important;
    transform: unset !important;
  }

  .Calendar__weekDay {
    color: #e6e6e6;
    font-size: ${(props) => props.theme.font.size.normal};
    line-height: ${(props) => props.theme.font.lineHeight.large};
    font-weight: ${(props) => props.theme.font.weight.medium};
  }

  .Calendar__day:not(.-blank):not(.-selected):hover {
    background: #f2fbfc !important;
  }

  .Calendar__day.-today:hover::after {
    opacity: 0.5 !important;
  }

  .selected-day {
    color: ${(props) => props.theme.colors.text.primary} !important;
    border: 1px solid ${(props) => props.theme.colors.border.primary} !important;
  }
`

const UpdatedDueDate = styled.div`
  background: ${(props) => props.theme.colors.background.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  width: max-content;
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.grid.unit}px;
  padding: ${(props) => props.theme.grid.unit}px
    ${(props) => props.theme.grid.unit * 2}px;
`

const DueDateMessage = styled(MessageContainer)`
  min-height: min-content;
  margin: ${(props) => props.theme.grid.unit * 6}px 0 0 0;
`

export {
  Day as CalendarDay,
  DayValue as CalendarDayValue,
  RenderInputProps as CalendarRenderInputProps,
  calendarGetDay,
  calendarPotentialDueDate,
  calendarDatePickerDefaultDateFormat,
  CalendarDatePickerConfigs,
  CalendarDialogConfigs,
  CalendarDatePickerProps,
  CalendarDatePicker,
}
