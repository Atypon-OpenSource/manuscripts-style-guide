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
import React from 'react'
import Select, { StylesConfig, GroupBase, Props } from 'react-select'
import { DefaultTheme, useTheme } from 'styled-components'
import { useField } from 'formik'

import { FormFieldContainer } from '../FormFieldContainer'
import { selectStyles } from '../SelectField'

export type OptionShape = {
  label: string
  value: string
}

export interface FormSelectFieldProps<
  Option extends OptionShape,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends Omit<Props<Option, IsMulti, Group>, 'value' | 'onChange' | 'onBlur'> {
  name: string
  label: string
  options?: Option[]
  isLoading?: boolean
  info?: string
  isMulti?: IsMulti
  disabled?: boolean
  components?: Props<Option, IsMulti, Group>['components']
  noOptionsMessage?: Props<Option, IsMulti, Group>['noOptionsMessage']
}

export { GroupBase }

export const FormSelectField = <
  Option extends OptionShape,
  Multi extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  name,
  label,
  options,
  isLoading,
  info,
  isMulti,
  disabled,
  components,
  noOptionsMessage,
  placeholder,
  ...props
}: FormSelectFieldProps<Option, Multi, Group>): React.ReactElement => {
  const theme = useTheme() as DefaultTheme
  const [field, meta, helpers] = useField(name)
  const error = meta.touched && meta.error ? meta.error : undefined

  const optionCount = options?.filter(item => item.value?.trim() !== '').length || 0

  const isDisabledState = disabled || optionCount === 0
  const displayInfo = isLoading ? undefined : optionCount ? info : 'No options available'

  return (
    <FormFieldContainer label={label} error={error} info={displayInfo} id={name}>
      <Select<Option, Multi, Group>
        inputId={name}
        options={options}
        isDisabled={isDisabledState}
        isLoading={isLoading}
        placeholder={placeholder || `Select ${label}`}
        styles={selectStyles(theme, !!error) as unknown as StylesConfig<Option, Multi, Group>}
        isMulti={isMulti}
        components={components}
        noOptionsMessage={noOptionsMessage}
        theme={(base) => ({
          ...base,
          colors: {
            ...base.colors,
            primary: theme.colors.brand.default || base.colors.primary,
          },
        })}
        value={field.value}
        onChange={(newValue) => {
          helpers.setValue(newValue)
        }}
        onBlur={() => {
          helpers.setTouched(true)
        }}
        {...(props as any)}
      />
    </FormFieldContainer>
  )
}
