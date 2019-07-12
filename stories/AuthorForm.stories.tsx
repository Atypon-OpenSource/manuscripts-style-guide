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

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'
import {
  AuthorAffiliation,
  AuthorForm,
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

const CheckboxLabel = styled.label`
  color: blue;
  text-transform: uppercase;
  display: inline;
`

const TextField = styled.input`
  color: blue;
  font-style: italic;
  display: block;
`

storiesOf('AuthorForm', module)
  .add('basic', () => (
    <AuthorForm
      author={authors[0]}
      affiliations={affiliations}
      authorAffiliations={
        authorAffiliations.get(authors[0]._id) as AuthorAffiliation[]
      }
      handleSave={action('save author')}
      createAffiliation={action('create affiliation')}
      isRemoveAuthorOpen={false}
      removeAuthor={action('remove author')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
      handleSetAsCorrespondingAuthor={action(
        'set this author as the corresponding author'
      )}
    />
  ))
  .add('with remove author open', () => (
    <AuthorForm
      author={authors[0]}
      affiliations={affiliations}
      authorAffiliations={
        authorAffiliations.get(authors[0]._id) as AuthorAffiliation[]
      }
      handleSave={action('save author')}
      createAffiliation={action('create affiliation')}
      isRemoveAuthorOpen={true}
      removeAuthor={action('remove author')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
      handleSetAsCorrespondingAuthor={action(
        'set this author as the corresponding author'
      )}
    />
  ))
  .add('with custom checkbox label', () => (
    <AuthorForm
      author={authors[0]}
      affiliations={affiliations}
      authorAffiliations={
        authorAffiliations.get(authors[0]._id) as AuthorAffiliation[]
      }
      handleSave={action('save author')}
      createAffiliation={action('create affiliation')}
      isRemoveAuthorOpen={false}
      removeAuthor={action('remove author')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
      handleSetAsCorrespondingAuthor={action(
        'set this author as the corresponding author'
      )}
      components={{ CheckboxLabel }}
    />
  ))
  .add('with custom TextField', () => (
    <AuthorForm
      author={authors[0]}
      affiliations={affiliations}
      authorAffiliations={
        authorAffiliations.get(authors[0]._id) as AuthorAffiliation[]
      }
      handleSave={action('save author')}
      createAffiliation={action('create affiliation')}
      isRemoveAuthorOpen={false}
      removeAuthor={action('remove author')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
      handleSetAsCorrespondingAuthor={action(
        'set this author as the corresponding author'
      )}
      components={{ TextField }}
    />
  ))
  .add('is Corresponding author', () => (
    <AuthorForm
      author={authors[1]}
      authorAffiliations={
        authorAffiliations.get(authors[1]._id) as AuthorAffiliation[]
      }
      handleSave={action('save author')}
      isRemoveAuthorOpen={false}
      removeAuthor={action('remove author')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
      handleSetAsCorrespondingAuthor={action(
        'set this author as the corresponding author'
      )}
    />
  ))
