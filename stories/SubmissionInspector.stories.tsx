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
  getAllPermitted,
  InspectorSection,
  ManuscriptNoteList,
  Progress,
  ZoomButton,
  ZoomButtonGroup,
  ZoomInIcon,
  ZoomOutIcon,
} from '../src'
import { submission } from './data/lw-submission'
import { notes } from './data/notes'
import { people } from './data/people'

const capabilities = getAllPermitted()

storiesOf('Submission Inspector', module)
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
    <div
      style={{ width: 400, border: '1px solid #F2F2F2', paddingTop: '24px' }}
    >
      <InspectorSection
        title={'Progress'}
        contentStyles={{ padding: '0 56px 24px 56px' }}
      >
        <Progress submission={submission} />
      </InspectorSection>

      <InspectorSection title={'Open Access'} />

      <InspectorSection
        title={'Production notes'}
        contentStyles={{ margin: '0 25px 24px 0' }}
      >
        <ManuscriptNoteList
          notes={notes}
          can={capabilities}
          getKeyword={(id: string) => undefined}
          getCollaboratorById={(id: string) => people[0]}
          createKeyword={async () => action('create keyword')}
          deleteModel={async () => action('delete model')}
          saveModel={async () => action('save model')}
          currentUserId={people[0]._id}
          listCollaborators={() => people}
          listKeywords={() => []}
          selected={null}
          noteSource="DASHBOARD"
        />
      </InspectorSection>
    </div>
  ))
