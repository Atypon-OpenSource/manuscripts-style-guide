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
import { Submission } from './types'

export const ArticleDetailsInspector: React.FC<{
  submission: Submission
  handleDateChange: (day: DayValue) => void
  userRole?: string
}> = ({ submission, handleDateChange, children, userRole }) => (
  <>
    <InspectorSection title={'Article information'}>
      <BaseInformation
        submission={submission}
        handleDateChange={handleDateChange}
        userRole={userRole}
      />
    </InspectorSection>
    <InspectorSection title={'Progress'}>
      <Progress submission={submission} />
    </InspectorSection>
    {children}
  </>
)