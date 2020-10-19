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

import React from 'react'
import { DayValue } from 'react-modern-calendar-datepicker'

import { InspectorSection } from '../InspectorSection'
import { BaseInformation } from './BaseInformation'
import { Progress } from './Progress'

// TODO:: will add Submission to manuscripts-json-schema, when GraphQL schema get completed

export enum SubmissionCriticality {
  ON_SCHEDULE,
  DUE_TODAY,
  AT_RISK,
  OVERDUE,
}

interface User {
  role: string
}

interface SubmissionStepType {
  label: string
  description: string
}

interface SubmissionStep {
  type: SubmissionStepType
  assignee: User
  dueDate: Date
  criticality: SubmissionCriticality
}

interface ProjectedSubmissionStep {
  type: SubmissionStepType
  dueDate: Date
  assignee: User
}

interface Journal {
  code: string
  title: string
}

interface Author {
  email: string
  firstName: string
}

export interface Submission {
  _id: string
  doi: string
  productionEditor: string
  journal: Journal
  author: Author
  currentStep: SubmissionStep
  previousStep: SubmissionStep
  nextStep: ProjectedSubmissionStep
  dueDate: Date
  criticality: SubmissionCriticality
}

export const ArticleDetailsInspector: React.FC<{
  submission: Submission
  handleDateChange: (day: DayValue) => void
}> = ({ submission, handleDateChange }) => (
  <>
    <InspectorSection title={'Article information'}>
      <BaseInformation
        submission={submission}
        handleDateChange={handleDateChange}
      />
    </InspectorSection>
    <InspectorSection title={'Progress'}>
      <Progress submission={submission} />
    </InspectorSection>
    <InspectorSection title={'Open Access'} />
    <InspectorSection title={'Production notes'} />
  </>
)
