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

import { FunctionComponent, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'

import { TextFieldLabel } from './TextField'
import { TextFieldError, TextFieldErrorItem } from './FormCommon'

interface FormFieldContainerProps {
  label: string
  id: string
  error?: ReactNode
  info?: ReactNode
  children: ReactElement
  className?: string
}

export const FormFieldContainer: FunctionComponent<FormFieldContainerProps> = ({
  label,
  error,
  info,
  id,
  children,
  className,
}) => {
  return (
    <FieldContainerWrapper
      className={className}
      role="group"
      aria-invalid={!!error}
      aria-labelledby={label ? `${id}-label` : undefined}
      aria-describedby={error ? `${id}-error` : info ? `${id}-info` : undefined}
    >
      {label && (
        <LabelWrapper>
          <TextFieldLabel id={`${id}-label`} htmlFor={id}>
            {label}
          </TextFieldLabel>
        </LabelWrapper>
      )}
      {children}
      {info && !error && (
        <FormFieldInfo id={`${id}-info`}>{info}</FormFieldInfo>
      )}
      {error && (
        <TextFieldError id={`${id}-error`} role="alert">
          <TextFieldErrorItem>{error}</TextFieldErrorItem>
        </TextFieldError>
      )}
    </FieldContainerWrapper>
  )
}

const FieldContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`

const LabelWrapper = styled.div`
  margin-bottom: ${(props) => props.theme.grid.unit}px;
`

const FormFieldInfo = styled.div`
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: ${(props) => props.theme.font.size.small};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: ${(props) => props.theme.grid.unit}px;
`