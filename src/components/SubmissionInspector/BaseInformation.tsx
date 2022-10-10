/*!
 * © 2020 Atypon Systems LLC
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

import AttentionOrange from '@manuscripts/assets/react/AttentionOrange'
import AttentionRed from '@manuscripts/assets/react/AttentionRed'
import { add, format, intervalToDuration } from 'date-fns'
import React, { RefObject, useCallback, useMemo, useState } from 'react'
import DatePicker, {
  Day,
  DayValue,
  RenderInputProps,
} from 'react-modern-calendar-datepicker'
import ReactTooltip from 'react-tooltip'
import styled, { css } from 'styled-components'

import { IconTextButton } from '../Button'
import { Category, Dialog, MessageContainer } from '../Dialog'
import { Submission, SubmissionCriticality } from './types'

const dateFormat = 'd MMM, EEEE'

const criticalityPill: {
  [key in SubmissionCriticality]: { label: string; color: string }
} = {
  [SubmissionCriticality.OVERDUE]: { label: 'Overdue', color: '#F5C1B7' },
  [SubmissionCriticality.DUE_TODAY]: { label: 'At risk', color: '#FFE0B2' },
  [SubmissionCriticality.ON_SCHEDULE]: { label: 'At risk', color: '#FFE0B2' },
}

const CalenderDatePicker: React.FC<{
  submission: Submission
  handleDateChange: (day: DayValue) => void
  Button: React.FC<RenderInputProps>
}> = ({ submission, handleDateChange, Button }) => {
  const [dueDate, setDueDate] = useState<DayValue | undefined>(undefined)
  const [toggleDialog, setToggleDialog] = useState<boolean>(false)

  const onConfirmClick = useCallback(() => {
    handleDateChange(dueDate)
    setToggleDialog(false)
  }, [dueDate, setToggleDialog, handleDateChange])

  const formattedDueDate = useMemo(
    () =>
      dueDate &&
      format(new Date(dueDate.year, dueDate.month, dueDate.day), dateFormat),
    [dueDate]
  )
  const formattedPotentialDueDate = useMemo(
    () =>
      dueDate &&
      format(
        potentialDueDate(
          submission.currentStep.dueDate,
          dueDate,
          submission.dueDate
        ),
        dateFormat
      ),
    [submission.dueDate, submission.currentStep.dueDate, dueDate]
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
          value={getDay(submission.currentStep.dueDate)}
          onChange={onDatePickerChange}
          calendarPopperPosition={'bottom'}
          colorPrimary="#f2fbfc"
          calendarSelectedDayClassName={'selected-day'}
          calendarClassName={'responsive-calendar'}
          renderInput={Button}
        />
      </Calendar>
      <Dialog
        isOpen={toggleDialog}
        category={Category.confirmation}
        header="Change the task due date?"
        message={
          <>
            <UpdatedDueDate>{formattedDueDate}</UpdatedDueDate>

            <DueDateMessage>
              By rescheduling the task, the publication expected date of the
              article will be modified accordingly:
            </DueDateMessage>

            <Value>
              <StrikeDueDate as={'del'}>
                {format(submission.dueDate, 'd MMM, EEEE')}
              </StrikeDueDate>
              {formattedPotentialDueDate}
            </Value>
          </>
        }
        actions={{
          primary: {
            action: onConfirmClick,
            title: 'Reschedule',
          },
          secondary: {
            action: () => setToggleDialog(false),
            title: 'Cancel',
          },
        }}
      />
    </>
  )
}

export const BaseInformation: React.FC<{
  submission: Submission
  handleDateChange: (day: DayValue) => void
  userRole?: string
}> = ({ submission, handleDateChange, userRole }) => {
  const Button: React.FC<RenderInputProps> = ({ ref }) => (
    <Container>
      <div data-tip={true} data-for={submission.id}>
        <DateButton
          ref={ref as RefObject<HTMLButtonElement>}
          criticality={submission.currentStep.criticality}
          disabled={userRole !== 'pe'}
        >
          {format(submission.currentStep.dueDate, 'd MMM, EEEE')}
          {submission.currentStep.criticality ===
            SubmissionCriticality.DUE_TODAY && <AttentionOrange />}
          {submission.currentStep.criticality ===
            SubmissionCriticality.OVERDUE && <AttentionRed />}
        </DateButton>
      </div>
      <ReactTooltip
        id={submission.id}
        place="bottom"
        effect="solid"
        offset={{ top: 10 }}
        className="tooltip"
        disable={userRole == 'pe'}
      >
        No permissions to reschedule
      </ReactTooltip>
    </Container>
  )

  return (
    <Grid>
      {(!submission.isPublished && (
        <>
          <DateLabel>Due date</DateLabel>
          <Value>
            <CalenderDatePicker
              submission={submission}
              handleDateChange={handleDateChange}
              Button={Button}
            />
          </Value>
        </>
      )) || (
        <>
          <Label>Published:</Label>
          <Value>
            {format(submission.publishedDate || 0, 'd MMM yyyy, EEEE')}
          </Value>
        </>
      )}

      <Label>Article ID:</Label>
      <Value>{submission.code}</Value>

      <Label>DOI:</Label>
      <Value>{submission.doi}</Value>

      <Label>Journal:</Label>
      <Value data-journal={submission.journal.title}>
        {submission.journal.title}
      </Value>

      <Label>Journal ID:</Label>
      <Value>{submission.journal.id}</Value>

      {submission.author && (
        <>
          <Label>Corresponding Author:</Label>
          <Value>{submission.author.displayName}</Value>

          <Label>Email:</Label>
          <Value>{submission.author.email}</Value>
        </>
      )}

      <Label>Production Editor:</Label>
      <Value>{submission.journal.productionEditor.displayName}</Value>

      {!submission.isPublished && (
        <>
          <Label>Publication Due:</Label>
          <Value>
            {format(submission.dueDate, 'd MMM, EEEE')}
            {submission.isAtRisk && (
              <Pill background={criticalityPill[submission.criticality].color}>
                {criticalityPill[submission.criticality].label}
              </Pill>
            )}
          </Value>
        </>
      )}
    </Grid>
  )
}

const getDay = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
})

const potentialDueDate = (
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

const Container = styled.div`
  .tooltip {
    border-radius: 6px;
    padding: ${(props) => props.theme.grid.unit * 2}px;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 30% auto;
  column-gap: ${(props) => props.theme.grid.unit * 2}px;
  row-gap: ${(props) => props.theme.grid.unit * 4}px;
`

const Value = styled.div`
  flex: 1;
  display: flex;
  color: ${(props) => props.theme.colors.text.primary};
  align-items: center;
  line-height: 1;
`

const Label = styled.div`
  align-self: center;
  width: fit-content;
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1;
`

const DateLabel = styled(Label)`
  color: ${(props) => props.theme.colors.text.primary};
`

const disabledStyle = css`
  background-color: ${(props) =>
    props.theme.colors.background.secondary} !important;
  color: ${(props) => props.theme.colors.text.secondary} !important;
`

const DateButton = styled(IconTextButton)<{
  criticality: SubmissionCriticality
}>`
  border: 1px solid ${(props) => props.theme.colors.border.secondary}!important;
  box-sizing: border-box;
  border-radius: 6px;
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.normal};
  line-height: ${(props) => props.theme.font.lineHeight.large};
  color: ${(props) =>
    props.criticality === SubmissionCriticality.OVERDUE &&
    props.theme.colors.text.error}!important;
  width: 100%;
  height: ${(props) => props.theme.grid.unit * 7.5}px;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.grid.unit * 2}px 0
    ${(props) => props.theme.grid.unit * 4}px;

  ${(props) => props.disabled && disabledStyle}

  &:focus {
    border-color: ${(props) => props.theme.colors.border.field.hover}!important;
    background-color: ${(props) => props.theme.colors.background.fifth};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.background.fifth};
  }

  svg {
    margin-right: 0;
  }
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
    color: #e6e6e;
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

const Pill = styled.div<{ background?: string }>`
  ${(props) => props.background && `background: ${props.background}`};
  padding: ${(props) => props.theme.grid.unit}px;
  margin-left: ${(props) => props.theme.grid.unit}px;
  font-size: ${(props) => props.theme.font.size.small};
  line-height: ${(props) => props.theme.font.lineHeight.normal};
  font-weight: ${(props) => props.theme.font.weight.normal};
  border-radius: 6px;
`

const UpdatedDueDate = styled.div`
  background: ${(props) => props.theme.colors.background.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  width: max-content;
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.grid.unit}px;
  padding: ${(props) => props.theme.grid.unit}px
    ${(props) => props.theme.grid.unit * 2}px; ;
`

const DueDateMessage = styled(MessageContainer)`
  min-height: min-content;
  margin: ${(props) => props.theme.grid.unit * 6}px 0 0 0;
`

const StrikeDueDate = styled(MessageContainer)`
  margin: 0;
  min-height: min-content;
  padding-right: ${(props) => props.theme.grid.unit}px;
`
