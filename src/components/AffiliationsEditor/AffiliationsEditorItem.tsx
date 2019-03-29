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
import { Affiliation } from '@manuscripts/manuscripts-json-schema'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { useCallback } from 'react'

import { affiliationLabel } from '../../lib/authors'
import { styled } from '../../styled-components'
import { AutoSaveInput } from '../AutoSaveInput'
import { TextField } from '../TextField'

const Section = styled.section`
  border: 1px solid ${props => props.theme.colors.textField.border.default};
  border-radius: ${props => props.theme.radius}px;
  background: white;
  margin-bottom: 2px;
`

const Title = styled.h4`
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding-right: 0.5rem;
`

const DropdownIndicator = styled(ArrowDownBlue)`
  padding-right: 0.6em;
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
  font-size: 1rem;
  padding: 0.6em 0.5em;

  svg {
    transform: ${props => (props.isOpen ? 'rotateX(180deg)' : 'initial')};
  }
`

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;

  svg {
    width: 2rem;
    height: 2rem;
  }
`

const AffiliationsForm = styled(Form)`
  border: 1px solid ${props => props.theme.colors.textField.border.default};
  border-radius: ${props => props.theme.radius}px;
  margin: 0.4rem 0.71rem 0.71rem;
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
`

const Columns = styled.div`
  display: flex;
`

const Column = styled.div`
  flex: 1 1 auto;
  max-width: 50%;
  border-top: 1px solid ${props => props.theme.colors.textField.border.default};
  border-left: 1px solid ${props => props.theme.colors.textField.border.default};
  &:first-child {
    border-left: none;
  }
`

interface Props {
  affiliation: Affiliation
  requestToggle: () => void
  isOpen: boolean
  updateAffiliation: (affiliation: Affiliation) => void
  removeAuthorAffiliation: (affiliation: Affiliation) => void
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
  }, [affiliation])

  return (
    <Section>
      <Title>
        <ToggleButton type="button" onClick={requestToggle} isOpen={isOpen}>
          <DropdownIndicator />
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
        <Formik initialValues={affiliation} onSubmit={updateAffiliation}>
          {() => (
            <AffiliationsForm>
              <Field name="institution">
                {(props: FieldProps) => (
                  <AutoSaveInput
                    {...props}
                    component={AffiliationsTextField}
                    saveOn="blur"
                    placeholder="Institution Name"
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
