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

import { ThemeProvider } from '@mui/material/styles'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { BadgeVariant, Chip, muiTheme } from '../src/mui'

const variants: BadgeVariant[] = [
  'default',
  'primary',
  'warning',
  'info',
  'success',
  'dark',
  'orange',
]

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  padding: 16px;
`

const meta: Meta<typeof Chip> = {
  title: 'MUI/Chip',
  component: Chip,
  decorators: [
    (Story) => (
      <ThemeProvider theme={muiTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: variants,
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    label: { control: 'text' },
  },
  args: {
    label: 'Chip',
    variant: 'default',
    size: 'medium',
  },
}

export default meta
type Story = StoryObj<typeof Chip>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <>
      {(['medium', 'small'] as const).map((size) => (
        <Row key={size}>
          {variants.map((variant) => (
            <Chip
              key={variant}
              {...args}
              size={size}
              variant={variant}
              label={variant}
            />
          ))}
        </Row>
      ))}
    </>
  ),
}

export const Small: Story = {
  args: { size: 'small', variant: 'orange', label: 'on hold' },
}
