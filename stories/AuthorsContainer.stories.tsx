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

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  AuthorsContainer,
  buildAffiliationIDs,
  buildAuthorAffiliations,
} from '../src'
import affiliations from './data/affiliations'
import authors from './data/authors'

const affiliationIds = buildAffiliationIDs(authors)

const authorAffiliations = buildAuthorAffiliations(
  authors,
  affiliations,
  affiliationIds
)

storiesOf('AuthorsContainer', module)
  .add('Authors with affiliations', () => (
    <AuthorsContainer
      authorData={{ authors, affiliations, authorAffiliations }}
      showEditButton={true}
      startEditing={action('start editing')}
      selectAuthor={action('select Author')}
    />
  ))
  .add('Authors with joint authorship', () => (
    <AuthorsContainer
      authorData={{
        authors: [
          Object.assign(
            {
              ...authors[0],
              isJointContributor: true,
            },
            authors[0]
          ),
          ...authors.slice(1, 3),
        ],
        affiliations,
        authorAffiliations,
      }}
      showEditButton={true}
      startEditing={action('start editing')}
      selectAuthor={action('select Author')}
    />
  ))
