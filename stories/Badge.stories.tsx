/*!
 * © 2026 Atypon Systems LLC
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
import styled from 'styled-components'

import { BadgeVariant, BadgeSize, Badge } from '../src/components/Badge'

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px;
`

const Label = styled.span`
  font-size: 12px;
  color: #666;
  min-width: 60px;
`

const meta: Meta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'warning',
        'info',
        'bordered',
        'success',
        'dark',
      ] satisfies BadgeVariant[],
    },
    label: { control: 'text' },
    width: { control: { type: 'number', min: 40, max: 300 } },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'] satisfies BadgeSize[],
    },
  },
  args: {
    label: 'Badge',
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: { variant: 'default' },
}

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Warning: Story = {
  args: { variant: 'warning' },
}

export const Info: Story = {
  args: { variant: 'info' },
}

export const Bordered: Story = {
  args: { variant: 'bordered' },
}

export const CustomWidth: Story = {
  args: { variant: 'info', width: 120 },
}

export const Small: Story = {
  args: { variant: 'primary', size: 'sm' },
}

export const Success: Story = {
  args: { variant: 'success' },
}

export const Dark: Story = {
  args: { variant: 'dark' },
}
