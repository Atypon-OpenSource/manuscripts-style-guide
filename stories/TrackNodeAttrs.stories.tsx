/*!
 * © 2023 Atypon Systems LLC
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
  CHANGE_OPERATION,
  CHANGE_STATUS,
  TrackedAttrs,
} from '@manuscripts/track-changes-plugin'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import { AuthorsList, TrackNodeAttrs } from '../src'
import authors from './data/authors'

const dataTracked: TrackedAttrs = {
  id: '2957b24f-942b-46c7-a46f-1895177000d8',
  status: CHANGE_STATUS.pending,
  authorID: 'MPUserProfile:e1aa49080351e427e6d8bc16f4959d8a299f350f',
  oldAttrs: {
    id: 'MPContributor:5D0C91F9-0A6F-48FF-954D-6E644D82C535',
  },
  createdAt: 1695624466711,
  operation: CHANGE_OPERATION.set_node_attributes,
  updatedAt: 1695898496389,
  reviewedByID: null,
}

const dataTrackedAccepted = {
  ...dataTracked,
  status: CHANGE_STATUS.accepted,
  operation: CHANGE_OPERATION.set_node_attributes,
}

const dataTrackedRejected = {
  ...dataTracked,
  status: CHANGE_STATUS.rejected,
  operation: CHANGE_OPERATION.set_node_attributes,
}

const dataTrackedDeleted = {
  ...dataTracked,
  status: CHANGE_STATUS.pending,
  operation: CHANGE_OPERATION.delete,
}

storiesOf('TrackNodeAttrs', module)
  .add('tracking mark', () => {
    return (
      <TrackNodeAttrs dataTracked={[dataTracked]}>
        <AuthorsList
          authors={authors.slice(0, 1)}
          authorAffiliations={new Map<string, []>()}
        />
      </TrackNodeAttrs>
    )
  })
  .add('tracking mark accepted', () => (
    <TrackNodeAttrs dataTracked={[dataTrackedAccepted]}>
      <AuthorsList
        authors={authors.slice(0, 1)}
        authorAffiliations={new Map<string, []>()}
      />
    </TrackNodeAttrs>
  ))
  .add('tracking mark rejected', () => (
    <TrackNodeAttrs dataTracked={[dataTrackedRejected]}>
      <AuthorsList
        authors={authors.slice(0, 1)}
        authorAffiliations={new Map<string, []>()}
      />
    </TrackNodeAttrs>
  ))
  .add('tracking mark deleted', () => (
    <TrackNodeAttrs dataTracked={[dataTrackedDeleted]}>
      <AuthorsList
        authors={authors.slice(0, 1)}
        authorAffiliations={new Map<string, []>()}
      />
    </TrackNodeAttrs>
  ))
