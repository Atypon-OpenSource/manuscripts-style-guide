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
import { format } from 'date-fns'
import React from 'react'
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker'
import styled from 'styled-components'

import { IconTextButton } from '../Button'
import { InspectorField } from '../Inspector'
import { InspectorSubsection } from '../InspectorSection'
import { Submission, SubmissionCriticality } from './types'

export const BaseInformation: React.FC<{
  submission: Submission
  handleDateChange: (day: DayValue) => void
  userRole?: string
}> = ({ submission, handleDateChange, userRole }) => {
  const Button: React.FC<{ ref: React.RefObject<HTMLButtonElement> }> = ({
    ref,
  }) => (
    <DateButton
      ref={ref}
      criticality={submission.currentStep.criticality}
      disabled={userRole !== 'pe'}
    >
      {format(submission.currentStep.dueDate, 'd MMM, EEEE')}
      {submission.currentStep.criticality === SubmissionCriticality.AT_RISK && (
        <AttentionOrange />
      )}
      {submission.currentStep.criticality === SubmissionCriticality.OVERDUE && (
        <AttentionRed />
      )}
    </DateButton>
  )

  return (
    <InspectorSubsection>
      <InspectorField>
        <DateLabel>Due date</DateLabel>
        <Value>
          <Calendar>
            <DatePicker
              value={getDay(submission.currentStep.dueDate)}
              onChange={handleDateChange}
              calendarPopperPosition={'bottom'}
              colorPrimary="#f2fbfc"
              calendarSelectedDayClassName={'selected-day'}
              calendarClassName={'responsive-calendar'}
              // @ts-ignore
              renderInput={Button}
            />
          </Calendar>
        </Value>
      </InspectorField>
      <InspectorField>
        <Label>Article ID:</Label>
        <Value>{submission.id}</Value>
      </InspectorField>
      <InspectorField>
        <Label>DOI:</Label>
        <Value>{submission.doi}</Value>
      </InspectorField>
      <InspectorField>
        <Label>Journal:</Label>
        <Value>{submission.journal.title}</Value>
      </InspectorField>
      <InspectorField>
        <Label>Journal ID:</Label>
        <Value>{submission.journal.id}</Value>
      </InspectorField>
      {submission.author && (
        <>
          <InspectorField>
            <Label>Corresponding Author:</Label>
            <Value>{submission.author.displayName}</Value>
          </InspectorField>
          <InspectorField>
            <Label>Email:</Label>
            <Value>{submission.author.email}</Value>
          </InspectorField>
        </>
      )}
      <InspectorField>
        <Label>Production Editor:</Label>
        <Value>{submission.journal.productionEditor.displayName}</Value>
      </InspectorField>
    </InspectorSubsection>
  )
}

const getDay = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
})

const Value = styled.div`
  flex: 1;
  display: flex;
  color: ${(props) => props.theme.colors.text.primary};
`

const Label = styled.div`
  width: fit-content;
  margin-right: ${(props) => props.theme.grid.unit * 2}px;
  flex-shrink: 0;
  color: ${(props) => props.theme.colors.text.secondary};
`

const DateLabel = styled(Label)`
  color: ${(props) => props.theme.colors.text.primary};
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
    (props.criticality === SubmissionCriticality.AT_RISK &&
      props.theme.colors.text.warning) ||
    (props.criticality === SubmissionCriticality.OVERDUE &&
      props.theme.colors.text.error) ||
    props.theme.colors.text.secondary}!important;
  width: ${(props) => props.theme.grid.unit * 61}px;
  height: ${(props) => props.theme.grid.unit * 7.5}px;
  justify-content: space-around;
  background: transparent !important;
`

const Calendar = styled.div`
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
