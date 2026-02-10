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

import { EditIcon, TextField, TextFieldGroup, TextFieldWrapper } from '../src'

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {},
}

export const Required: Story = {
  args: {
    required: true,
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter some text',
  },
}

export const TypeEmail: Story = {
  args: {
    type: 'email',
    required: true,
  },
}

export const TypePassword: Story = {
  args: {
    type: 'password',
    required: true,
  },
}

export const Grouped: Story = {
  render: () => (
    <TextFieldGroup>
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
    </TextFieldGroup>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <TextFieldWrapper leftIcon={<EditIcon />}>
      <TextField />
    </TextFieldWrapper>
  ),
}
