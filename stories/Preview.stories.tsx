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

import {
  ArticleDetailsInspector,
  SubmissionCriticality,
  ZoomButton,
  ZoomButtonGroup,
  ZoomInIcon,
  ZoomOutIcon,
} from '../src'

storiesOf('Preview', module)
  .add('Zoom Buttons', () => (
    <ZoomButtonGroup>
      <ZoomButton onClick={action('zoom in clicked')}>
        <ZoomInIcon />
      </ZoomButton>
      <ZoomButton onClick={action('zoom out clicked')}>
        <ZoomOutIcon />
      </ZoomButton>
    </ZoomButtonGroup>
  ))
  .add('Inspector', () => (
    <div style={{ width: 370 }}>
      <ArticleDetailsInspector
        submission={{
          _id: '175639',
          doi: '10.1000/xyz123',
          dueDate: new Date('2020-7-28'),
          criticality: SubmissionCriticality.OVERDUE,
          journal: {
            code: 'PMC4172319',
            title: 'Applied Organometallic Chemistry',
          },
          author: {
            firstName: 'E.J. Baerends',
            email: 'e-baerends@gmail.com',
          },
          productionEditor: 'Paul McCartney',
          nextStep: {
            type: {
              label: 'XML Conversion',
              description:
                'Automated conversion to JATS with reference & house style rules',
            },
            dueDate: new Date('2020-7-05'),
            assignee: {
              role: 'Automated task',
            },
          },
          currentStep: {
            type: {
              label: 'Quality Report Generation',
              description:
                'Technical checks on article to create Quality Report',
            },
            dueDate: new Date('2020-5-15'),
            assignee: {
              role: 'Automated task',
            },
            criticality: SubmissionCriticality.OVERDUE,
          },
          previousStep: {
            type: {
              label: 'Production Editor Check',
              description:
                'The Production editor checks the validity of the generated article.',
            },
            dueDate: new Date('2020-4-26'),
            assignee: {
              role: 'Production Editor',
            },
            criticality: SubmissionCriticality.DUE_TODAY,
          },
        }}
        handleDateChange={action('Date updated')}
      />
    </div>
  ))
