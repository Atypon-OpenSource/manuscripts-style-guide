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

import { format } from 'date-fns'
import React from 'react'
import styled from 'styled-components'

import {
  TaskStepCurrentIcon,
  TaskStepDoneIcon,
  TaskStepNextIcon,
} from '../icons'
import {
  PrimaryBoldHeading,
  PrimarySmallText,
  SecondaryBoldHeading,
  SecondarySmallText,
} from './Text'
import { Submission, SubmissionCriticality } from './types'

const CriticalityLabel: Record<
  SubmissionCriticality,
  { label: string; color: string }
> = {
  ON_SCHEDULE: {
    label: 'On schedule',
    color: '#353535',
  },
  DUE_TODAY: { label: 'Due today', color: '#353535' },
  AT_RISK: { label: 'At risk', color: '#FE8F1F' },
  OVERDUE: { label: 'Overdue', color: '#F35143' },
}

export const Progress: React.FC<{
  submission: Submission
}> = ({ submission }) => {
  const { currentStep, nextStep, previousStep } = submission
  return (
    <Grid>
      {previousStep && (
        <>
          <TaskStatus>
            <TaskStepDoneIcon />
            <Line />
          </TaskStatus>
          <TaskContainer>
            <SecondaryBoldHeading>
              {previousStep.type.label}
            </SecondaryBoldHeading>
            <SecondarySmallText>
              {previousStep.type.description}
            </SecondarySmallText>
            <SecondarySmallText>
              Actor: {previousStep.type.role.label}
            </SecondarySmallText>
            <SecondarySmallText>
              {format(previousStep.dueDate, 'd MMMM, EEEE')}
            </SecondarySmallText>
          </TaskContainer>
        </>
      )}

      <TaskStatus>
        <TaskStepCurrentIcon
          color={CriticalityLabel[currentStep.criticality].color}
        />
        <Line />
      </TaskStatus>
      <TaskContainer>
        <PrimaryBoldHeading>{currentStep.type.label}</PrimaryBoldHeading>
        <SecondarySmallText>{currentStep.type.description}</SecondarySmallText>
        <SecondarySmallText>
          Actor: {currentStep.type.role.label}
        </SecondarySmallText>
        <PrimarySmallText>
          {format(currentStep.dueDate, 'd MMMM, EEEE')}
        </PrimarySmallText>
        <CriticalityText
          color={CriticalityLabel[currentStep.criticality].color}
        >
          {CriticalityLabel[currentStep.criticality].label}
        </CriticalityText>
      </TaskContainer>

      {nextStep && (
        <>
          <TaskStatus>
            <TaskStepNextIcon />
          </TaskStatus>
          <TaskContainer>
            <PrimaryBoldHeading>{nextStep.type.label}</PrimaryBoldHeading>
            <SecondarySmallText>{nextStep.type.description}</SecondarySmallText>
            <SecondarySmallText>
              Actor: {nextStep.type.role.label}
            </SecondarySmallText>
            <PrimarySmallText>
              {format(nextStep.dueDate, 'd MMMM, EEEE')}
            </PrimarySmallText>
          </TaskContainer>
        </>
      )}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  gap: 0 ${(props) => props.theme.grid.unit * 2}px;
`

const TaskStatus = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`

const TaskContainer = styled.div`
  grid-column: 2;
  margin-bottom: 8px;
`

const Line = styled.hr`
  margin: 5px 0 0 0;
  flex: 1;
  border: 1px dashed #c9c9c9;
`

const CriticalityText = styled(PrimarySmallText)<{ color: string }>`
  color: ${(props) => props.color};
`
