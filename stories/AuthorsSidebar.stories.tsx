import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { AuthorsSidebar } from '../src'
import authors from './data/authors'

storiesOf('AuthorSidebar', module)
  .add('Authors Sidebar', () => (
    <AuthorsSidebar
      authors={authors}
      selectAuthor={action('select author')}
      selectedAuthor={null}
      openAddAuthors={action('start adding')}
      handleDrop={action('dropped the user')}
    />
  ))
  .add('Authors Sidebar with decorations', () => (
    <AuthorsSidebar
      authors={authors}
      selectAuthor={action('select author')}
      selectedAuthor={null}
      getSidebarItemDecorator={() => <span>Ain't Afraid</span>}
      openAddAuthors={action('start adding')}
      handleDrop={action('dropped the user')}
    />
  ))
