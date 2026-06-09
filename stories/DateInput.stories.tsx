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
import styled from 'styled-components'

import {
  DateInput,
  DateTimeInput,
  FormField,
  InputErrorText,
  Label,
} from '../src'

const meta: Meta<typeof DateInput> = {
  title: 'Forms/DateInput',
  component: DateInput,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['small', 'large'],
    },
    error: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof DateInput>

const Container = styled.div`
  width: 320px;
  padding: 24px;
`

const SectionLabel = styled.div`
  font-family: 'PT Sans', sans-serif;
  font-size: 14px;
  color: #6e6e6e;
  margin-bottom: 8px;
`

const StatesGrid = styled.div`
  display: grid;
  grid-template-columns: 160px 320px 320px;
  gap: 24px;
  align-items: center;
  padding: 24px;
`

const ColumnHeader = styled.div`
  font-family: 'PT Sans', sans-serif;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`

type AnyDateComponent = typeof DateInput | typeof DateTimeInput

type WrapperProps = Omit<
  React.ComponentProps<typeof DateInput>,
  'value' | 'onChange'
> & {
  initial?: string
  as?: AnyDateComponent
}

const Wrapper: React.FC<WrapperProps> = ({
  initial,
  as: Component = DateInput,
  ...props
}) => {
  const [value, setValue] = useState<string>(initial ?? '')
  return (
    <Component
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

const today = new Date().toISOString().slice(0, 10)

export const Default: Story = {
  args: {
    required: false,
    disabled: false,
  },
  render: (args) => (
    <Container>
      <SectionLabel>Date</SectionLabel>
      <Wrapper {...args} />
      <SectionLabel style={{ marginTop: 16 }}>Date &amp; time</SectionLabel>
      <Wrapper {...args} as={DateTimeInput} />
    </Container>
  ),
}

export const WithSelectedValue: Story = {
  render: () => (
    <Container>
      <SectionLabel>Date — pre-selected</SectionLabel>
      <Wrapper initial="2026-04-16" />
      <SectionLabel style={{ marginTop: 16 }}>
        Date &amp; time — pre-selected
      </SectionLabel>
      <Wrapper as={DateTimeInput} initial="2026-04-16T10:30" />
    </Container>
  ),
}

export const WithMinDate: Story = {
  render: () => (
    <Container>
      <SectionLabel>Min date = today</SectionLabel>
      <Wrapper min={today} />
      <SectionLabel style={{ marginTop: 16 }}>
        Min date &amp; time = today
      </SectionLabel>
      <Wrapper as={DateTimeInput} min={`${today}T00:00`} />
    </Container>
  ),
}

export const Required: Story = {
  render: () => (
    <Container>
      <SectionLabel>Required date</SectionLabel>
      <Wrapper required />
      <SectionLabel style={{ marginTop: 16 }}>
        Required date &amp; time
      </SectionLabel>
      <Wrapper as={DateTimeInput} required />
    </Container>
  ),
}

export const WithError: Story = {
  render: () => (
    <Container>
      <SectionLabel>Date — error</SectionLabel>
      <FormField>
        <Label>Date</Label>
        <Wrapper error initial="2020-01-01" />
        <InputErrorText>Error message</InputErrorText>
      </FormField>
      <SectionLabel style={{ marginTop: 16 }}>
        Date &amp; time — error
      </SectionLabel>
      <FormField>
        <Label>Date &amp; time</Label>
        <Wrapper as={DateTimeInput} error initial="2020-01-01T09:00" />
        <InputErrorText>Error message</InputErrorText>
      </FormField>
    </Container>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Container>
      <SectionLabel>Disabled date</SectionLabel>
      <Wrapper disabled initial="2026-04-16" />
      <SectionLabel style={{ marginTop: 16 }}>
        Disabled date &amp; time
      </SectionLabel>
      <Wrapper as={DateTimeInput} disabled initial="2026-04-16T10:30" />
    </Container>
  ),
}

export const States: Story = {
  render: () => (
    <StatesGrid>
      <div />
      <ColumnHeader>Date</ColumnHeader>
      <ColumnHeader>Date &amp; time</ColumnHeader>

      <SectionLabel>Empty</SectionLabel>
      <Wrapper />
      <Wrapper as={DateTimeInput} />

      <SectionLabel>Filled</SectionLabel>
      <Wrapper initial="2026-04-16" />
      <Wrapper as={DateTimeInput} initial="2026-04-16T10:30" />

      <SectionLabel>Small</SectionLabel>
      <Wrapper variant="small" initial="2026-04-16" />
      <Wrapper as={DateTimeInput} variant="small" initial="2026-04-16T10:30" />

      <SectionLabel>Large</SectionLabel>
      <Wrapper variant="large" initial="2026-04-16" />
      <Wrapper as={DateTimeInput} variant="large" initial="2026-04-16T10:30" />

      <SectionLabel>Required</SectionLabel>
      <Wrapper required />
      <Wrapper as={DateTimeInput} required />

      <SectionLabel>Error</SectionLabel>
      <FormField>
        <Wrapper error initial="2026-04-16" />
        <InputErrorText>Error message</InputErrorText>
      </FormField>
      <FormField>
        <Wrapper as={DateTimeInput} error initial="2026-04-16T10:30" />
        <InputErrorText>Error message</InputErrorText>
      </FormField>

      <SectionLabel>Disabled</SectionLabel>
      <Wrapper disabled initial="2026-04-16" />
      <Wrapper as={DateTimeInput} disabled initial="2026-04-16T10:30" />
    </StatesGrid>
  ),
}

