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

const Legend = styled.legend`
  color: blue;
  text-transform: uppercase;
`

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
    />
  ))
  .add('with custom legend', () => (
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
      components={{ Legend }}
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
      components={{ TextField }}
    />
  ))
