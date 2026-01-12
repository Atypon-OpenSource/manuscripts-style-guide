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

import { FieldProps } from 'formik'
import React from 'react'
import Select, { StylesConfig } from 'react-select'
import { DefaultTheme, useTheme } from 'styled-components'

export type OptionType = {
  label: string
  value: string
}

interface Props {
  id?: string
  options: OptionType[]
}

const selectStyles = (
  theme: DefaultTheme
): StylesConfig<OptionType, false> => ({
  control: (base, state) => ({
    ...base,
    minHeight: 40,
    borderRadius: theme.grid.radius.small,
    borderColor: state.isFocused
      ? theme.colors.brand.medium
      : theme.colors.border.field.default,
    boxShadow: state.isFocused
      ? `0 0 0 2px ${theme.colors.button.primary.border.hover}1a`
      : 'none',
    '&:hover': {
      borderColor: theme.colors.border.field.hover,
    },
    backgroundColor: state.isDisabled
      ? theme.colors.background.fifth
      : theme.colors.background.primary,
    transition: 'border-color 120ms ease, box-shadow 120ms ease',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? theme.colors.brand.medium
      : state.isFocused
        ? theme.colors.background.fifth
        : theme.colors.background.primary,
    color: state.isSelected
      ? theme.colors.background.primary
      : theme.colors.text.primary,
  }),
  menu: (base) => ({
    ...base,
    borderRadius: theme.grid.radius.small,
    overflow: 'hidden',
  }),
  placeholder: (base) => ({
    ...base,
    color: theme.colors.text.muted,
  }),
})

export const SelectField: React.FC<Props & FieldProps> = ({
  id,
  options,
  field,
  form,
}) => {
  const theme = useTheme() as DefaultTheme
  return (
    <Select<OptionType>
      inputId={id}
      options={options}
      name={field.name}
      classNamePrefix={field.name}
      value={options?.find((option) => option.value === field.value)}
      onChange={(option: OptionType | null) =>
        form.setFieldValue(field.name, option?.value)
      }
      onBlur={field.onBlur}
      styles={selectStyles(theme)}
      theme={(base) => ({
        ...base,
        colors: {
          ...base.colors,
          primary: theme.colors.brand.medium || base.colors.primary,
        },
      })}
    />
  )
}
