/*!
 * © 2021 Atypon Systems LLC
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
import { SubmissionCriticality } from '../../src/components/SubmissionInspector/types'

export const submission = {
  title: 'Characterization of red ginseng',
  id: '175639',
  doi: '10.1000/xyz123',
  dueDate: new Date('2020-7-28'),
  criticality: SubmissionCriticality.OVERDUE,
  journal: {
    id: 'a35f3849-4c0f-44dd-9fd9-ac3986c658f4',
    title: 'Applied Organometallic Chemistry',
    issn: '1540-1235',
    doi: '10.1137/lw5',
    code: 'PMC4172319',
    productionEditor: {
      id: '1',
      displayName: 'Paul McCartney',
    },
  },
  author: {
    id: '28',
    firstName: 'E.J. Baerends',
    lastName: '',
    email: 'e-baerends@gmail.com',
    displayName: 'E.J. Baerends',
    role: {
      id: '1',
      label: 'author',
    },
  },
  nextStep: {
    type: {
      id: '12',
      stage: {
        id: '0',
        label: 'Check In',
      },
      role: {
        id: '5',
        label: 'Automated task',
      },
      label: 'XML Conversion',
      description:
        'Automated conversion to JATS with reference & house style rules',
    },
    dueDate: new Date('2020-7-05'),
  },
  currentStep: {
    id: '8484',
    status: {
      id: '2',
      label: 'In Progress',
    },
    type: {
      id: '548',
      stage: {
        id: '2',
        label: 'Proofing',
      },
      role: {
        id: '5',
        label: 'Automated task',
      },
      label: 'Quality Report Generation',
      description: 'Technical checks on article to create Quality Report',
    },
    dueDate: new Date('2020-5-15'),
    criticality: SubmissionCriticality.OVERDUE,
    assignee: {
      id: '174',
      displayName: '',
    },
  },
  previousStep: {
    id: '895',
    status: {
      id: '3',
      label: 'Completed',
    },
    type: {
      id: '548',
      stage: {
        id: '2',
        label: 'Proofing',
      },
      role: {
        id: '4',
        label: 'Production Editor',
      },
      label: 'Production Editor Check',
      description:
        'The Production editor checks the validity of the generated article.',
    },
    dueDate: new Date('2020-4-26'),
    criticality: SubmissionCriticality.DUE_TODAY,
    assignee: {
      id: '174',
      displayName: '',
    },
  },
  isAtRisk: true,
}
