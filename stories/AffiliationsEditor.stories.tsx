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

/* tslint:disable:no-any */

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { AffiliationsEditor, AffiliationsEditorProfile } from '../src'
import { buildAuthorsAndAffiliations } from '../src/lib/authors'
import submission from './data/submission'

/* tslint:disable:no-any */
const {
  authors,
  affiliations,
  authorAffiliations,
} = buildAuthorsAndAffiliations(submission)

storiesOf('AffiliationsEditor', module)
  .add('basic', () => (
    <AffiliationsEditor
      affiliations={affiliations}
      authorAffiliations={authorAffiliations.get(authors[0]._id)}
      addAuthorAffiliation={action(
        'add affiliation to author and create affiliation if necessary'
      )}
      removeAuthorAffiliation={action(
        'remove affiliation from the author (but dont delete it)'
      )}
      updateAffiliation={action('update affiliation')}
    />
  ))
  .add('affiliation with missing institution data', () => (
    <AffiliationsEditor
      affiliations={affiliations}
      authorAffiliations={authorAffiliations.get(authors[1]._id)}
      addAuthorAffiliation={action(
        'add affiliation to author and create affiliation if necessary'
      )}
      removeAuthorAffiliation={action(
        'remove affiliation from the author (but dont delete it)'
      )}
      updateAffiliation={action('update affiliation')}
    />
  ))
  .add('with option to add', () => (
    <AffiliationsEditor
      affiliations={affiliations}
      authorAffiliations={[]}
      addAuthorAffiliation={action(
        'add affiliation to author and create affiliation if necessary'
      )}
      removeAuthorAffiliation={action(
        'remove affiliation from the author (but dont delete it)'
      )}
      updateAffiliation={action('update affiliation')}
    />
  ))

storiesOf('AffiliationsEditorProfile', module).add('basic', () => (
  <AffiliationsEditorProfile
    affiliations={affiliations as any}
    addAffiliation={action('create affiliation')}
    removeAffiliation={action('remove affiliation')}
    updateAffiliation={action('update affiliation')}
  />
))
