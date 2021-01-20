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

export type Maybe<T> = T | null

export enum SubmissionCriticality {
  ON_SCHEDULE = 'ON_SCHEDULE',
  DUE_TODAY = 'DUE_TODAY',
  AT_RISK = 'AT_RISK',
  OVERDUE = 'OVERDUE',
}

export type Submission = {
  id: string
  doi: string
  title: string
  journal: Journal
  author: Person
  currentStep: SubmissionStep
  previousStep?: Maybe<SubmissionStep>
  nextStep?: Maybe<ProjectedSubmissionStep>
  dueDate: Date
  criticality: SubmissionCriticality
}

export type Journal = {
  id: string
  code: string
  title: string
  doi: string
  issn: string
  productionEditor: User
}

export type SubmissionStep = {
  id: string
  type: SubmissionStepType
  status: SubmissionStepStatus
  assignee: User
  dueDate: Date
  criticality: SubmissionCriticality
}

export type ProjectedSubmissionStep = {
  type: SubmissionStepType
  dueDate: Date
}

export type User = {
  id: string
  displayName: string
}

export type Person = User & {
  id: string
  displayName: string
  email: string
  firstName: string
  lastName: string
  role: Role
}

export type Role = {
  id: string
  label: string
}

export type SubmissionStepType = {
  id: string
  label: string
  description: string
  stage: SubmissionStepStage
  role: Role
}

export type SubmissionStepStage = {
  id: string
  label: string
}

export type SubmissionStepStatus = {
  id: string
  label: string
}
