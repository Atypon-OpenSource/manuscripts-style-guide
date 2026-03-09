/*!
 * © 2026 Atypon Systems LLC
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
import React, { useMemo } from 'react'
import Select from 'react-select'
import { DefaultTheme, useTheme } from 'styled-components'

import { FormFieldContainer } from '../FormFieldContainer'
import { selectStyles } from '../SelectField'

import type { FormSelectFieldProps, GroupBase } from './types'

export const FormSelectField = <
  Option,
  Multi extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  label,
  error,
  full,
  info,
  isDisabled,
  isLoading,
  options,
  id: idProp,
  shouldDisableForOneOption = true,
  ...props
}: FormSelectFieldProps<Option, Multi, Group>) => {
  const theme = useTheme() as DefaultTheme
  const id = useMemo(() => idProp ?? `select-${crypto.randomUUID()}`, [idProp])

  const optionsWithoutPlaceholder = useMemo(() => {
    return options?.filter((item) => {
      return (
        typeof item === 'object' &&
        ((item as { label: string; value: string })?.value ?? '').trim() !== ''
      )
    })
  }, [options])

  const hasOneOption =
    optionsWithoutPlaceholder?.length === 1 && shouldDisableForOneOption

  const _isDisabled =
    isDisabled || props.disabled || !optionsWithoutPlaceholder?.length

  const _info = isLoading
    ? undefined
    : optionsWithoutPlaceholder?.length
      ? info
      : 'No options available'

  return (
    <FormFieldContainer label={label} error={error} info={_info} id={id}>
      <Select<Option, Multi, Group>
        inputId={id}
        options={options as Option[]}
        isDisabled={_isDisabled}
        isLoading={isLoading}
        styles={selectStyles(theme, !!error) as any}
        isSearchable={hasOneOption ? false : props.isSearchable}
        theme={(base) => ({
          ...base,
          colors: {
            ...base.colors,
            primary: theme.colors.brand.default || base.colors.primary,
          },
        })}
        {...(props as any)}
      />
    </FormFieldContainer>
  )
}
