import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { AuthorsDND } from '../src'
import { AuthorNameProps } from '../src/components/AuthorName'
import authors from './data/authors'

const AuthorName: React.FC<AuthorNameProps> = ({ name }) => (
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
      handleDrop={action('dropped the user')}
    />
  ))
  .add('Authors drag & drop list with decorations', () => (
    <AuthorsDND
      authors={authors}
      selectAuthor={action('select author')}
      selectedAuthor={null}
      getSidebarItemDecorator={() => <span>Ain't Afraid</span>}
      handleDrop={action('dropped the user')}
    />
  ))
  .add('Authors D&D list with custom component for rendering the name', () => (
    <AuthorsDND
      authors={authors}
      selectAuthor={action('select author')}
      selectedAuthor={null}
      handleDrop={action('dropped the user')}
      components={{ AuthorName }}
    />
  ))
