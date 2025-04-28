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

import { SaveStatus } from '../src'

const meta: Meta<typeof SaveStatus> = {
  title: 'SaveStatus',
  component: SaveStatus,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SaveStatus>

export const Saved: Story = {
  args: {
    status: 'saved',
  },
}

export const Saving: Story = {
  args: {
    status: 'saving',
  },
}

export const Offline: Story = {
  args: {
    status: 'offline',
  },
}
