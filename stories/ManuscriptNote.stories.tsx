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

import { Model, UserProfile } from '@manuscripts/json-schema'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'

import {
  CommentBody,
  getAllPermitted,
  InspectorSection,
  ManuscriptNoteList,
} from '../src'
import { keywords } from './data/keywords'
import { notes } from './data/notes'
import { people } from './data/people'

const capabilities = getAllPermitted()

const buildMap = <T extends Model>(items: T[]) => {
  const map = new Map<string, T>()

  for (const item of items) {
    map.set(item._id, item)
  }

  return map
}

const buildCollaboratorMap = (items: UserProfile[]) => {
  const map = new Map<string, UserProfile>()

  for (const item of items) {
    map.set(item.userID, item)
  }

  return map
}
const keywordMap = buildMap(keywords)
const collaboratorMap = buildCollaboratorMap(people)

storiesOf('Projects/Notes', module)
  .add('notes', () => (
    <div style={{ width: 400 }}>
      <CommentBody
        comment={notes[0]}
        getCollaborator={(id: string) => collaboratorMap.get(id)}
        deleteComment={async () => action('delete model')}
        saveComment={async () => action('save model')}
        createKeyword={async () => action('create keyword')}
        setIsEditing={async () => action('editing model')}
        getKeyword={(id: string) => keywordMap.get(id)}
        listKeywords={() => keywords}
        listCollaborators={() => people}
        isReply={false}
        isNew={false}
        handleCreateReply={action('set Note target')}
      />
    </div>
  ))
  .add('Inspector', () => (
    <div
      style={{ width: 400, border: '1px solid #F2F2F2', paddingTop: '24px' }}
    >
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
