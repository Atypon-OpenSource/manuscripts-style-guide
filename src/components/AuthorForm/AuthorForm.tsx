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

import { Contributor, ContributorRole } from '@manuscripts/json-schema'
import { Field, FieldProps, Form, Formik } from 'formik'
import React from 'react'
import styled from 'styled-components'

import { AuthorValues } from '../../types'
import { AutoSaveInput } from '../AutoSaveInput'
import { CheckboxField, CheckboxLabel } from '../Checkbox'
import { TextArea, TextFieldLabel } from '../TextField'
import { TextFieldGroupContainer } from '../TextFieldGroupContainer'
import {
  AuthorFormComponentOverrides,
  Container,
  defaultAuthorFormComponents,
  Fields,
  Fieldset,
  Label,
  LabelText,
} from './AuthorFormComponents'
import { ContributorRolesSelect } from './ContributorRolesSelect'
import RemoveAuthorButton from './RemoveAuthorButton'

const ensureString = (value: string | undefined) => value || ''

const buildInitialValues = (author: Contributor): AuthorValues => {
  return {
    _id: author._id,
    priority: Number(author.priority), // TODO: ordering = priority
    email: ensureString(author.email),
    isCorresponding: Boolean(author.isCorresponding),
    isJointContributor: Boolean(author.isJointContributor),
    // grants: authorGrants,
    bibliographicName: {
      _id: author.bibliographicName._id,
      objectType: author.bibliographicName.objectType,
      given: ensureString(author.bibliographicName.given),
      family: ensureString(author.bibliographicName.family),
      suffix: ensureString(author.bibliographicName.suffix),
    },
    role: ensureString(author.role), // e.g. 'author' etc
    contribution: ensureString(author.contribution),
    ORCIDIdentifier: ensureString(author.ORCIDIdentifier),
    roles: author.roles || [],
  }
}

const OrcidContainer = styled.div`
  margin: 16px 0 0;
`

const RolesContainer = styled.div`
  margin: 16px 0;
`

export const AuthorForm: React.FunctionComponent<{
  author: Contributor
  isRemoveAuthorOpen: boolean
  removeAuthor: (data: Contributor) => void
  handleSave: (values: AuthorValues) => Promise<void>
  handleRemoveAuthor: () => void
  components?: AuthorFormComponentOverrides
  contributorRoles?: ContributorRole[]
  createContributorRole?: (name: string) => Promise<ContributorRole>
}> = ({
  author,
  handleSave,
  removeAuthor,
  isRemoveAuthorOpen,
  handleRemoveAuthor,
  components,
  contributorRoles = [],
  createContributorRole,
}) => {
  const { Legend, TextField } = {
    ...defaultAuthorFormComponents,
    ...components,
  }

  return (
    <Formik<AuthorValues>
      initialValues={buildInitialValues(author)}
      onSubmit={handleSave}
      enableReinitialize={true}
    >
      {({ values }) => {
        const isAuthor = values.role === 'author'

        return (
          <Form>
            <Fields>
              <Fieldset>
                <Container>
                  <Legend>Details</Legend>

                  <RemoveAuthorButton
                    author={author}
                    removeAuthor={() => {
                      removeAuthor(author)
                    }}
                    isOpen={isRemoveAuthorOpen}
                    handleOpen={handleRemoveAuthor}
                  />
                </Container>

                <TextFieldGroupContainer>
                  <Field name={'bibliographicName.given'}>
                    {(props: FieldProps) => (
                      <AutoSaveInput
                        {...props}
                        component={TextField}
                        saveOn={'blur'}
                        placeholder={'Given name'}
                        testId="bibliographic-name-given"
                      />
                    )}
                  </Field>

                  <Field name={'bibliographicName.family'}>
                    {(props: FieldProps) => (
                      <AutoSaveInput
                        {...props}
                        component={TextField}
                        saveOn={'blur'}
                        placeholder={'Family name'}
                        testId="bibliographic-name-family"
                      />
                    )}
                  </Field>
                </TextFieldGroupContainer>

                <CheckboxLabel disabled={!isAuthor}>
                  <Field name={'isCorresponding'}>
                    {(props: FieldProps) => (
                      <AutoSaveInput
                        {...props}
                        disabled={!isAuthor}
                        component={CheckboxField}
                        saveOn={'change'}
                        testId="corresponding-checkbox"
                      />
                    )}
                  </Field>
                  <LabelText>Corresponding Author</LabelText>
                </CheckboxLabel>

                {values.isCorresponding && (
                  <Label>
                    <Field name={'email'} type={'email'}>
                      {(props: FieldProps) => (
                        <AutoSaveInput
                          {...props}
                          disabled={!isAuthor}
                          component={TextField}
                          saveOn={'blur'}
                          placeholder={'Email address'}
                          testId="corresponding-email"
                        />
                      )}
                    </Field>
                  </Label>
                )}

                <CheckboxLabel disabled={!isAuthor}>
                  <Field name={'isJointContributor'}>
                    {(props: FieldProps) => (
                      <AutoSaveInput
                        {...props}
                        disabled={!isAuthor}
                        component={CheckboxField}
                        saveOn={'change'}
                      />
                    )}
                  </Field>
                  <LabelText>Joint Authorship with Next Author</LabelText>
                </CheckboxLabel>

                <CheckboxLabel>
                  <Field name={'role'} type={'checkbox'}>
                    {(props: FieldProps) => (
                      <CheckboxField
                        name={'role'}
                        checked={isAuthor}
                        onChange={async (event) => {
                          props.form.setFieldValue(
                            props.field.name,
                            event.target.checked ? 'author' : 'other',
                            false
                          )
                          await props.form.submitForm()
                        }}
                      />
                    )}
                  </Field>
                  <LabelText>Include in Authors List</LabelText>
                </CheckboxLabel>

                <OrcidContainer>
                  <TextFieldLabel>
                    <LabelText>ORCID</LabelText>
                    <Field name={'ORCIDIdentifier'} type={'text'}>
                      {(props: FieldProps) => (
                        <AutoSaveInput
                          {...props}
                          component={TextField}
                          saveOn={'blur'}
                          placeholder={'https://orcid.org/...'}
                          testId="bibliographic-name-family"
                        />
                      )}
                    </Field>
                  </TextFieldLabel>
                </OrcidContainer>
              </Fieldset>

              {createContributorRole && (
                <Fieldset>
                  <Legend>Contributions</Legend>

                  <Field name={'roles'}>
                    {(props: FieldProps) => (
                      <RolesContainer>
                        <ContributorRolesSelect
                          contributorRoles={contributorRoles}
                          createContributorRole={createContributorRole}
                          value={values.roles}
                          setFieldValue={async (value) => {
                            props.form.setFieldValue(
                              props.field.name,
                              value,
                              false
                            )
                            await props.form.submitForm()
                          }}
                        />
                      </RolesContainer>
                    )}
                  </Field>

                  <Field name={'contribution'}>
                    {(props: FieldProps) => (
                      <TextArea
                        {...props.field}
                        onBlur={async (
                          event: React.FocusEvent<HTMLTextAreaElement>
                        ) => {
                          props.form.setFieldValue(
                            props.field.name,
                            event.target.value,
                            false
                          )
                          await props.form.submitForm()
                        }}
                        placeholder={
                          'If needed, describe contributions in more detail…'
                        }
                      />
                    )}
                  </Field>
                </Fieldset>
              )}
            </Fields>
          </Form>
        )
      }}
    </Formik>
  )
}
