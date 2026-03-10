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
import { FormRadioGroupProps } from './types'
import { FormFieldContainer } from '../FormFieldContainer'
import { StyledRadioGroup } from '../RadioGroup'

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  options,
  name,
  value,
  onChange,
  error,
  disabled,
  info,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(value)

  React.useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const onChangeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value: newValue } = e.target
      setSelectedValue(newValue)
      onChange?.(name, newValue)
    },
    [onChange, name]
  )

  return (
    <FormFieldContainer label={label} error={error} info={info} id={name}>
      <StyledRadioGroup
        name={name}
        options={options}
        value={selectedValue as string}
        onChange={onChangeHandler}
        disabled={disabled}
      />
    </FormFieldContainer>
  )
}
