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
import styled from 'styled-components'

import { FormField, InputErrorText, Label, TextArea } from '../src'

const meta: Meta<typeof TextArea> = {
  title: 'Forms/TextArea',
  component: TextArea,
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    rows: 4,
  },
}

const StatesGrid = styled.div`
  display: grid;
  grid-template-columns: 150px 300px;
  gap: 24px;
  align-items: center;
  padding: 24px;
`

const StateLabel = styled.span`
  font-family: 'PT Sans', sans-serif;
  font-size: 14px;
  color: #6e6e6e;
`

export const TextAreaStates: Story = {
  render: () => (
    <StatesGrid>
      <StateLabel>
        Default
        <br />
        EMPTY
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextArea placeholder="Placeholder" rows={4} />
      </FormField>

      <StateLabel>
        Focus
        <br />
        EMPTY
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextArea placeholder="Placeholder" rows={4} autoFocus />
      </FormField>

      <StateLabel>
        Error
        <br />
        WITH CONTENT
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextArea value="Some content..." onChange={() => {}} rows={4} error />
        <InputErrorText>Error message</InputErrorText>
      </FormField>

      <StateLabel>
        Disabled
        <br />
        WITH CONTENT
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextArea
          value="Read-only content..."
          onChange={() => {}}
          rows={4}
          disabled
        />
      </FormField>
    </StatesGrid>
  ),
}
