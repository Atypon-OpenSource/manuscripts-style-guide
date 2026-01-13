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
import styled from 'styled-components'

const CHECK_TICK_SVG =
  "data:image/svg+xml,%3Csvg width='16' height='12' viewBox='0 0 16 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 6.2L6.2 10.4L14 2' stroke='%23FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"

export const CheckboxLabel = styled.label<{
  disabled?: boolean
}>`
  input {
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  div {
    align-items: center;
    color: ${(props) =>
      props.disabled
        ? props.theme.colors.text.muted
        : props.theme.colors.text.secondary};
    display: flex;
    flex-wrap: nowrap;
    line-height: 16px;
    margin: 8px 0;

    &::before {
      content: ' ';
      display: inline-block;
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      border: 1.5px solid ${(props) => props.theme.colors.border.field.default};
      border-radius: 4px;
      margin-right: 12px;
      text-align: center;
      background: ${(props) => props.theme.colors.background.primary};
    }
  }

  input:checked + div::before {
    background: ${(props) => props.theme.colors.brand.medium};
    border-color: ${(props) => props.theme.colors.brand.medium};
    content: '';
    background-image: url(${CHECK_TICK_SVG});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 12px 10px;
  }

  input:focus + div::before {
    border-color: ${(props) => props.theme.colors.brand.medium};
  }

  input:focus-visible + div::before {
    outline: 2px solid ${(props) => props.theme.colors.outline.focus};
    outline-offset: 2px;
  }

  input:disabled + div::before {
    background: ${(props) => props.theme.colors.background.fifth};
    border-color: ${(props) => props.theme.colors.border.field.default};
  }
`

export const CheckboxField = styled.input.attrs({
  type: 'checkbox',
})<{ type?: string }>``
