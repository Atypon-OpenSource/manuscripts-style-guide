import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
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
      updateAuthor={action(
        'update author after inviting him to collaborate on project'
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
      updateAuthor={action(
        'update author after inviting him to collaborate on project'
      )}
    />
  ))
  .add('with form alert', () => (
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
      updateAuthor={action(
        'update author after inviting him to collaborate on project'
      )}
      authorFormAlert={<span>This author has been invited to the project</span>}
    />
  ))
