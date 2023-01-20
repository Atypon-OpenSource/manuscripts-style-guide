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

import contributorRoles from '@manuscripts/data/dist/shared/contributor-roles.json'
import { ContributorRole } from '@manuscripts/json-schema'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import { AuthorForm } from '../src'
import authors from './data/authors'

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

const contributorRole = {
  _id: 'MPContributorRole:photographer',
  name: 'Photographer',
}

const addedContributorRoles: ContributorRole[] = [
  contributorRole as ContributorRole,
]

storiesOf('AuthorForm', module)
  .add('basic', () => (
    <AuthorForm
      author={authors[0]}
      handleSave={action('save author')}
      isRemoveAuthorOpen={false}
      removeAuthor={action('remove author')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
    />
  ))
  .add('with remove author open', () => (
    <AuthorForm
      author={authors[0]}
      handleSave={action('save author')}
      isRemoveAuthorOpen={true}
      removeAuthor={action('remove author')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
    />
  ))
  .add('with custom checkbox label', () => (
    <AuthorForm
      author={authors[0]}
      handleSave={action('save author')}
      isRemoveAuthorOpen={false}
      removeAuthor={action('remove author')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
      components={{ CheckboxLabel }}
    />
  ))
  .add('with custom TextField', () => (
    <AuthorForm
      author={authors[0]}
      handleSave={action('save author')}
      isRemoveAuthorOpen={false}
      removeAuthor={action('remove author')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
      components={{ TextField }}
    />
  ))
  .add('with default contributor roles', () => (
    <AuthorForm
      author={authors[0]}
      handleSave={action('save author')}
      isRemoveAuthorOpen={false}
      removeAuthor={action('remove author')}
      contributorRoles={contributorRoles as ContributorRole[]}
      createContributorRole={action('create contributor role')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
    />
  ))
  .add('with added contributor roles', () => (
    <AuthorForm
      author={authors[0]}
      handleSave={action('save author')}
      isRemoveAuthorOpen={false}
      removeAuthor={action('remove author')}
      contributorRoles={[
        ...addedContributorRoles,
        ...(contributorRoles as ContributorRole[]),
      ]}
      createContributorRole={action('create contributor role')}
      handleRemoveAuthor={action(
        'handle open the remove author confirmation dialog'
      )}
    />
  ))
