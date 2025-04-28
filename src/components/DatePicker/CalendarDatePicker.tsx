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

// Add react-day-picker CSS
//@ts-ignore
require('react-day-picker/style.css')

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react' // For popover
import { add, format, intervalToDuration, isValid } from 'date-fns' // Add isValid
import React, { useCallback, useEffect, useMemo, useState } from 'react'
// Remove old DatePicker import
// import DatePicker, {
//   Day,
//   DayValue,
//   RenderInputProps,
// } from '@amir04lm26/react-modern-calendar-date-picker'
// Import from react-day-picker
import { DayPicker, SelectSingleEventHandler } from 'react-day-picker'
import styled from 'styled-components'

import { Category, Dialog, MessageContainer } from '../Dialog'

// This needs adapting as DayPicker returns Date, not { day, month, year } object
const calendarPotentialDueDate = (
  stepDueDate: Date,
  selectedDate: Date | undefined, // Changed from Day type
  submissionDueDate: Date
): Date | null => {
  if (!selectedDate || !isValid(selectedDate)) {
    return null // Or handle appropriately
  }
  // Assuming interval calculation is based on Date objects already
  const duration = intervalToDuration({
    start: stepDueDate,
    end: selectedDate, // Use the Date object directly
  })
  return add(submissionDueDate, duration)
}

const calendarDatePickerDefaultDateFormat = 'd MMM, EEEE'

type CalendarDialogConfigs = {
  header?: string
  dueDateMessage?: string
}

type CalendarDatePickerProps = {
  currentDueDate: Date
  originalDueDate: Date
  handleDateChange: (day: Date | undefined) => void // Changed DayValue to Date | undefined
  dialogConfigs?: CalendarDialogConfigs
  primaryButtonTitle?: string
  secondaryButtonTitle?: string
  buttonLabel?: string // Add label for the trigger button
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  handleDateChange,
  originalDueDate,
  currentDueDate,
  dialogConfigs,
  primaryButtonTitle = 'Reschedule',
  secondaryButtonTitle = 'Cancel',
  buttonLabel = 'Change Date', // Default button label
}) => {
  const dialog = Object.assign({}, dialogConfigs, {
    header: 'Change the task due date?',
  })

  // State for DayPicker selection (Date object or undefined)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(
    currentDueDate
  )
  // State for the potential new date to show in dialog
  const [potentialNewDate, setPotentialNewDate] = useState<Date | undefined>(
    undefined
  )
  const [toggleDialog, setToggleDialog] = useState<boolean>(false)

  const onConfirmClick = useCallback(() => {
    if (potentialNewDate) {
      handleDateChange(potentialNewDate)
      setSelectedDay(potentialNewDate) // Update visual selection after confirm
    }
    setToggleDialog(false)
  }, [potentialNewDate, handleDateChange])

  // Calculate formatted dates for the dialog
  const formattedPotentialDate = useMemo(
    () =>
      potentialNewDate && isValid(potentialNewDate)
        ? format(potentialNewDate, calendarDatePickerDefaultDateFormat)
        : 'Invalid Date',
    [potentialNewDate]
  )
  const formattedPotentialDueDate = useMemo(() => {
    const potentialDate = calendarPotentialDueDate(
      currentDueDate,
      potentialNewDate,
      originalDueDate
    )
    return potentialDate && isValid(potentialDate)
      ? format(potentialDate, calendarDatePickerDefaultDateFormat)
      : 'Calculation Error'
  }, [originalDueDate, currentDueDate, potentialNewDate])

  // Handle DayPicker selection
  const handleDaySelect: SelectSingleEventHandler = (date) => {
    if (date) {
      setPotentialNewDate(date) // Store the date picked for confirmation
      setToggleDialog(true) // Open dialog
    }
  }

  // Update selectedDay if currentDueDate prop changes externally
  useEffect(() => {
    setSelectedDay(currentDueDate)
  }, [currentDueDate])

  return (
    <>
      {/* Replace old Calendar wrapper with Popover */}
      <Popover>
        {/* Replace old Button input with PopoverButton */}
        <CalendarPopoverButton>{buttonLabel}</CalendarPopoverButton>

        <CalendarPopoverPanel>
          <DayPicker
            mode="single"
            selected={selectedDay} // Visually selected date
            onSelect={handleDaySelect} // Handle selection for confirmation
            initialFocus // Focus calendar when opened
            // Add other DayPicker props as needed (e.g., disabled dates, footer)
          />
        </CalendarPopoverPanel>
      </Popover>

      {/* Dialog remains mostly the same, but uses potentialNewDate */}
      <Dialog
        isOpen={toggleDialog}
        category={Category.confirmation}
        header={dialog.header}
        message={
          <>
            {/* Show the potential new date */}
            <UpdatedDueDate>{formattedPotentialDate}</UpdatedDueDate>

            {dialog.dueDateMessage && (
              <DueDateMessage>{dialog.dueDateMessage}</DueDateMessage>
            )}

            <Value>
              <StrikeDueDate as={'del'}>
                {isValid(originalDueDate)
                  ? format(originalDueDate, calendarDatePickerDefaultDateFormat)
                  : 'Invalid Original Date'}
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

// --- Styled Components ---

// Add styles for Popover Button and Panel
const CalendarPopoverButton = styled(PopoverButton)`
  /* Add styles similar to your original PrimaryButton or specific needs */
  border: 1px solid
    ${(props) => props.theme.colors.button.default.border.default};
  background: ${(props) =>
    props.theme.colors.button.default.background.default};
  color: ${(props) => props.theme.colors.button.default.color.default};
  padding: 10px 15px;
  border-radius: ${(props) => props.theme.grid.radius.small};
  cursor: pointer;
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: ${(props) => props.theme.font.size.medium};

  &:hover {
    background: ${(props) =>
      props.theme.colors.button.default.background.hover};
  }
`

const CalendarPopoverPanel = styled(PopoverPanel)`
  background: ${(props) => props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  border-radius: ${(props) => props.theme.grid.radius.default};
  box-shadow: ${(props) => props.theme.shadow.dropShadow};
  z-index: 10; /* Ensure it's above other content */
  margin-top: 4px;

  /* Target react-day-picker internal classes for styling */
  .rdp {
    --rdp-cell-size: 36px; /* Adjust size */
    --rdp-accent-color: ${(props) => props.theme.colors.brand.default};
    --rdp-background-color: ${(props) => props.theme.colors.brand.xlight};
    /* Add more overrides as needed */
    margin: ${(props) => props.theme.grid.unit * 2}px; /* Add some padding */
  }
  .rdp-day_selected {
    font-weight: bold;
  }
`

// Keep existing styles for Dialog content (might need minor adjustments)
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

// Export necessary items
export {
  calendarPotentialDueDate,
  calendarDatePickerDefaultDateFormat,
  CalendarDialogConfigs,
  CalendarDatePickerProps,
  CalendarDatePicker,
}
