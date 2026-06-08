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
import styled, { css } from 'styled-components'

import { CalendarIcon } from './icons'

export interface BaseDateInputProps {
  error?: boolean | string
  variant?: 'small' | 'large'
}

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    BaseDateInputProps {}

const inputStyles = css<BaseDateInputProps>`
  box-sizing: border-box;
  width: 100%;
  min-height: ${(props) => (props.variant === 'small' ? '32px' : '40px')};
  padding: 0 36px 0 12px;
  border: 1px solid
    ${(props) =>
      props.error
        ? props.theme.colors.border.error
        : props.theme.colors.border.field.default};
  border-radius: 3px;
  background-color: #fff;
  color: ${(props) => props.theme.colors.text.primary};
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.medium} / 1
    ${(props) => props.theme.font.family.sans};
  line-height: ${(props) => props.theme.font.lineHeight.large};
  outline: none;

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    position: absolute;
    right: 0;
    width: 36px;
    height: 100%;
    cursor: pointer;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.greyMuted || '#6E6E6E'};
    opacity: 1;
    font-style: italic;
  }

  &:hover:not(:disabled) {
    background-color: #f2fbfc;
    border-color: ${(props) => props.theme.colors.text.greyMuted};
  }

  &:focus:not(:disabled) {
    border: 2px solid
      ${(props) =>
        props.error
          ? props.theme.colors.border.error
          : props.theme.colors.brand.default};
    background-color: #f2fbfc;
    padding: 0 35px 0 11px;
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #e4e4e4;
    color: #b3b3b3;
    cursor: not-allowed;
  }
`

const StyledDateInput = styled.input<BaseDateInputProps>`
  ${inputStyles}
`

const Wrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
`

const IconWrapper = styled.div`
  position: absolute;
  right: ${(props) => props.theme.grid.unit * 3}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
  color: ${(props) => props.theme.colors.border.secondary};
`

const makeComponent = (
  type: 'date' | 'datetime-local',
  displayName: string
) => {
  const Component: React.FC<DateInputProps> = (props) => (
    <Wrapper>
      <StyledDateInput {...props} type={type} />
      <IconWrapper>
        <CalendarIcon width={16} height={16} />
      </IconWrapper>
    </Wrapper>
  )
  Component.displayName = displayName
  return Component
}

export const DateInput = makeComponent('date', 'DateInput')
export const DateTimeInput = makeComponent('datetime-local', 'DateTimeInput')
