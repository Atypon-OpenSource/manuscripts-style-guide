/*!
 * © 2024 Atypon Systems LLC
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
import {
  Affiliation,
  buildAffiliation,
  Contributor,
} from '@manuscripts/json-schema'
import React, { useContext, useMemo } from 'react'
import CreatableSelect from 'react-select/creatable'
import styled, { DefaultTheme, ThemeContext } from 'styled-components'

import { affiliationLabel } from '../../lib/authors'
import { AffiliationButton } from './AffiliationButton'

const AddAffiliation = styled(AddAuthor)`
  width: 24px;
  height: 24px;
  margin-right: 4px;

  circle,
  use {
    fill: ${(props) => props.theme.colors.brand.default};
  }

  path {
    mask: none;
  }
`

export const AddAffiliationIndicator: React.FC = () => <AddAffiliation />

const getSelectStyles = (focus: boolean, theme: DefaultTheme) => ({
  backgroundColor: focus
    ? theme.colors.background.fifth
    : theme.colors.background.primary,
  borderColor: focus
    ? theme.colors.border.field.active
    : theme.colors.border.field.default,
  '&:hover': {
    backgroundColor: theme.colors.background.fifth,
  },
  borderRadius: theme.grid.radius.default,
  boxShadow: 'none',
  fontFamily: theme.font.family.sans,
})

export interface AuthorAffiliationsProps {
  author: Contributor
  affiliations: Affiliation[]
  onSave: (affiliation: Affiliation) => void
  onAdd: (affiliation: Affiliation) => void
  onRemove: (affiliation: Affiliation) => void
}

export const AuthorAffiliations: React.FC<AuthorAffiliationsProps> = ({
  author,
  affiliations,
  onSave,
  onAdd,
  onRemove,
}) => {
  const theme = useContext(ThemeContext)

  const affiliationMap = useMemo(
    () => new Map<string, Affiliation>(affiliations.map((a) => [a._id, a])),
    [affiliations]
  )

  const authorAffiliations = useMemo(() => {
    return author.affiliations?.map((i) =>
      affiliationMap.get(i)
    ) as Affiliation[]
  }, [affiliationMap, author])

  const otherAffiliations = useMemo(() => {
    const copy = new Map(affiliationMap)
    author.affiliations?.forEach((i) => copy.delete(i))
    return Array.from(copy.values())
  }, [affiliationMap, author])

  const options = otherAffiliations.map((a) => ({
    value: a._id,
    label: affiliationLabel(a),
  }))

  const handleChange = (id: string) => {
    const affiliation = affiliationMap.get(id)
    if (!affiliation) {
      return
    }
    onAdd(affiliation)
  }

  const handleCreate = (institution: string) => {
    const affiliation = buildAffiliation(institution) as Affiliation
    onSave(affiliation)
    onAdd(affiliation)
  }

  return (
    <>
      {authorAffiliations.map((a) => (
        <AffiliationButton
          key={`${author._id}-${a._id}`}
          affiliation={a}
          onSave={onSave}
          onRemove={() => onRemove(a)}
        />
      ))}
      <CreatableSelect
        options={options}
        isMulti={false}
        isClearable={true}
        components={{
          IndicatorsContainer: AddAffiliationIndicator,
        }}
        placeholder="Begin typing to add affiliation"
        noOptionsMessage={() => 'Type the name of an institution'}
        onChange={(i) => i && handleChange(i.value)}
        onCreateOption={(v) => v && handleCreate(v)}
        styles={{
          control: (provided, state) => ({
            ...provided,
            ...getSelectStyles(state.isFocused, theme),
          }),
        }}
      />
    </>
  )
}
