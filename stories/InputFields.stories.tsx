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
import React from 'react'
import styled from 'styled-components'

import { FormField, InputErrorText, Label, TextField } from '../src'

const meta: Meta<typeof TextField> = {
  title: 'Forms/InputFields',
  component: TextField,
}

export default meta
type Story = StoryObj<typeof TextField>

const StatesGrid = styled.div`
  display: grid;
  grid-template-columns: 150px 300px 300px;
  gap: 24px;
  align-items: flex-start;
  padding: 24px;
`

const ColumnHeader = styled.div`
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  margin-bottom: 12px;
`

const StateLabel = styled.span`
  font-family: 'PT Sans', sans-serif;
  font-size: 14px;
  color: #6e6e6e;
  padding-top: 32px;
`

export const InputStates: Story = {
  render: () => (
    <StatesGrid>
      <div />
      <ColumnHeader>Large Input</ColumnHeader>
      <ColumnHeader>Small Input</ColumnHeader>

      <StateLabel>
        Blur (default)
        <br />
        EMPTY
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextField variant="large" placeholder="Placeholder" />
      </FormField>
      <FormField>
        <Label>Label</Label>
        <TextField variant="small" placeholder="Placeholder" />
      </FormField>

      <StateLabel>
        Hover
        <br />
        EMPTY
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextField
          variant="large"
          placeholder="Placeholder"
          className="hover-state-large"
        />
        <style>{`.hover-state-large:hover { border-color: #6E6E6E; }`}</style>
      </FormField>
      <FormField>
        <Label>Label</Label>
        <TextField
          variant="small"
          placeholder="Placeholder"
          className="hover-state-small"
        />
        <style>{`.hover-state-small:hover { border-color: #6E6E6E; }`}</style>
      </FormField>

      <StateLabel>
        Focus
        <br />
        EMPTY
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
        <TextField variant="large" placeholder="Placeholder" autoFocus />
      </FormField>
      <FormField>
        <Label>Label</Label>
        <TextField variant="small" placeholder="Placeholder" />
      </FormField>

      <StateLabel>
        Focus
        <br />
        WITH CONTENT
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextField variant="large" value="Content" onChange={() => {}} />
      </FormField>
      <FormField>
        <Label>Label</Label>
        <TextField variant="small" value="Content" onChange={() => {}} />
      </FormField>

      <StateLabel>
        Blur (default)
        <br />
        WITH CONTENT
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextField variant="large" value="Content" onChange={() => {}} />
      </FormField>
      <FormField>
        <Label>Label</Label>
        <TextField variant="small" value="Content" onChange={() => {}} />
      </FormField>

      <StateLabel>
        Error
        <br />
        EMPTY
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextField variant="large" placeholder="Placeholder" error />
        <InputErrorText>Error message</InputErrorText>
      </FormField>
      <FormField>
        <Label>Label</Label>
        <TextField variant="small" placeholder="Placeholder" error />
        <InputErrorText>Error message</InputErrorText>
      </FormField>

      <StateLabel>
        Error
        <br />
        WITH CONTENT
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextField variant="large" value="Content" onChange={() => {}} error />
        <InputErrorText>Error message</InputErrorText>
      </FormField>
      <FormField>
        <Label>Label</Label>
        <TextField variant="small" value="Content" onChange={() => {}} error />
        <InputErrorText>Error message</InputErrorText>
      </FormField>

      <StateLabel>
        Disabled
        <br />
        EMPTY
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextField variant="large" placeholder="Placeholder" disabled />
      </FormField>
      <FormField>
        <Label>Label</Label>
        <TextField variant="small" placeholder="Placeholder" disabled />
      </FormField>

      <StateLabel>
        Disabled
        <br />
        WITH CONTENT
      </StateLabel>
      <FormField>
        <Label>Label</Label>
        <TextField
          variant="large"
          value="Content"
          onChange={() => {}}
          disabled
        />
      </FormField>
      <FormField>
        <Label>Label</Label>
        <TextField
          variant="small"
          value="Content"
          onChange={() => {}}
          disabled
        />
      </FormField>
    </StatesGrid>
  ),
}
