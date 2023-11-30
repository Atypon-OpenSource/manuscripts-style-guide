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

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import { CalenderDatePicker, CalenderDatePickerButton } from '../src'
import { submission } from './data/lw-submission'

const Grid = styled.div`
  display: grid;
  width: 400px;
  gap: 10px;
`
storiesOf('DatePicker', module).add('DatePicker', () => {
  return (
    <Grid>
      <CalenderDatePicker
        currentDueDate={submission.currentStep.dueDate}
        originalDueDate={submission.dueDate}
        handleDateChange={action('Date updated')}
        Button={({ ref }) => (
          <CalenderDatePickerButton
            id={submission.id}
            criticality={submission.criticality}
            alert={'danger'}
            dueDate={submission.currentStep.dueDate}
            ref={ref}
          />
        )}
      />

      <CalenderDatePicker
        currentDueDate={submission.currentStep.dueDate}
        originalDueDate={submission.dueDate}
        handleDateChange={action('Date updated')}
        Button={({ ref }) => (
          <CalenderDatePickerButton
            id={submission.id}
            criticality={submission.currentStep.criticality}
            alert={'danger'}
            dueDate={submission.currentStep.dueDate}
            ref={ref}
            disabled
            tooltip="This is disabled"
          />
        )}
      />
    </Grid>
  )
})
