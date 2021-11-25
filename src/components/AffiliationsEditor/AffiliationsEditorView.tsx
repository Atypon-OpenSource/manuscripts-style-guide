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

import React, { useContext, useState } from 'react'
import { OnChangeValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { ThemeContext } from 'styled-components'

import { AffiliationGeneric, AffiliationOption } from '../../types'
import {
  AuthorFormComponentOverrides,
  defaultAuthorFormComponents,
} from '../AuthorForm/AuthorFormComponents'
import { AffiliationsEditorItem } from './AffiliationsEditorItem'
import { AddAffiliationIndicator, Container, Field, List } from './styles'

const reactSelectComponents = {
  IndicatorsContainer: AddAffiliationIndicator,
}

interface Props {
  options: AffiliationOption[]
  selected: AffiliationGeneric[]
  inputValue: string
  handleInputChange: (text: string) => void
  handleChoose: (value: OnChangeValue<AffiliationOption, false>) => void
  updateAffiliation: (affiliation: AffiliationGeneric) => void
  removeAuthorAffiliation: (affiliation: AffiliationGeneric) => void
  components?: AuthorFormComponentOverrides
  styleOverrides?: {
    menuZIndex?: number
  }
}

const AffiliationsEditorView: React.FC<Props> = ({
  options,
  selected,
  updateAffiliation,
  removeAuthorAffiliation,
  handleChoose,
  handleInputChange,
  inputValue,
  components,
  styleOverrides,
}) => {
  const { Legend } = {
    ...defaultAuthorFormComponents,
    ...components,
  }

  const [currentSection, setCurrentSection] = useState('')
  const requestOpen = (id: string) => {
    setCurrentSection(id === currentSection ? '' : id)
  }

  const theme = useContext(ThemeContext)

  return (
    <Container>
      <Legend>Affiliations</Legend>
      <Field>
        <List>
          {selected &&
            selected.map((affiliation) => {
              const { _id } = affiliation
              return (
                <AffiliationsEditorItem
                  key={_id}
                  affiliation={affiliation}
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
          options={options}
          onInputChange={(t) => handleInputChange(t)}
          inputValue={inputValue}
          onChange={handleChoose}
          value={null}
          placeholder="Begin typing to add affiliation"
          isValidNewOption={(currentText) => !!currentText}
          components={reactSelectComponents}
          noOptionsMessage={() => 'Type the name of an institution'}
          styles={{
            control: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused
                ? theme.colors.background.fifth
                : theme.colors.background.primary,
              borderColor: state.isFocused
                ? theme.colors.border.field.active
                : theme.colors.border.field.default,
              '&:hover': {
                backgroundColor: theme.colors.background.fifth,
              },
              borderRadius: theme.grid.radius.default,
              boxShadow: 'none',
              fontFamily: theme.font.family.sans,
            }),
            menu: (provided) => ({
              ...provided,
              zIndex:
                (styleOverrides && styleOverrides.menuZIndex) ||
                provided.zIndex,
            }),
          }}
        />
      </Field>
    </Container>
  )
}

export default AffiliationsEditorView
