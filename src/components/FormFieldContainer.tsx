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

import React, {
  Children,
  cloneElement,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react'
import styled from 'styled-components'

import { ErrorProps } from './Form'
import { TextFieldLabel } from './TextField'
import { TextFieldError, TextFieldErrorItem } from './FormCommon'

interface FormFieldContainerProps {
  label?: string
  error?: ReactNode | undefined
  info?: ReactNode | undefined
  id?: string
  children: ReactElement<ErrorProps>
}

export const FormFieldContainer: FunctionComponent<FormFieldContainerProps> = ({
  label,
  error,
  info,
  id,
  children,
}) => {
  const childrenWithErrorProp = Children.map(
    children,
    (child: ReactElement<ErrorProps>) =>
      cloneElement(child, {
        error: error ? String(error) : undefined,
      })
  )

  return (
    <FieldContainerWrapper>
      {label && (
        <LabelWrapper>
          <TextFieldLabel htmlFor={id}>{label}</TextFieldLabel>
        </LabelWrapper>
      )}
      {childrenWithErrorProp}
      {info && !error && <FormFieldInfo>{info}</FormFieldInfo>}
      {error && (
        <TextFieldError>
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
  margin-top: 4px;
`
