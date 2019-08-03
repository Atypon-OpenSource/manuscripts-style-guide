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

import AddAuthor from '@manuscripts/assets/react/AddAuthor'
import { Affiliation } from '@manuscripts/manuscripts-json-schema'
import React, { useState } from 'react'
import { Creatable as CreatableSelect } from 'react-select'
import { IndicatorContainerProps } from 'react-select/lib/components/containers'
import { ValueType } from 'react-select/lib/types'
import { affiliationsOptions } from '../../lib/authors'
import { styled, ThemeProps, withTheme } from '../../styled-components'
import { AffiliationOption, AuthorAffiliation } from '../../types'
import {
  AuthorFormComponentOverrides,
  defaultAuthorFormComponents,
} from '../AuthorForm/AuthorFormComponents'
import AffiliationsEditorItem from './AffiliationsEditorItem'

const Container = styled.div`
  margin: 0 1.89rem 1rem;
`

const Field = styled.div`
  margin: 1rem 0;
`

const List = styled.div`
  margin-bottom: 0.5rem;
`

const AddAffiliationContainer = styled.div`
  padding-right: 0.71rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  circle,
  use {
    fill: ${props => props.theme.colors.button.primary};
  }

  path {
    mask: none;
  }
`

const AddAffiliationIndicator: React.FC<
  IndicatorContainerProps<AffiliationOption>
> = () => (
  <AddAffiliationContainer>
    <AddAuthor />
  </AddAffiliationContainer>
)

const reactSelectComponents = { IndicatorsContainer: AddAffiliationIndicator }

interface SelectedAffiliation {
  value: string
  label: string
  __isNew__?: boolean
}

interface Props {
  affiliations: Map<string, Affiliation>
  authorAffiliations?: AuthorAffiliation[]
  addAuthorAffiliation: (affiliation: Affiliation | string) => void
  removeAuthorAffiliation: (affiliation: Affiliation) => void
  updateAffiliation: (affiliation: Affiliation) => void
  components?: AuthorFormComponentOverrides
}

export const AffiliationsEditor: React.FC<Props & ThemeProps> = ({
  affiliations,
  authorAffiliations,
  addAuthorAffiliation,
  updateAffiliation,
  removeAuthorAffiliation,
  theme,
  components,
}) => {
  const { Legend } = {
    ...defaultAuthorFormComponents,
    ...components,
  }

  const [searchText, setSearchText] = useState('')
  const onSelect = (value: ValueType<AffiliationOption>) => {
    if (value) {
      const selectedAffiliation = value as SelectedAffiliation

      addAuthorAffiliation(
        selectedAffiliation.__isNew__
          ? selectedAffiliation.value
          : affiliations.get(selectedAffiliation.value) || ''
      )
    }

    setSearchText('')
  }

  const [currentSection, setCurrentSection] = useState('')
  const requestOpen = (id: string) => {
    setCurrentSection(id === currentSection ? '' : id)
  }

  return (
    <Container>
      <Legend>Affiliations</Legend>
      <Field>
        <List>
          {authorAffiliations &&
            authorAffiliations.map(affiliation => {
              const { _id } = affiliation.data
              return (
                <AffiliationsEditorItem
                  key={_id}
                  affiliation={affiliation.data}
                  isOpen={currentSection === _id}
                  requestToggle={() => requestOpen(_id)}
                  updateAffiliation={updateAffiliation}
                  removeAuthorAffiliation={removeAuthorAffiliation}
                />
              )
            })}
        </List>
        <CreatableSelect<AffiliationOption>
          isMulti={false}
          isClearable={false}
          options={affiliationsOptions(affiliations, authorAffiliations)}
          onInputChange={t => setSearchText(t)}
          inputValue={searchText}
          onChange={onSelect}
          value={null}
          placeholder={'Add Affiliation'}
          isValidNewOption={currentText => !!currentText}
          components={reactSelectComponents}
          styles={{
            control: (provided, state) => ({
              ...provided,
              borderRadius: theme.radius,
              borderColor:
                state.isFocused || state.isSelected
                  ? theme.colors.textField.border.focused
                  : theme.colors.textField.border.default,
              boxShadow: 'none',
            }),
          }}
        />
      </Field>
    </Container>
  )
}

export default withTheme(AffiliationsEditor)
