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
import { Field, Form, Formik } from 'formik'
import React from 'react'
import styled from 'styled-components'

import { FormField, InputErrorText, Label, SelectField } from '../src'

const meta: Meta<typeof SelectField> = {
  title: 'Forms/SelectField',
  component: SelectField,
}

export default meta
type Story = StoryObj<typeof SelectField>

const options = [
  { label: 'Section', value: 'section' },
  { label: 'Graphical Abstract', value: 'graphical-abstract' },
  { label: 'Content', value: 'content' },
]

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

export const SelectStates: Story = {
  render: () => (
    <Formik
      initialValues={{
        blur_empty: '',
        blur_content: 'content',
        focus_empty: '',
        focus_content: 'content',
        error_empty: '',
        error_content: 'content',
        disabled_empty: '',
        disabled_content: 'content',
      }}
      onSubmit={() => {}}
    >
      <StatesGrid>
        <div />
        <ColumnHeader>Select Large</ColumnHeader>
        <ColumnHeader>Select small</ColumnHeader>

        <StateLabel>
          Blur (default)
          <br />
          UNSELECTED
        </StateLabel>
        <FormField>
          <Label>Label</Label>
          <Field
            name="blur_empty"
            component={SelectField}
            options={options}
            variant="large"
            placeholder="Select an option"
          />
        </FormField>
        <FormField>
          <Label>Label</Label>
          <Field
            name="blur_empty"
            component={SelectField}
            options={options}
            variant="small"
            placeholder="Placeholder"
          />
        </FormField>

        <StateLabel>
          Hover
          <br />
          UNSELECTED
        </StateLabel>
        <FormField>
          <Label>Label</Label>
          <Field
            name="hover_empty"
            component={SelectField}
            options={options}
            variant="large"
            placeholder="Select an option"
          />
        </FormField>
        <FormField>
          <Label>Label</Label>
          <Field
            name="hover_empty"
            component={SelectField}
            options={options}
            variant="small"
            placeholder="Placeholder"
          />
        </FormField>

        <StateLabel>
          Focus
          <br />
          DROPDOWN OPEN
        </StateLabel>
        <FormField>
          <Label>Label</Label>
          <Field
            name="focus_empty"
            component={SelectField}
            options={options}
            variant="large"
            placeholder="Select an option"
            menuIsOpen
          />
        </FormField>
        <FormField>
          <Label>Label</Label>
          <Field
            name="focus_empty"
            component={SelectField}
            options={options}
            variant="small"
            placeholder="Placeholder"
            menuIsOpen
          />
        </FormField>

        <StateLabel>
          Focus
          <br />
          SELECTED
        </StateLabel>
        <FormField>
          <Label>Label</Label>
          <Field
            name="focus_content"
            component={SelectField}
            options={options}
            variant="large"
          />
        </FormField>
        <FormField>
          <Label>Label</Label>
          <Field
            name="focus_content"
            component={SelectField}
            options={options}
            variant="small"
          />
        </FormField>

        <StateLabel>
          Blur (default)
          <br />
          SELECTED
        </StateLabel>
        <FormField>
          <Label>Label</Label>
          <Field
            name="blur_content"
            component={SelectField}
            options={options}
            variant="large"
          />
        </FormField>
        <FormField>
          <Label>Label</Label>
          <Field
            name="blur_content"
            component={SelectField}
            options={options}
            variant="small"
          />
        </FormField>

        <StateLabel>
          Error
          <br />
          UNSELECTED
        </StateLabel>
        <FormField>
          <Label>Label</Label>
          <Field
            name="error_empty"
            component={SelectField}
            options={options}
            variant="large"
            placeholder="Select an option"
            error
          />
          <InputErrorText>Error message</InputErrorText>
        </FormField>
        <FormField>
          <Label>Label</Label>
          <Field
            name="error_empty"
            component={SelectField}
            options={options}
            variant="small"
            placeholder="Placeholder"
            error
          />
          <InputErrorText>Error message</InputErrorText>
        </FormField>

        <StateLabel>
          Error
          <br />
          SELECTED
        </StateLabel>
        <FormField>
          <Label>Label</Label>
          <Field
            name="error_content"
            component={SelectField}
            options={options}
            variant="large"
            error
          />
          <InputErrorText>Error message</InputErrorText>
        </FormField>
        <FormField>
          <Label>Label</Label>
          <Field
            name="error_content"
            component={SelectField}
            options={options}
            variant="small"
            error
          />
          <InputErrorText>Error message</InputErrorText>
        </FormField>

        <StateLabel>
          Disabled
          <br />
          UNSELECTED
        </StateLabel>
        <FormField>
          <Label>Label</Label>
          <Field
            name="disabled_empty"
            component={SelectField}
            options={options}
            variant="large"
            placeholder="Placeholder"
            isDisabled
          />
        </FormField>
        <FormField>
          <Label>Label</Label>
          <Field
            name="disabled_empty"
            component={SelectField}
            options={options}
            variant="small"
            placeholder="Placeholder"
            isDisabled
          />
        </FormField>

        <StateLabel>
          Disabled
          <br />
          SELECTED
        </StateLabel>
        <FormField>
          <Label>Label</Label>
          <Field
            name="disabled_content"
            component={SelectField}
            options={options}
            variant="large"
            isDisabled
          />
        </FormField>
        <FormField>
          <Label>Label</Label>
          <Field
            name="disabled_content"
            component={SelectField}
            options={options}
            variant="small"
            isDisabled
          />
        </FormField>
      </StatesGrid>
    </Formik>
  ),
}
