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

import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

import { Category, Dialog, TextArea } from '../src'

const meta: Meta<typeof Dialog> = {
  title: 'Dialog',
  component: Dialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Dialog>

export const ConfirmationDialog: Story = {
  args: {
    isOpen: true,
    category: Category.confirmation,
    header: 'Are you sure?',
    message: 'This action will update your status',
    actions: {
      primary: {
        action: () => console.log('Confirm clicked'),
        title: 'Confirm',
      },
      secondary: {
        action: () => console.log('Cancel clicked'),
        title: 'Cancel',
      },
    },
  },
}

export const ConfirmationDialogWithoutSecondary: Story = {
  args: {
    isOpen: true,
    category: Category.confirmation,
    header: 'Are you sure?',
    message: 'This action will update your status',
    actions: {
      primary: {
        action: () => console.log('Confirm clicked'),
        title: 'Confirm',
      },
    },
  },
}

export const ConfirmationDialogWithDestructivePrimary: Story = {
  args: {
    isOpen: true,
    category: Category.confirmation,
    header: 'Are you sure?',
    message:
      'This action will cause everything to blow up at 9:00 (9:30 in Newfoundland)',
    actions: {
      primary: {
        action: () => console.log('Confirm clicked'),
        title: 'Confirm',
        isDestructive: true,
      },
      secondary: {
        action: () => console.log('Cancel clicked'),
        title: 'Cancel',
      },
    },
  },
}

export const ConfirmationDialogWithDestructivePrimaryAndConfirmationInput: Story =
  {
    args: {
      isOpen: true,
      category: Category.confirmation,
      header: 'Are you sure?',
      message:
        'This action will cause everything to blow up at 9:00 (9:30 in Newfoundland)',
      actions: {
        primary: {
          action: () => console.log('You killed Kenny'),
          title: 'Blow everything!',
          isDestructive: true,
        },
        secondary: {
          action: () => console.log('Cancel clicked'),
          title: 'Cancel',
        },
      },
      confirmFieldText: 'blow up',
    },
  }

export const ErrorDialog: Story = {
  args: {
    isOpen: true,
    category: Category.error,
    header: 'Well that was a mistake',
    message: 'Please restart the Internet',
    actions: {
      primary: {
        action: () => console.log('OK clicked'),
        title: 'OK',
      },
    },
  },
}

export const ErrorDialogWithOverflowingText: Story = {
  args: {
    isOpen: true,
    category: Category.error,
    header: 'Import error',
    message:
      'There was an error importing SupercalifragilisticexpialidociousSupercalifragilisticexpialidociousSupercalifragilisticexpialidocious.docx',
    actions: {
      primary: {
        action: () => console.log('OK clicked'),
        title: 'OK',
      },
    },
  },
}

export const DialogWithExtraChildren: Story = {
  args: {
    isOpen: true,
    category: Category.confirmation,
    header: 'Are you sure?',
    message: 'Lorem ipsum dolor sit amet',
    actions: {
      primary: {
        action: () => console.log('Confirm clicked'),
        title: 'Confirm',
      },
      secondary: {
        action: () => console.log('Cancel clicked'),
        title: 'Cancel',
      },
    },
  },
  render: (args) => (
    <Dialog {...args}>
      <TextArea rows={4} />
    </Dialog>
  ),
}
