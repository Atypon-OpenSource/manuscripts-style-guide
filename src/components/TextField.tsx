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

import React from 'react'
import styled, { css } from 'styled-components'

import { ErrorProps } from './Form'

const commonStyles = css<ErrorProps>`
  border: 1px solid
    ${(props) =>
      props.error
        ? props.theme.colors.border.error
        : props.theme.colors.border.field.default};
  border-radius: ${(props) => props.theme.grid.radius.small};
  box-sizing: border-box;
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.medium} / 1
    ${(props) => props.theme.font.family.sans};
  outline: none;
  padding: 10px ${(props) => props.theme.grid.unit * 4}px;
  position: relative;
  width: 100%;
  ${(props) => props.error && 'z-index: 2'};

  &:focus {
    border-color: ${(props) => props.theme.colors.border.field.hover};
    background-color: ${(props) => props.theme.colors.background.fifth};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.background.fifth};
  }

  &:invalid {
    box-shadow: none;
  }
`

export const TextField = styled.input<ErrorProps>`
  display: block;
  ${commonStyles}
`

export const TextArea = styled.textarea`
  ${commonStyles}
`

export const TextFieldGroup = styled.div`
  & ${TextField}:first-of-type {
    margin-top: ${(props) => props.theme.grid.unit}px;
  }

  & ${TextField}:last-of-type {
    margin-bottom: ${(props) => props.theme.grid.unit}px;
  }

  & ${TextField}:not(:first-of-type) {
    margin-top: -1px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  & ${TextField}:not(:last-of-type) {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-bottom: 0;

    &:focus + ${TextField} {
      border-top-color: ${(props) => props.theme.colors.border.field.hover};
    }
  }
`

export const TextFieldLabel = styled.label`
  font-family: ${(props) => props.theme.font.family.sans};
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text.secondary};

  & ${TextField} {
    margin-top: ${(props) => props.theme.grid.unit}px;
  }

  & ${TextArea} {
    margin-top: ${(props) => props.theme.grid.unit}px;
  }
`

const TextFieldWrapperStyles = styled.div`
  position: relative;

  ${TextField} {
    padding-left: 28px;
  }
`

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const TextFieldWrapper: React.FC<{
  leftIcon: JSX.Element
}> = ({ leftIcon, children }) => {
  return (
    <TextFieldWrapperStyles>
      {children}
      <IconWrapper>{leftIcon}</IconWrapper>
    </TextFieldWrapperStyles>
  )
}
