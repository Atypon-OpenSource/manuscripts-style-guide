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
import React, { useState } from 'react'

import { ToggleSwitch } from '../src'

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Forms/ToggleSwitch',
  component: ToggleSwitch,
}

export default meta
type Story = StoryObj<typeof ToggleSwitch>

const ToggleStory = ({
  label,
  initialChecked = false,
  disabled = false,
  labelPosition = 'left',
}: {
  label: string
  initialChecked?: boolean
  disabled?: boolean
  labelPosition?: 'left' | 'right'
}) => {
  const [checked, setChecked] = useState(initialChecked)
  return (
    <ToggleSwitch
      label={label}
      checked={checked}
      disabled={disabled}
      onChange={setChecked}
      labelPosition={labelPosition}
    />
  )
}

export const ToggleSwitchStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
      }}
    >
      <ToggleStory label="Toggle is off" />
      <ToggleStory label="Toggle is on" initialChecked />
      <ToggleStory label="Toggle is disabled" disabled />
      <ToggleStory
        label="Label on right"
        labelPosition="right"
        initialChecked
      />
      <ToggleStory label="Label on left" labelPosition="left" initialChecked />
    </div>
  ),
}
