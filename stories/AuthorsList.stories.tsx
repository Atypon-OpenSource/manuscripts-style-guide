import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { AuthorsList } from '../src/components/AuthorsList'
import {
  buildAffiliationIDs,
  buildAuthorAffiliations,
} from '../src/lib/authors'
import affiliations from './data/affiliations'
import authors from './data/authors'

const affiliationIds = buildAffiliationIDs(authors)

const authorAffiliations = buildAuthorAffiliations(
  authors,
  affiliations,
  affiliationIds
)

storiesOf('AuthorsList', module)
  .add('Authors with edit button', () => (
    <AuthorsList
      authors={authors}
      authorAffiliations={authorAffiliations}
      startEditing={action('start editing')}
      showEditButton={true}
      selectAuthor={action('select author')}
    />
  ))
  .add('Authors with no edit button', () => (
    <AuthorsList
      authors={authors}
      authorAffiliations={authorAffiliations}
      startEditing={action('start editing')}
      showEditButton={false}
      selectAuthor={action('select author')}
    />
  ))
