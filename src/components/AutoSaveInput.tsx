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

import { FieldProps } from 'formik'
import { debounce } from 'lodash-es'
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { submitEvent } from './Form'

interface AutoSaveInputProps {
  component: React.ComponentType<
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>
  >
  saveOn: 'change' | 'blur'
  // inputProps?: Exclude<InputHTMLAttributes<HTMLInputElement>, FieldProps>
  placeholder?: string
  testId?: string
  isInvalid?: boolean | null
  disabled?: boolean
}

interface State {
  focused: boolean
}

export class AutoSaveInput extends React.Component<
  FieldProps & AutoSaveInputProps,
  State
> {
  public state = {
    focused: false,
  }
  // NOTE: this needs to happen in a timeout so the values are updated first
  private handleSubmit = debounce(() => {
    this.props.form.handleSubmit(
      submitEvent as React.FormEvent<HTMLFormElement>
    )
  }, 1)

  public componentWillUnmount() {
    if (this.state.focused) {
      this.handleSubmit()
    }
  }

  public render() {
    const {
      component: Component,
      field,
      placeholder,
      disabled,
      testId,
    } = this.props

    return (
      <Component
        {...field}
        placeholder={placeholder}
        disabled={disabled}
        checked={!!field.value}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        data-testid={testId && `${testId}__input`}
        aria-invalid={this.props.isInvalid || undefined}
      />
    )
  }

  private handleFocus = () => {
    this.setState({ focused: true })
  }

  private handleBlur = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ focused: false })

    this.props.field.onBlur(event)

    if (this.props.saveOn === 'blur') {
      this.handleSubmit()
    }
  }

  private handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.field.onChange(event)

    if (this.props.saveOn === 'change') {
      this.handleSubmit()
    }
  }
}
