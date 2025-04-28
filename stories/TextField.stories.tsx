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

import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react' // Import CSF types
import { Field, FieldProps, Form, Formik } from 'formik'
import * as React from 'react'

import {
  AutoSaveInput,
  EditIcon,
  TextField,
  TextFieldContainer,
  TextFieldError,
  TextFieldErrorItem,
  TextFieldGroup,
  TextFieldGroupContainer,
  TextFieldWrapper,
} from '../src'

// Define Meta for the story file - groups all stories under 'TextField'
const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField, // Associate with the main TextField component
  tags: ['autodocs'],
}

export default meta
// Define a generic Story type based on TextField props (adjust if needed for complex stories)
type Story = StoryObj<typeof TextField>

// Basic TextField Stories
export const Default: Story = {
  name: 'Default', // Explicit name matching the old .add()
  render: () => <TextField />,
}

export const Required: Story = {
  name: 'Required',
  render: () => <TextField required={true} />,
}

export const WithPlaceholder: Story = {
  name: 'With Placeholder',
  render: () => <TextField placeholder={'Enter some text'} />,
}

export const TypeEmail: Story = {
  name: 'Type: Email',
  render: () => <TextField type={'email'} required={true} />,
}

export const TypePassword: Story = {
  name: 'Type: Password',
  render: () => <TextField type={'password'} required={true} />,
}

export const Grouped: Story = {
  name: 'Grouped',
  render: () => (
    <TextFieldGroup>
      <TextField />
      <TextField />
      <TextField />
      <TextField />
      <TextField />
    </TextFieldGroup>
  ),
}

export const WithIcon: Story = {
  name: 'With Icon',
  render: () => (
    <TextFieldWrapper leftIcon={<EditIcon />}>
      <TextField />
    </TextFieldWrapper>
  ),
}

// AutoSave Stories (using name for grouping)
export const AutoSaveOnChange: Story = {
  name: 'AutoSave / On Change',
  render: () => (
    <Formik initialValues={{ name: '' }} onSubmit={action('submit')}>
      <Form>
        <Field name={'name'}>
          {(props: FieldProps) => (
            <AutoSaveInput
              {...props}
              component={TextField}
              saveOn={'change'}
              placeholder={'Name'}
            />
          )}
        </Field>
      </Form>
    </Formik>
  ),
}

export const AutoSaveOnBlur: Story = {
  name: 'AutoSave / On Blur',
  render: () => (
    <Formik initialValues={{ name: '', email: '' }} onSubmit={action('submit')}>
      <Form>
        <TextFieldGroupContainer>
          <Field name={'name'}>
            {(props: FieldProps) => (
              <AutoSaveInput
                {...props}
                component={TextField}
                saveOn={'blur'}
                placeholder={'Name'}
              />
            )}
          </Field>
          <Field name={'email'} type={'email'}>
            {(props: FieldProps) => (
              <AutoSaveInput
                {...props}
                component={TextField}
                saveOn={'blur'}
                placeholder={'Email Address'}
              />
            )}
          </Field>
        </TextFieldGroupContainer>
      </Form>
    </Formik>
  ),
}

// Container Stories (using name for grouping)
export const ContainerDefault: Story = {
  name: 'Container / Default',
  // Associate with TextFieldContainer if needed for docs, but keep primary component as TextField
  // component: TextFieldContainer,
  render: () => (
    <TextFieldContainer>
      <TextField />
    </TextFieldContainer>
  ),
}

export const ContainerWithLabel: Story = {
  name: 'Container / With Label',
  render: () => (
    <TextFieldContainer label={'Name'}>
      <TextField />
    </TextFieldContainer>
  ),
}

export const ContainerWithError: Story = {
  name: 'Container / With Error',
  render: () => (
    <TextFieldContainer error={'There was an error'}>
      <TextField />
    </TextFieldContainer>
  ),
}

// GroupContainer Stories (using name for grouping)
export const GroupContainerDefault: Story = {
  name: 'GroupContainer / Default',
  render: () => (
    <TextFieldGroupContainer>
      <TextFieldContainer>
        <TextField name={'foo'} />
      </TextFieldContainer>
      <TextFieldContainer>
        <TextField name={'foo'} />
      </TextFieldContainer>
    </TextFieldGroupContainer>
  ),
}

export const GroupContainerOneError: Story = {
  name: 'GroupContainer / One Error',
  render: () => (
    <TextFieldGroupContainer
      errors={{
        foo: 'There was an error',
      }}
    >
      <TextField name={'foo'} error={'There was an error'} />
      <TextField name={'bar'} />
    </TextFieldGroupContainer>
  ),
}

export const GroupContainerAnotherError: Story = {
  name: 'GroupContainer / Another Error',
  render: () => (
    <TextFieldGroupContainer
      errors={{
        foo: 'There was an error',
        baz: 'There was another error',
      }}
    >
      <TextField name={'foo'} error={'There was an error'} />
      <TextField name={'bar'} />
      <TextField name={'baz'} error={'There was another error'} />
    </TextFieldGroupContainer>
  ),
}

export const GroupContainerMultipleErrors: Story = {
  name: 'GroupContainer / Multiple Errors',
  render: () => (
    <TextFieldGroupContainer
      errors={{
        foo: 'There was an error',
        bar: 'There was another error',
        baz: 'There was a third error',
      }}
    >
      <TextField name={'foo'} error={'There was an error'} />
      <TextField name={'bar'} error={'There was another error'} />
      <TextField name={'baz'} error={'There was a third error'} />
    </TextFieldGroupContainer>
  ),
}

// Error Story (using name for grouping)
export const ErrorDefault: Story = {
  name: 'Error / Default',
  render: () => (
    <TextFieldError>
      <TextFieldErrorItem>There was an error</TextFieldErrorItem>
    </TextFieldError>
  ),
}
