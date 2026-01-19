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

const CHECKED_ICON =
  'data:image/svg+xml,%3Csvg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M0 4C0 1.79086 1.79086 0 4 0H12C14.2091 0 16 1.79086 16 4V12C16 14.2091 14.2091 16 12 16H4C1.79086 16 0 14.2091 0 12V4Z" fill="%230D79D0"/%3E%3Cpath d="M6.48052 9.81367L11.5848 4.26912C11.7499 4.08971 11.9444 4 12.1685 4C12.3926 4 12.5872 4.08971 12.7523 4.26912C12.9174 4.44842 13 4.66099 13 4.90684C13 5.15269 12.9174 5.36531 12.7523 5.54473L7.06432 11.7309C6.89916 11.9103 6.70456 12 6.48052 12C6.25648 12 6.06187 11.9103 5.89671 11.7309L3.24437 8.84968C3.07921 8.67026 2.99777 8.45763 3.00005 8.21179C3.00232 7.96594 3.08604 7.75337 3.2512 7.57407C3.41626 7.39465 3.61195 7.30495 3.83827 7.30495C4.06458 7.30495 4.26032 7.39465 4.42548 7.57407L6.48052 9.81367Z" fill="white" stroke="white" stroke-width="0.5"/%3E%3C/svg%3E'

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
    font-family: ${(props) => props.theme.font.family.sans};
    font-size: ${(props) => props.theme.font.size.normal};
    font-weight: ${(props) => props.theme.font.weight.normal};
    color: ${(props) =>
      props.disabled
        ? props.theme.colors.text.muted
        : props.theme.colors.text.primary};
    display: flex;
    flex-wrap: nowrap;
    line-height: 20px;
    margin: 8px 0;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

    &::before {
      content: '';
      display: inline-block;
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      border: 1.5px solid ${(props) => props.theme.colors.border.field.default};
      border-radius: 3px;
      margin-right: 10px;
      text-align: center;
      background: ${(props) => props.theme.colors.background.primary};
    }
  }


  input:checked + div::before {
    background-color: transparent !important;
    border-color: transparent !important;
    background-image: url('${CHECKED_ICON}') !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: cover !important;
  }

  input:focus-visible + div::before {
    outline: none;
  }

  input:disabled + div::before {
    background: ${(props) => props.theme.colors.background.fifth};
    border-color: ${(props) => props.theme.colors.border.field.default};
  }
  input:disabled + div {
    color: ${(props) => props.theme.colors.text.secondary};
  }

  input:checked:disabled + div::before {
    filter: grayscale(1) opacity(0.4);
  }
`

export const CheckboxField = styled.input.attrs({
  type: 'checkbox',
})<{ type?: string }>``
