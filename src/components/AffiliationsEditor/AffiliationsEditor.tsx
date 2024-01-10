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

import React, { useCallback, useState } from 'react'

import { affiliationsOptions } from '../../lib/authors'
import { AffiliationGeneric, AuthorAffiliation } from '../../types'
import { AuthorFormComponentOverrides } from '../AuthorForm/AuthorFormComponents'
import AffiliationsEditorView from './AffiliationsEditorView'

interface SelectedAffiliation {
  value: string
  label: string
  __isNew__?: boolean
}

interface Props {
  affiliations: Map<string, AffiliationGeneric>
  authorAffiliations?: AuthorAffiliation[]
  addAuthorAffiliation: (affiliation: AffiliationGeneric | string) => void
  removeAuthorAffiliation: (affiliation: AffiliationGeneric) => void
  updateAffiliation: (affiliation: AffiliationGeneric) => void
  components?: AuthorFormComponentOverrides
  styleOverrides?: {
    menuZIndex?: number
  }
}

const AffiliationsEditor: React.FC<Props> = ({
  affiliations,
  authorAffiliations,
  addAuthorAffiliation,
  updateAffiliation,
  removeAuthorAffiliation,
  components,
  styleOverrides,
}) => {
  const [searchText, setSearchText] = useState('')
  const handleChoose = useCallback(
    (value) => {
      if (value) {
        const selectedAffiliation = value as SelectedAffiliation
        addAuthorAffiliation(selectedAffiliation.value)
      }

      setSearchText('')
    },
    [addAuthorAffiliation]
  )

  const options = affiliationsOptions(affiliations, authorAffiliations)
  const active = authorAffiliations
    ? authorAffiliations.map((item) => item.data)
    : []

  return (
    <AffiliationsEditorView
      options={options}
      selected={active}
      updateAffiliation={updateAffiliation}
      removeAuthorAffiliation={removeAuthorAffiliation}
      components={components}
      styleOverrides={styleOverrides}
      handleChoose={handleChoose}
      handleInputChange={setSearchText}
      inputValue={searchText}
    />
  )
}

export default AffiliationsEditor
