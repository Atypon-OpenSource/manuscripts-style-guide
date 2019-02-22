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
