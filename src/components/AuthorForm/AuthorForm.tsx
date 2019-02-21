import { Affiliation, Contributor } from '@manuscripts/manuscripts-json-schema'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { styled } from '../../styled-components'
import { AffiliationMap, AuthorAffiliation, AuthorValues } from '../../types'
import { AutoSaveInput } from '../AutoSaveInput'
import { TextFieldGroupContainer } from '../TextFieldGroupContainer'
import AffiliationsSelect from './AffiliationsSelect'
import defaultComponents from './defaultComponents'
import RemoveAuthorButton from './RemoveAuthorButton'

const Fields = styled.div`
  padding: 16px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const CheckboxField = styled.input.attrs({
  type: 'checkbox',
})<{ type?: string }>``

const Fieldset = styled.fieldset`
  border: none;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

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
  affiliations: AffiliationMap
  authorAffiliations: AuthorAffiliation[]
  isRemoveAuthorOpen: boolean
  createAffiliation: (name: string) => Promise<Affiliation>
  removeAuthor: (data: Contributor) => void
  handleSave: (values: AuthorValues) => Promise<void>
  handleRemoveAuthor: () => void
  components?: {
    Legend: React.FunctionComponent
    CheckboxLabel: React.FunctionComponent
    TextField: React.FunctionComponent
  }
}

export const AuthorForm: React.FunctionComponent<AuthorProps> = ({
  author,
  affiliations,
  authorAffiliations,
  handleSave,
  createAffiliation,
  removeAuthor,
  isRemoveAuthorOpen,
  handleRemoveAuthor,
  components,
}) => {
  const { TextField, LabelText, CheckboxLabel, Legend } = {
    ...defaultComponents,
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

              <CheckboxLabel>
                <Field name={'isCorresponding'}>
                  {(props: FieldProps) => (
                    <AutoSaveInput
                      {...props}
                      component={CheckboxField}
                      saveOn={'change'}
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
                        component={TextField}
                        saveOn={'blur'}
                        placeholder={'Email address'}
                      />
                    )}
                  </Field>
                </Label>
              )}

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

            <Fieldset>
              <Legend>Affiliations</Legend>

              <Label>
                <Field name={'affiliations'}>
                  {(props: FieldProps) => (
                    <AffiliationsSelect
                      affiliations={affiliations}
                      createAffiliation={createAffiliation}
                      {...props}
                    />
                  )}
                </Field>
              </Label>
            </Fieldset>
          </Fields>
        </Form>
      )}
    </Formik>
  )
}
