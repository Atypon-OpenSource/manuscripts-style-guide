import { Affiliation, Contributor } from '@manuscripts/manuscripts-json-schema'
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik'
import React from 'react'
import { styled } from '../../styled-components'
import { AffiliationMap, AuthorAffiliation, AuthorValues } from '../../types'
import { AutoSaveInput } from '../AutoSaveInput'
import { TextField } from '../TextField'
import { TextFieldGroupContainer } from '../TextFieldGroupContainer'
import AffiliationsSelect from './AffiliationsSelect'
import RemoveAuthorButton from './RemoveAuthorButton'

const Fields = styled.div`
  padding: 16px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const LabelText = styled.div`
  font-size: 14px;
  letter-spacing: -0.2px;
  color: ${props => props.theme.colors.global.text.primary};
`

const CheckboxField = styled.input.attrs({
  type: 'checkbox',
})<{ type?: string }>``

const CheckboxLabel = styled.label`
  color: #444;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 24px;

  & ${LabelText} {
    margin-left: 4px;
  }

  &:not(:last-child) {
    margin-right: 16px;
  }
`

const Fieldset = styled.fieldset`
  border: none;
`

const Legend = styled.legend`
  font-size: 20px;
  letter-spacing: -0.4px;
  color: ${props => props.theme.colors.global.text.secondary};
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
  renderLegend: React.FunctionComponent
  renderCheckboxLabel: React.FunctionComponent
  renderTextField: React.FunctionComponent
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
  renderLegend,
  renderCheckboxLabel,
  renderTextField,
}) => {
  const LegendComponent = renderLegend
  const CheckboxLabelComponent = renderCheckboxLabel
  const TextFieldComponent = renderTextField

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
                <LegendComponent>Details</LegendComponent>

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
                      component={TextFieldComponent}
                      saveOn={'blur'}
                      placeholder={'Given name'}
                    />
                  )}
                </Field>

                <Field name={'bibliographicName.family'}>
                  {(props: FieldProps) => (
                    <AutoSaveInput
                      {...props}
                      component={TextFieldComponent}
                      saveOn={'blur'}
                      placeholder={'Family name'}
                    />
                  )}
                </Field>
              </TextFieldGroupContainer>

              <CheckboxLabelComponent>
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
              </CheckboxLabelComponent>

              {values.isCorresponding && (
                <Label>
                  <Field name={'email'} type={'email'}>
                    {(props: FieldProps) => (
                      <AutoSaveInput
                        {...props}
                        component={TextFieldComponent}
                        saveOn={'blur'}
                        placeholder={'Email address'}
                      />
                    )}
                  </Field>
                </Label>
              )}

              <CheckboxLabelComponent>
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
              </CheckboxLabelComponent>
            </Fieldset>

            <Fieldset>
              <LegendComponent>Affiliations</LegendComponent>

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

AuthorForm.defaultProps = {
  renderLegend: Legend,
  renderCheckboxLabel: CheckboxLabel,
  renderTextField: TextField,
}
