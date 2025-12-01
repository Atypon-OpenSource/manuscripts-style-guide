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
import { fn } from '@storybook/test'

import { Drawer } from '../src/components/Drawer'

const meta: Meta<typeof Drawer> = {
  title: 'Drawer',
  component: Drawer,
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  args: {
    title: 'Select Items',
    onBack: fn(),
    children: <p>Some drawable content</p>,
  },
  render: (args) => (
    <div style={{ height: '400px' }}>
      <Drawer {...args} />
    </div>
  ),
}

export const WithMultipleSelections: Story = {
  args: {
    title: 'Select Multiple Items',
    onBack: fn(),
    children: <p>Some drawable content</p>,
  },
  render: (args) => (
    <div style={{ height: '400px' }}>
      <Drawer {...args} />
    </div>
  ),
}

export const WithoutSelection: Story = {
  args: {
    title: 'Choose Items',
    onBack: fn(),
    children: <p>Some drawable content</p>,
  },
  render: (args) => (
    <div style={{ height: '400px' }}>
      <Drawer {...args} />
    </div>
  ),
}
