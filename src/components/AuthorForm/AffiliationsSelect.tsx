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
  Affiliation,
  UserProfileAffiliation,
} from '@manuscripts/manuscripts-json-schema'
import { FieldProps } from 'formik'
import React from 'react'
import { Creatable as CreatableSelect } from 'react-select'
import { DefaultTheme, ThemeProps, withTheme } from 'styled-components'

interface OptionType {
  label: string
  value: string
  __isNew__?: boolean
}

type AffiliationType = UserProfileAffiliation | Affiliation

interface Props {
  affiliations: Map<string, AffiliationType>
  createAffiliation: (institution: string) => Promise<AffiliationType>
}

export const AffiliationsSelect: React.FunctionComponent<Props &
  FieldProps &
  ThemeProps<DefaultTheme>> = ({
  affiliations,
  createAffiliation,
  form,
  field,
  theme,
}) => {
  return (
    <CreatableSelect<OptionType>
      isMulti={true}
      noOptionsMessage={() => 'Type institution name to search for it.'}
      onChange={async (value, actionMeta) => {
        form.setFieldValue(
          field.name,
          await Promise.all(
            (value as OptionType[]).map(async option => {
              if (actionMeta.action === 'create-option' && option.__isNew__) {
                return createAffiliation(option.label)
              }

              return affiliations.get(option.value)
            })
          )
        )

        form.submitForm()
      }}
      options={Array.from(affiliations.values()).map(affiliation => ({
        value: affiliation._id,
        label: affiliation.institution || '',
      }))}
      value={(field.value || []).map((item: AffiliationType) => ({
        value: item._id,
        label: item.institution,
      }))}
      styles={{
        control: (provided, state) => ({
          ...provided,
          backgroundColor: theme.colors.background.primary,
          borderColor:
            state.isFocused || state.isSelected
              ? theme.colors.border.field.active
              : theme.colors.border.field.default,
          borderRadius: theme.grid.radius.default,
          boxShadow: 'none',
          fontFamily: theme.font.family.sans,
        }),
      }}
    />
  )
}

export default withTheme(AffiliationsSelect)
