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

import Trashcan from '@manuscripts/assets/react/AnnotationRemove'
import ArrowDownBlue from '@manuscripts/assets/react/ArrowDownBlue'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { useCallback } from 'react'

import { affiliationLabel } from '../../lib/authors'
import { styled } from '../../styled-components'
import { AffiliationGeneric } from '../../types'
import { AutoSaveInput } from '../AutoSaveInput'
import { TextField } from '../TextField'

const Section = styled.section`
  border: 1px solid ${props => props.theme.colors.border.field.default};
  border-radius: ${props => props.theme.grid.radius.default};
  background: ${props => props.theme.colors.background.primary};
  margin-bottom: 2px;
  overflow: hidden;
`

const Title = styled.h4<{
  isInvalid?: boolean
}>`
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding-right: 0.5rem;
  background: ${props =>
    props.isInvalid ? props.theme.colors.background.warning : 'transparent'};
  color: ${props =>
    props.isInvalid ? props.theme.colors.text.warning : 'inherit'};
`

const DropdownIndicator = styled(ArrowDownBlue)`
  border: 0;
  border-radius: 50%;
  margin-right: 0.6em;
  min-width: 20px;
`

const ToggleButton = styled.button<{
  isOpen: boolean
}>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;
  font-family: ${props => props.theme.font.family.sans};
  font-size: 1rem;
  padding: 0.6em 0.5em;

  outline: none;

  &:focus {
    color: ${props => props.theme.colors.button.primary.border.hover};
  }

  svg {
    transform: ${props => (props.isOpen ? 'rotateX(180deg)' : 'initial')};
  }
`

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;

  outline: none;

  &:focus path {
    fill: ${props => props.theme.colors.button.primary.color.hover};
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`

const AffiliationsForm = styled(Form)`
  border: 1px solid ${props => props.theme.colors.border.field.default};
  border-radius: ${props => props.theme.grid.radius.default};
  margin: 0.4rem 0.71rem 0.71rem;
  overflow: hidden;
`

const AffiliationsTextField = styled(TextField)`
  border-radius: 0;
  border-bottom: none;
  border-right: none;
  border-left: none;
  background: transparent;
  &:first-child {
    border-top: none;
  }

  &[aria-invalid] {
    background: ${props => props.theme.colors.background.warning};
  }

  &[aria-invalid]:focus {
    background: transparent;
  }
`

const Columns = styled.div`
  display: flex;
`

const Column = styled.div`
  flex: 1 1 auto;
  max-width: 50%;
  border-top: 1px solid ${props => props.theme.colors.border.field.default};
  border-left: 1px solid ${props => props.theme.colors.border.field.default};
  &:first-child {
    border-left: none;
  }
`

interface Props {
  affiliation: AffiliationGeneric
  requestToggle: () => void
  isOpen: boolean
  updateAffiliation: (affiliation: AffiliationGeneric) => void
  removeAuthorAffiliation: (affiliation: AffiliationGeneric) => void
}

export const AffiliationsEditorItem: React.FC<Props> = ({
  affiliation,
  requestToggle,
  isOpen,
  updateAffiliation,
  removeAuthorAffiliation,
}) => {
  const remove = useCallback(() => {
    removeAuthorAffiliation(affiliation)
  }, [affiliation, removeAuthorAffiliation])

  const vivifiedAffiliation = {
    institution: '',
    department: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    county: '',
    country: '',
    postCode: '',
    ...affiliation,
  }

  const isInvalid = !vivifiedAffiliation.institution

  return (
    <Section>
      <Title isInvalid={isInvalid}>
        <ToggleButton type="button" onClick={requestToggle} isOpen={isOpen}>
          <DropdownIndicator>
            <ArrowDownBlue />
          </DropdownIndicator>
          {affiliationLabel(affiliation)}
        </ToggleButton>
        <RemoveButton
          type="button"
          aria-label="Delete this affiliation"
          onClick={remove}
        >
          <Trashcan />
        </RemoveButton>
      </Title>
      {isOpen && (
        <Formik
          initialValues={vivifiedAffiliation}
          onSubmit={updateAffiliation}
        >
          {() => (
            <AffiliationsForm>
              <Field name="institution">
                {(props: FieldProps) => (
                  <AutoSaveInput
                    {...props}
                    component={AffiliationsTextField}
                    saveOn="blur"
                    placeholder="Institution Name"
                    isInvalid={isInvalid}
                  />
                )}
              </Field>
              <Field name="department">
                {(props: FieldProps) => (
                  <AutoSaveInput
                    {...props}
                    component={AffiliationsTextField}
                    saveOn="blur"
                    placeholder="Department"
                  />
                )}
              </Field>
              <Field name="addressLine1">
                {(props: FieldProps) => (
                  <AutoSaveInput
                    {...props}
                    component={AffiliationsTextField}
                    saveOn="blur"
                    placeholder="Street Address"
                  />
                )}
              </Field>
              <Columns>
                <Column>
                  <Field name="city">
                    {(props: FieldProps) => (
                      <AutoSaveInput
                        {...props}
                        component={AffiliationsTextField}
                        saveOn="blur"
                        placeholder="City"
                      />
                    )}
                  </Field>
                  <Field name="county">
                    {(props: FieldProps) => (
                      <AutoSaveInput
                        {...props}
                        component={AffiliationsTextField}
                        saveOn="blur"
                        placeholder="State / Province"
                      />
                    )}
                  </Field>
                </Column>
                <Column>
                  <Field name="postCode">
                    {(props: FieldProps) => (
                      <AutoSaveInput
                        {...props}
                        component={AffiliationsTextField}
                        saveOn="blur"
                        placeholder="Postal Code"
                      />
                    )}
                  </Field>
                  <Field name="country">
                    {(props: FieldProps) => (
                      <AutoSaveInput
                        {...props}
                        component={AffiliationsTextField}
                        saveOn="blur"
                        placeholder="Country"
                      />
                    )}
                  </Field>
                </Column>
              </Columns>
            </AffiliationsForm>
          )}
        </Formik>
      )}
    </Section>
  )
}

export default AffiliationsEditorItem
