/*!
 * © 2025 Atypon Systems LLC
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
import { fn } from '@storybook/test'
import React from 'react'

import { AlertMessage } from '../src/'

const meta: Meta<typeof AlertMessage> = {
  title: 'AlertMessage',
  component: AlertMessage,
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
    },
  },
}

export default meta
type Story = StoryObj<typeof AlertMessage>

export const Success: Story = {
  args: {
    variant: 'success',
    message: 'Example of overall info message. Lorem ipsum dolor sit amet.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    message: 'Example of overall danger message. Lorem ipsum dolor sit amet.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    message: 'Example of overall info message. Lorem ipsum dolor sit amet.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    message: 'Example of overall warning message. Lorem ipsum dolor sit amet.',
  },
}

export const WithLink: Story = {
  args: {
    variant: 'info',
    title: 'Update available',
    message: 'A new version has been released.',
    link: { label: 'Learn more', onClick: fn() },
  },
}

export const WithCloseIcon: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Your session will expire in 5 minutes.',
    closeConfig: { variant: 'icon', onClick: fn() },
  },
}

export const WithDismissText: Story = {
  args: {
    variant: 'error',
    title: 'Connection lost',
    message: 'Unable to reach the server.',
    closeConfig: { variant: 'text', label: 'Dismiss', onClick: fn() },
  },
}

export const MessageOnly: Story = {
  args: {
    variant: 'success',
    message: 'File uploaded successfully.',
  },
}

export const WithLinkAndClose: Story = {
  args: {
    variant: 'info',
    title: 'New feature',
    message: 'Check out the new collaboration tools.',
    link: { label: 'View details', onClick: fn() },
    closeConfig: { variant: 'icon', onClick: fn() },
  },
}

export const InSmallContainer: Story = {
  args: {
    variant: 'warning',
    title: 'Caution',
    message:
      'This is a long description that should wrap properly inside a small container to test responsive behavior.',
  },
  render: (args) => (
    <div style={{ width: 300 }}>
      <AlertMessage {...args} />
    </div>
  ),
}
