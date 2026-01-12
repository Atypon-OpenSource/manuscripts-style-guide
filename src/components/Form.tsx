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

import { Form } from 'formik'
import styled from 'styled-components'

export const CenteredForm = styled(Form)`
  width: 100%;
  max-width: 450px;
`

export const FormHeader = styled.div`
  padding: 40px;
  text-align: center;
  @media (max-width: 450px) {
    padding: 40px 0;
  }
`

export const FormActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.51);
`

export const FormError = styled.div`
  background: ${(props) => props.theme.colors.background.error};
  color: ${(props) => props.theme.colors.text.error};
  border-radius: ${(props) => props.theme.grid.radius.default};
  margin-top: 5px;
  margin-bottom: 5px;
  position: relative;
  padding: 12px;
`

export interface FormErrors {
  submit?: string
}

export interface ErrorProps {
  error?: string | null | Record<string, unknown>
}

// Shared layout primitives
export const FormContainer = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.grid.unit * 4}px;
  padding: ${(props) => props.theme.grid.unit * 4}px;
  box-sizing: border-box;
`

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.grid.unit * 3}px;
`

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.grid.unit * 2}px;
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.grid.unit}px;
`

export const FormActionsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: ${(props) => props.theme.grid.unit * 2}px;
  margin-top: ${(props) => props.theme.grid.unit * 3}px;
`

export const FormTitle = styled.h2`
  margin: 0;
  font: ${(props) => props.theme.font.weight.medium}
    ${(props) => props.theme.font.size.xlarge} /
    ${(props) => props.theme.font.lineHeight.normal}
    ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.primary};
`

export const FormSubtitle = styled.p`
  margin: 0;
  color: ${(props) => props.theme.colors.text.secondary};
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.medium} /
    ${(props) => props.theme.font.lineHeight.large}
    ${(props) => props.theme.font.family.sans};
`

export const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${(props) => props.theme.grid.unit}px;
  color: ${(props) => props.theme.colors.text.secondary};
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.normal} /
    ${(props) => props.theme.font.lineHeight.normal}
    ${(props) => props.theme.font.family.sans};
`

export const InputHelperText = styled.span`
  color: ${(props) => props.theme.colors.text.muted};
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.small} /
    ${(props) => props.theme.font.lineHeight.normal}
    ${(props) => props.theme.font.family.sans};
`
