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
import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react'

interface AutoSaveInputProps {
  component: React.ComponentType<
    | InputHTMLAttributes<HTMLInputElement>
    | TextareaHTMLAttributes<HTMLTextAreaElement>
    | { 'data-testid'?: string }
  >
  saveOn: 'change' | 'blur'
  placeholder?: string
  testId?: string
  isInvalid?: boolean | null
  disabled?: boolean
}

export const AutoSaveInput: React.FC<FieldProps & AutoSaveInputProps> = ({
  component: Component,
  field,
  form,
  placeholder,
  disabled,
  testId,
  isInvalid,
  saveOn,
}) => {
  const [focused, setFocused] = useState(false)

  const handleSubmit = useCallback(() => {
    window.setTimeout(form.submitForm, 10)
  }, [form])

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleBlur = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      setFocused(false)
      field.onBlur(event)

      if (saveOn === 'blur') {
        handleSubmit()
      }
    },
    [field, saveOn, handleSubmit]
  )

  const handleChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      field.onChange(event)

      if (saveOn === 'change') {
        handleSubmit()
      }
    },
    [field, saveOn, handleSubmit]
  )

  // Equivalent to componentWillUnmount
  useEffect(() => {
    return () => {
      if (focused) {
        handleSubmit()
      }
    }
  }, [focused, handleSubmit])

  return (
    <Component
      {...field}
      placeholder={placeholder}
      disabled={disabled}
      checked={!!field.value}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      data-testid={testId && `${testId}__input`}
      aria-invalid={isInvalid || undefined}
    />
  )
}
