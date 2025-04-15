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

import { TextField, TextFieldLabel } from '../src'

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    placeholder: 'Enter username...',
    id: 'username-field',
  },
  render: (args) => (
    <TextFieldLabel htmlFor={args.id}>
      Username
      <TextField {...args} />
    </TextFieldLabel>
  ),
}

export const WithError: Story = {
  args: {
    placeholder: 'Enter email...',
    error: 'Please enter a valid email address',
    id: 'email-field-error',
  },
  render: (args) => (
    <TextFieldLabel htmlFor={args.id}>
      Email
      <TextField {...args} />
    </TextFieldLabel>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'This field is disabled',
    disabled: true,
    id: 'disabled-field',
  },
  render: (args) => (
    <TextFieldLabel htmlFor={args.id}>
      Disabled Field
      <TextField {...args} />
    </TextFieldLabel>
  ),
}

export const Required: Story = {
  args: {
    placeholder: 'This field is required',
    required: true,
    id: 'required-field',
  },
  render: (args) => (
    <TextFieldLabel htmlFor={args.id}>
      Required Field
      <TextField {...args} />
    </TextFieldLabel>
  ),
}
