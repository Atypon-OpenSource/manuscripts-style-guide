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
import { fn } from '@storybook/test'
import { Field, FieldProps, Form, Formik } from 'formik'
import React from 'react'

import {
  AutoSaveInput,
  EditIcon,
  TextField,
  FormFieldContainer,
  TextFieldError,
  TextFieldErrorItem,
  TextFieldGroup,
  TextFieldGroupContainer,
  TextFieldWrapper,
} from '../src'

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {},
}

export const Required: Story = {
  args: {
    required: true,
  },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter some text',
  },
}

export const TypeEmail: Story = {
  args: {
    type: 'email',
    required: true,
  },
}

export const TypePassword: Story = {
  args: {
    type: 'password',
    required: true,
  },
}

export const Grouped: Story = {
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
  render: () => (
    <TextFieldWrapper leftIcon={<EditIcon />}>
      <TextField />
    </TextFieldWrapper>
  ),
}

// AutoSave stories
const metaAutoSave: Meta = {
  title: 'TextField/AutoSave',
}

export const AutoSaveOnChange: StoryObj = {
  ...metaAutoSave,
  render: () => (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={fn()}
    >
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

export const AutoSaveOnBlur: StoryObj = {
  ...metaAutoSave,
  render: () => (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={fn()}
    >
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

// Container stories
const metaContainer: Meta<typeof FormFieldContainer> = {
  title: 'TextField/Container',
  component: FormFieldContainer,
}

export const ContainerDefault: StoryObj<typeof FormFieldContainer> = {
  ...metaContainer,
  render: () => (
    <FormFieldContainer>
      <TextField />
    </FormFieldContainer>
  ),
}

export const ContainerWithLabel: StoryObj<typeof FormFieldContainer> = {
  ...metaContainer,
  render: () => (
    <FormFieldContainer label={'Name'}>
      <TextField />
    </FormFieldContainer>
  ),
}

export const ContainerWithError: StoryObj<typeof FormFieldContainer> = {
  ...metaContainer,
  render: () => (
    <FormFieldContainer error={'There was an error'}>
      <TextField />
    </FormFieldContainer>
  ),
}

// GroupContainer stories
const metaGroupContainer: Meta<typeof TextFieldGroupContainer> = {
  title: 'TextField/GroupContainer',
  component: TextFieldGroupContainer,
}

export const GroupContainerDefault: StoryObj<typeof TextFieldGroupContainer> = {
  ...metaGroupContainer,
  render: () => (
    <TextFieldGroupContainer>
      <FormFieldContainer>
        <TextField name={'foo'} />
      </FormFieldContainer>
      <FormFieldContainer>
        <TextField name={'foo'} />
      </FormFieldContainer>
    </TextFieldGroupContainer>
  ),
}

export const GroupContainerOneError: StoryObj<typeof TextFieldGroupContainer> =
  {
    ...metaGroupContainer,
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

export const GroupContainerAnotherError: StoryObj<
  typeof TextFieldGroupContainer
> = {
  ...metaGroupContainer,
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

export const GroupContainerMultipleErrors: StoryObj<
  typeof TextFieldGroupContainer
> = {
  ...metaGroupContainer,
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

// Error stories
const metaError: Meta<typeof TextFieldError> = {
  title: 'TextField/Error',
  component: TextFieldError,
}

export const ErrorDefault: StoryObj<typeof TextFieldError> = {
  ...metaError,
  render: () => (
    <TextFieldError>
      <TextFieldErrorItem>There was an error</TextFieldErrorItem>
    </TextFieldError>
  ),
}
