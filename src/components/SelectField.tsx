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
  error?: boolean
  variant?: 'small' | 'large'
  isDisabled?: boolean
}

const selectStyles = (
  theme: DefaultTheme,
  error?: boolean,
  variant?: 'small' | 'large'
): StylesConfig<OptionType, false> => ({
  control: (base, state) => ({
    ...base,
    minHeight: variant === 'large' ? 40 : 32,
    borderRadius: 3,
    fontFamily: theme.font.family.sans,
    fontSize: theme.font.size.medium,
    borderColor: error
      ? theme.colors.border.error
      : state.isFocused
        ? theme.colors.brand.default
        : theme.colors.border.field.default,
    boxShadow: state.isFocused
      ? `0 0 0 2px ${error ? theme.colors.border.error : theme.colors.brand.default}1a`
      : 'none',
    '&:hover': {
      borderColor: error
        ? theme.colors.border.error
        : state.isFocused
          ? theme.colors.brand.default
          : theme.colors.text.secondary,
      backgroundColor: !state.isDisabled ? '#F2FBFC' : 'transparent',
    },
    backgroundColor: state.isDisabled
      ? '#F5F5F5'
      : state.isFocused
        ? '#F2FBFC'
        : theme.colors.background.primary,
    transition: 'border-color 120ms ease, box-shadow 120ms ease',
    cursor: state.isDisabled ? 'not-allowed' : 'pointer',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0 8px',
  }),
  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? '#B3B3B3' : theme.colors.text.primary,
    fontFamily: theme.font.family.sans,
    fontSize: theme.font.size.medium,
  }),
  option: (base, state) => ({
    ...base,
    fontFamily: theme.font.family.sans,
    fontSize: theme.font.size.medium,
    backgroundColor: state.isSelected
      ? theme.colors.brand.default
      : state.isFocused
        ? '#F2FBFC'
        : theme.colors.background.primary,
    color: state.isSelected ? '#FFF' : theme.colors.text.primary,
    '&:active': {
      backgroundColor: theme.colors.brand.default,
      color: '#FFF',
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 3,
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  }),
  placeholder: (base) => ({
    ...base,
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
    fontFamily: theme.font.family.sans,
    fontSize: theme.font.size.medium,
    fontWeight: theme.font.weight.normal,
    lineHeight: theme.font.lineHeight.large,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isDisabled ? '#B3B3B3' : theme.colors.text.secondary,
    '&:hover': {
      color: state.isDisabled ? '#B3B3B3' : theme.colors.text.primary,
    },
  }),
})

export const SelectField: React.FC<Props & Partial<FieldProps>> = ({
  id,
  options,
  field,
  form,
  error,
  variant,
  isDisabled,
  ...rest
}) => {
  const theme = useTheme() as DefaultTheme
  const name = field?.name || ''
  const value = field?.value

  return (
    <Select<OptionType>
      inputId={id}
      options={options}
      name={name}
      classNamePrefix={name}
      value={options?.find((option) => option.value === value)}
      onChange={(option: OptionType | null) =>
        form?.setFieldValue(name, option?.value)
      }
      onBlur={field?.onBlur}
      styles={selectStyles(theme, error, variant)}
      isDisabled={form?.isSubmitting || isDisabled}
      {...rest}
      theme={(base) => ({
        ...base,
        colors: {
          ...base.colors,
          primary: theme.colors.brand.default || base.colors.primary,
        },
      })}
    />
  )
}
