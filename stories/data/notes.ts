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

import {
  ManuscriptNote,
  ObjectTypes,
} from '@manuscripts/manuscripts-json-schema'

export const notes: ManuscriptNote[] = [
  {
    _id: 'note-1',
    objectType: ObjectTypes.ManuscriptNote,
    containerID: 'project-1',
    manuscriptID: 'manuscript-1',
    target: 'MPParagraphElement:10E6338C-0BE3-43F2-AB2F-D93E754259E8',
    contents:
      '<div><blockquote>some quoted text</blockquote><p>This is a <span class="keyword" data-keyword="keyword-1">#note</span> for <span class="user" data-user="user-2">@test</span>.</p></div>',
    createdAt: Math.floor(new Date('2018-01-22T08:00:00Z').getTime() / 1000),
    updatedAt: Math.floor(new Date('2018-01-23T08:00:00Z').getTime() / 1000),
    sessionID: 'foo',
    originalText: '',
    contributions: [
      {
        _id: 'MPContribution:1',
        objectType: ObjectTypes.Contribution,
        profileID: 'user-1',
        timestamp: 0,
      },
    ],
  },
]
