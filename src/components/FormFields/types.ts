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
import { GroupBase, Props } from 'react-select'

export type FieldProps = {
  label?: string
  small?: boolean
  full?: boolean
  error?: string
  info?: string
  disabled?: boolean
  isLoading?: boolean
}

export type FormTextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'style'
> &
  FieldProps

export type FormSelectFieldProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = Omit<FieldProps, 'label'> &
  Props<Option, IsMulti, Group> & {
    label?: string
    shouldDisableForOneOption?: boolean
  }

export type FormTextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'style'
> &
  FieldProps

export type {
  GroupBase,
  SingleValue as FormSelectFieldSingleValue,
  MultiValue as FormSelectFieldMultiValue,
} from 'react-select'

export type FormRadioGroupProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'style' | 'name' | 'onChange'
> &
  FieldProps & {
    name: string
    options: { label: string; value: string }[]
    onChange?: (name: string, value: string) => void
  }
