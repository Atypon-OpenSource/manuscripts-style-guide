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

import { RadioButton } from '../src'

const meta: Meta<typeof RadioButton> = {
  title: 'Forms/RadioButton',
  component: RadioButton,
}

export default meta
type Story = StoryObj<typeof RadioButton>

const RadioStory = ({
  initialChecked,
  disabled,
  label,
  id,
}: {
  initialChecked: boolean
  disabled?: boolean
  label: string
  id: string
}) => {
  const [checked, setChecked] = useState(initialChecked)
  return (
    <RadioButton
      id={id}
      label={label}
      checked={checked}
      disabled={disabled}
      onChange={() => setChecked(!checked)}
    />
  )
}

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <RadioStory id="radio-1" label="Option 1" initialChecked={false} />
      <RadioStory id="radio-2" label="Option 2" initialChecked={true} />
      <RadioStory
        id="radio-3"
        label="Disabled Option"
        initialChecked={false}
        disabled
      />
    </div>
  ),
}

export const Checked: Story = {
  args: {
    id: 'checked',
    label: 'Radio checked',
    checked: true,
  },
}

export const Unchecked: Story = {
  args: {
    id: 'unchecked',
    label: 'Radio unchecked',
    checked: false,
  },
}

export const CheckedDisabled: Story = {
  args: {
    id: 'checked-disabled',
    label: 'Radio checked (disabled)',
    checked: true,
    disabled: true,
  },
}

export const UncheckedDisabled: Story = {
  args: {
    id: 'unchecked-disabled',
    label: 'Radio unchecked (disabled)',
    checked: false,
    disabled: true,
  },
}
