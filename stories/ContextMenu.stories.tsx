/*!
 * © 2024 Atypon Systems LLC
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

import { ContextMenu } from '../src/components/ContextMenu'

const meta: Meta<typeof ContextMenu> = {
  title: 'ContextMenu',
  component: ContextMenu,
}

export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  args: {
    actions: [
      {
        label: 'Bold',
        icon: 'ToolbarBold',
        action: () => console.log('Bold clicked'),
      },
      {
        label: 'Italic',
        icon: 'ToolbarItalic',
        action: () => console.log('Italic clicked'),
      },
      {
        label: 'Underline',
        icon: 'ToolbarUnderline',
        action: () => console.log('Underline clicked'),
      },
      {
        label: 'Code',
        icon: 'ToolbarCode',
        action: () => console.log('Code clicked'),
      },
    ],
  },
}

export const WithDisabledActions: Story = {
  args: {
    actions: [
      {
        label: 'Bold',
        icon: 'ToolbarBold',
        action: () => console.log('Bold clicked'),
      },
      {
        label: 'Italic',
        icon: 'ToolbarItalic',
        action: () => console.log('Italic clicked'),
        disabled: true,
      },
      {
        label: 'Underline',
        icon: 'ToolbarUnderline',
        action: () => console.log('Underline clicked'),
      },
      {
        label: 'Code',
        icon: 'ToolbarCode',
        action: () => console.log('Code clicked'),
        disabled: true,
      },
    ],
  },
}

export const WithSelectedAction: Story = {
  args: {
    actions: [
      {
        label: 'Bold',
        icon: 'ToolbarBold',
        action: () => console.log('Bold clicked'),
        selected: true,
      },
      {
        label: 'Italic',
        icon: 'ToolbarItalic',
        action: () => console.log('Italic clicked'),
      },
      {
        label: 'Underline',
        icon: 'ToolbarUnderline',
        action: () => console.log('Underline clicked'),
      },
      {
        label: 'Code',
        icon: 'ToolbarCode',
        action: () => console.log('Code clicked'),
      },
    ],
  },
}
