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

import { Field } from 'formik'
import React from 'react'
import styled, { css } from 'styled-components'

import { ErrorProps } from './Form'

export interface BaseTextFieldProps {
  error?: boolean | string
  variant?: 'small' | 'large'
}

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseTextFieldProps {}

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseTextFieldProps {}

export const commonStyles = css<BaseTextFieldProps>`
  border: 1px solid
    ${(props) =>
      props.error
        ? props.theme.colors.border.error
        : props.theme.colors.border.field.default};
  border-radius: 3px;
  box-sizing: border-box;
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.medium} / 1
    ${(props) => props.theme.font.family.sans};
  line-height: ${(props) => props.theme.font.lineHeight.large};
  outline: none;
  padding: ${(props) => {
    if (props.variant === 'small') {
      return '0 12px'
    }
    if (props.variant === 'large') {
      return '4px 16px'
    }
    return '0 12px'
  }};
  min-height: ${(props) => {
    if (props.variant === 'small') {
      return '32px'
    }
    if (props.variant === 'large') {
      return '40px'
    }
    return '40px'
  }};
  position: relative;
  width: 100%;
  background-color: #fff;
  color: ${(props) => props.theme.colors.text.primary};

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
    opacity: 1;
    font-family: ${(props) => props.theme.font.family.sans};
    font-size: ${(props) => props.theme.font.size.medium};
    font-style: italic;
    font-weight: ${(props) => props.theme.font.weight.normal};
    line-height: ${(props) => props.theme.font.lineHeight.large};
  }

  &:hover:not(:disabled) {
    background-color: #f2fbfc;
  }

  &:focus:not(:disabled) {
    border: 2px solid
      ${(props) =>
        props.error
          ? props.theme.colors.border.error
          : props.theme.colors.brand.default};
    background-color: #f2fbfc;

    &::placeholder {
      color: #c9c9c9;
    }
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #e4e4e4;
    color: #b3b3b3;
    cursor: not-allowed;
  }

  ${(props) => props.error && 'z-index: 2'};
`

export const TextField = styled.input<TextFieldProps>`
  display: block;
  ${commonStyles}
`

export const TextArea = styled.textarea<TextAreaProps>`
  ${commonStyles}
  max-width: 100%;
`

export const YearInput = styled.input<TextFieldProps>`
  ${commonStyles}
`

export const YearField = styled(Field).attrs({ as: YearInput })``

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
  leftIcon: React.ReactNode
  children: React.ReactNode
}> = ({ leftIcon, children }) => {
  return (
    <TextFieldWrapperStyles>
      {children}
      <IconWrapper>{leftIcon}</IconWrapper>
    </TextFieldWrapperStyles>
  )
}
