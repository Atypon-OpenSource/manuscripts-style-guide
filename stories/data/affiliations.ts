/*!
 * © 2019 Atypon Systems LLC
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

import { Affiliation } from '@manuscripts/json-schema'

const affiliations: Map<string, Affiliation> = new Map([
  [
    'affiliation-1',
    {
      _id: 'affiliation-1',
      containerID: 'project-1',
      manuscriptID: 'manuscript-1',
      objectType: 'MPAffiliation' as const,
      institution: 'Firehouse, Hook & Ladder Company 8',
      priority: 0,
      sessionID: 'story',
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  [
    'affiliation-2',
    {
      _id: 'affiliation-2',
      containerID: 'project-1',
      manuscriptID: 'manuscript-1',
      objectType: 'MPAffiliation' as const,
      institution: 'Firehouse, Hook & Ladder Company 9',
      priority: 0,
      sessionID: 'story',
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  [
    'affiliation-3',
    {
      _id: 'affiliation-3',
      containerID: 'project-1',
      manuscriptID: 'manuscript-1',
      objectType: 'MPAffiliation' as const,
      department: 'Department of Molecular Biology and Biochemistry',
      institution: 'Simon Fraser University',
      addressLine1: '8888 University Drive',
      city: 'Burnaby',
      county: 'British Columbia',
      country: 'Canada',
      postCode: 'V5A 1S6',
      priority: 0,
      sessionID: 'story',
      createdAt: 0,
      updatedAt: 0,
    },
  ],
])

export default affiliations
