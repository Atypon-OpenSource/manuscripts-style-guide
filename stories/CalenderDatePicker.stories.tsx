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
import { RenderInputProps } from 'react-modern-calendar-datepicker'
import styled from 'styled-components'

import { CalendarDatePicker, PrimaryButton } from '../src'
import { submission } from './data/lw-submission'

const Grid = styled.div`
  display: grid;
  width: 400px;
  gap: 10px;
`
storiesOf('DatePicker', module).add('DatePicker', () => {
  const CalendarDatePickerButton = ({ ref }: RenderInputProps) => {
    return (
      <PrimaryButton ref={ref as React.RefObject<HTMLButtonElement>}>
        show calendar
      </PrimaryButton>
    )
  }
  return (
    <Grid>
      <CalendarDatePicker
        currentDueDate={submission.currentStep.dueDate}
        originalDueDate={submission.dueDate}
        handleDateChange={action('Date updated')}
        Button={CalendarDatePickerButton}
      />
    </Grid>
  )
})
