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

import { Affiliation, Contributor } from '@manuscripts/manuscripts-json-schema'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { AffiliationMap, AuthorAffiliation, AuthorValues } from '../../types'
import { AutoSaveInput } from '../AutoSaveInput'
import { TextFieldGroupContainer } from '../TextFieldGroupContainer'
import {
  AuthorFormComponentOverrides,
  CheckboxField,
  Container,
  defaultAuthorFormComponents,
  Fields,
  Fieldset,
  LabelText,
  PlaintextButton,
} from './AuthorFormComponents'
import RemoveAuthorButton from './RemoveAuthorButton'

const ensureString = (value: string | undefined) => value || ''

const buildInitialValues = (
  author: Contributor,
  authorAffiliations: AuthorAffiliation[]
  // authorGrants: AuthorGrant[]
): AuthorValues => {
  return {
    _id: author._id,
    priority: Number(author.priority), // TODO: ordering = priority
    email: ensureString(author.email),
    isCorresponding: Boolean(author.isCorresponding),
    isJointContributor: Boolean(author.isJointContributor),
    affiliations: (authorAffiliations || []).map(item => item.data),
    // grants: authorGrants,
    bibliographicName: {
      _id: author.bibliographicName._id,
      objectType: author.bibliographicName.objectType,
      given: ensureString(author.bibliographicName.given),
      family: ensureString(author.bibliographicName.family),
      suffix: ensureString(author.bibliographicName.suffix),
    },
  }
}

interface AuthorProps {
  author: Contributor
  affiliations?: AffiliationMap
  authorAffiliations: AuthorAffiliation[]
  isRemoveAuthorOpen: boolean
  removeAuthor: (data: Contributor) => void
  handleSave: (values: AuthorValues) => Promise<void>
  handleRemoveAuthor: () => void
  handleSetAsCorrespondingAuthor: () => void
  components?: AuthorFormComponentOverrides
  createAffiliation?: (name: string) => Promise<Affiliation>
}

export const AuthorForm: React.FunctionComponent<AuthorProps> = ({
  author,
  authorAffiliations,
  handleSave,
  removeAuthor,
  isRemoveAuthorOpen,
  handleRemoveAuthor,
  handleSetAsCorrespondingAuthor,
  components,
}) => {
  const { Legend, CheckboxLabel, TextField } = {
    ...defaultAuthorFormComponents,
    ...components,
  }

  return (
    <Formik
      initialValues={buildInitialValues(author, authorAffiliations)}
      onSubmit={handleSave}
      enableReinitialize={true}
    >
      {({ values }: FormikProps<AuthorValues>) => (
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
                    />
                  )}
                </Field>
              </TextFieldGroupContainer>

              <TextFieldGroupContainer>
                <PlaintextButton
                  type="button"
                  onClick={handleSetAsCorrespondingAuthor}
                  disabled={values.isCorresponding}
                >
                  {values.isCorresponding || 'Set'} Corresponding Author
                </PlaintextButton>
                <Field name={'email'} type={'email'}>
                  {(props: FieldProps) => (
                    <AutoSaveInput
                      {...props}
                      component={TextField}
                      saveOn={'blur'}
                      placeholder={'Email address'}
                    />
                  )}
                </Field>
              </TextFieldGroupContainer>

              <CheckboxLabel>
                <Field name={'isJointContributor'}>
                  {(props: FieldProps) => (
                    <AutoSaveInput
                      {...props}
                      component={CheckboxField}
                      saveOn={'change'}
                    />
                  )}
                </Field>
                <LabelText>Joint Authorship with Next Author</LabelText>
              </CheckboxLabel>
            </Fieldset>
          </Fields>
        </Form>
      )}
    </Formik>
  )
}
