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

import {
  ObjectTypes,
  UserProfileAffiliation,
} from '@manuscripts/manuscripts-json-schema'
import React, { useCallback, useState } from 'react'
import { ValueType } from 'react-select'
import { AffiliationGeneric, AffiliationOption } from '../../types'
import { AuthorFormComponentOverrides } from '../AuthorForm/AuthorFormComponents'
import AffiliationsEditorView from './AffiliationsEditorView'

interface SelectedAffiliation {
  value: string
  label: string
  __isNew__?: boolean
}

interface Props {
  affiliations: Map<string, UserProfileAffiliation>
  addAffiliation: (affiliation: string) => void
  removeAffiliation: (affiliation: UserProfileAffiliation) => void
  updateAffiliation: (affiliation: UserProfileAffiliation) => void
  components?: AuthorFormComponentOverrides
  styleOverrides?: {
    menuZIndex?: number
  }
}

const AffiliationsEditorProfile: React.FC<Props> = ({
  affiliations,
  addAffiliation,
  updateAffiliation,
  removeAffiliation,
  components,
  styleOverrides,
}) => {
  const [searchText, setSearchText] = useState('')
  const handleChoose = useCallback(
    (value: ValueType<AffiliationOption>) => {
      if (value) {
        const selectedAffiliation = value as SelectedAffiliation
        addAffiliation(selectedAffiliation.value)
      }

      setSearchText('')
    },
    [addAffiliation]
  )

  const affiliationsArr = Array.from(
    affiliations.values()
  ) as AffiliationGeneric[]

  const updateUserProfileAffiliation = useCallback(
    (data: AffiliationGeneric) => {
      updateAffiliation({
        ...data,
        objectType: ObjectTypes.UserProfileAffiliation,
      })
    },
    [updateAffiliation]
  )

  return (
    <AffiliationsEditorView
      options={[]}
      selected={affiliationsArr}
      updateAffiliation={updateUserProfileAffiliation}
      removeAuthorAffiliation={
        removeAffiliation as (affiliation: AffiliationGeneric) => void
      }
      components={components}
      styleOverrides={styleOverrides}
      handleChoose={handleChoose}
      handleInputChange={setSearchText}
      inputValue={searchText}
    />
  )
}

export default AffiliationsEditorProfile
