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
import { Category, Dialog } from '../src'

storiesOf('Dialog', module)
  .add('Confirmation Dialog', () => (
    <Dialog
      isOpen={true}
      category={Category.confirmation}
      header="Are you sure?"
      message="This action will cause everything to blow up at 9:00 (9:30 in Newfoundland)"
      actions={{
        primary: {
          action: action('Confirm'),
          title: 'Confirm',
        },
        secondary: {
          action: action('Cancel'),
          title: 'Cancel',
          isDestructive: false,
        },
      }}
    />
  ))
  .add('Desctructive secondary action', () => (
    <Dialog
      isOpen={true}
      category={Category.confirmation}
      header="Are you sure?"
      message="This action will cause everything to blow up at 9:00 (9:30 in Newfoundland)"
      actions={{
        primary: {
          action: action('Confirm'),
          title: 'Confirm',
        },
        secondary: {
          action: action('Cancel'),
          title: 'Cancel',
          isDestructive: true,
        },
      }}
    />
  ))
  .add('No secondary action', () => (
    <Dialog
      isOpen={true}
      category={Category.confirmation}
      header="Are you sure?"
      message="This action will cause everything to blow up at 9:00 (9:30 in Newfoundland)"
      actions={{
        primary: {
          action: action('Confirm'),
          title: 'Confirm',
        },
      }}
    />
  ))
  .add('Error dialog', () => (
    <Dialog
      isOpen={true}
      category={Category.error}
      header="Well that was a mistake"
      message="Please restart the Internet"
      actions={{
        primary: {
          action: action('OK'),
          title: 'OK',
        },
      }}
    />
  ))