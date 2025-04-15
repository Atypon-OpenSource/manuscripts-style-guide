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
import React from 'react'

import { AlertMessage, AlertMessageType } from '../src/'

const meta = {
  title: 'AlertMessage',
  component: AlertMessage,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertMessage>

export default meta
type Story = StoryObj<typeof AlertMessage>

export const Success: Story = {
  args: {
    type: AlertMessageType.success,
    children: 'Example of overall success message. Lorem ipsum dolor sit amet.',
  },
}

export const Error: Story = {
  args: {
    type: AlertMessageType.error,
    children: 'Example of overall error message. Lorem ipsum dolor sit amet.',
  },
}

export const Info: Story = {
  args: {
    type: AlertMessageType.info,
    children: 'Example of overall info message. Lorem ipsum dolor sit amet.',
  },
}

export const Warning: Story = {
  args: {
    type: AlertMessageType.warning,
    children: 'Example of overall warning message. Lorem ipsum dolor sit amet.',
  },
}

export const WithoutCloseButton: Story = {
  args: {
    type: AlertMessageType.warning,
    children: 'Example of overall warning message. Lorem ipsum dolor sit amet.',
  },
}

export const WithDismissText: Story = {
  args: {
    type: AlertMessageType.warning,
    dismissButton: { text: 'Dismiss' },
    children: 'Example of overall warning message. Lorem ipsum dolor sit amet.',
  },
}

export const WithStaticWidth: Story = {
  render: () => (
    <div style={{ width: 800 }}>
      <AlertMessage
        type={AlertMessageType.info}
        dismissButton={{
          action: () => console.log('button clicked'),
          text: 'Click Here',
        }}
      >
        Example of overall warning message. Lorem ipsum dolor sit amet.
      </AlertMessage>
    </div>
  ),
}

export const WithSmallContainer: Story = {
  render: () => (
    <div style={{ width: 250 }}>
      <AlertMessage
        type={AlertMessageType.info}
        dismissButton={{
          action: () => console.log('button clicked'),
          text: 'Click Here',
        }}
      >
        Example of overall warning message. Lorem ipsum dolor sit amet.
      </AlertMessage>
    </div>
  ),
}
