import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { AuthorsDND } from '../src'
import authors from './data/authors'

const CustomAuthorName = ({ name }) => (
  <span>
    {name.given} <strong>{name.family}</strong>
  </span>
)

storiesOf('AuthorsDND', module)
  .add('Authors drag & drop list', () => (
    <AuthorsDND
      authors={authors}
      selectAuthor={action('select author')}
      selectedAuthor={null}
      openAddAuthors={action('start adding')}
      handleDrop={action('dropped the user')}
    />
  ))
  .add('Authors drag & drop list with decorations', () => (
    <AuthorsDND
      authors={authors}
      selectAuthor={action('select author')}
      selectedAuthor={null}
      getSidebarItemDecorator={() => <span>Ain't Afraid</span>}
      openAddAuthors={action('start adding')}
      handleDrop={action('dropped the user')}
    />
  ))
  .add('Authors D&D list with custom component for rendering the name', () => (
    <AuthorsDND
      authors={authors}
      selectAuthor={action('select author')}
      selectedAuthor={null}
      openAddAuthors={action('start adding')}
      handleDrop={action('dropped the user')}
      renderAuthorName={CustomAuthorName}
    />
  ))
