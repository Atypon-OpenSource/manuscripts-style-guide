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
import styled from 'styled-components'

import { AttentionRedIcon } from './icons'

export const FieldError: React.FC<{ error?: string }> = ({ error }) => {
  if (!error) {
    return null
  }
  return (
    <>
      <AttentionRedIcon className="error-icon" width={16} height={16} />
      <ErrorText>{error}</ErrorText>
    </>
  )
}

export const FieldInfo: React.FC<{ info?: string }> = ({ info }) => {
  if (!info) {
    return null
  }
  return <FieldInfoText>{info}</FieldInfoText>
}

const ErrorText = styled.span`
  font-size: ${(props) => props.theme.font.size.small};
  color: ${(props) => props.theme.colors.text.error};
`

const FieldInfoText = styled.span`
  font-size: ${(props) => props.theme.font.size.small};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const TextWithGenerationWrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;
  width: 100%;

  > div:first-child {
    flex-grow: 1;
  }

  button {
    margin-top: ${(props) => props.theme.grid.unit * 6}px !important;
  }
`

export const TextFieldError = styled.div`
  margin-top: 4px;
  width: 100%;
`

export const TextFieldErrorItem = styled.div`
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: ${(props) => props.theme.font.size.small};
  color: ${(props) => props.theme.colors.text.error};
`
