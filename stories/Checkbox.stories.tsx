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
import React, { useState } from 'react'

import { CheckboxField, CheckboxLabel, LabelText } from '../src'

const meta: Meta<typeof CheckboxField> = {
  title: 'Forms/Checkbox',
  component: CheckboxField,
}

export default meta
type Story = StoryObj<typeof CheckboxField>

const CheckboxStory = ({
  label,
  defaultChecked,
  disabled,
}: {
  label: string
  defaultChecked?: boolean
  disabled?: boolean
}) => {
  const [checked, setChecked] = useState<boolean>(!!defaultChecked)
  return (
    <CheckboxLabel disabled={disabled}>
      <CheckboxField
        checked={checked}
        disabled={disabled}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <LabelText>{label}</LabelText>
    </CheckboxLabel>
  )
}
// checkbox states
export const CheckboxStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
      }}
    >
      <CheckboxStory label="Checkbox unchecked" />
      <CheckboxStory defaultChecked label="Checkbox checked" />
      <CheckboxStory disabled label="Checkbox unchecked (disabled)" />
      <CheckboxStory
        disabled
        defaultChecked
        label="Checkbox checked (disabled)"
      />
    </div>
  ),
}
