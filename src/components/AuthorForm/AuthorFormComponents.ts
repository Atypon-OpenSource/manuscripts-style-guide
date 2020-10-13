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

import styled, { DefaultTheme, StyledComponent } from 'styled-components'

import { CheckboxLabel } from '../Checkbox'
import { TextField } from '../TextField'

export const Fields = styled.div`
  padding: 16px;
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

export const LabelText = styled.div`
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.normal} / 1
    ${(props) => props.theme.font.family.sans};
  letter-spacing: -0.2px;
  color: ${(props) => props.theme.colors.text.primary};
`

export const Fieldset = styled.fieldset`
  border: none;

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`

export const Legend = styled.legend`
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.xlarge} /
    ${(props) => props.theme.font.lineHeight.large}
    ${(props) => props.theme.font.family.sans};
  letter-spacing: -0.4px;
  color: ${(props) => props.theme.colors.text.secondary};
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

export interface AuthorFormComponents {
  Legend: StyledComponent<'legend', DefaultTheme>
  CheckboxLabel: StyledComponent<'label', DefaultTheme>
  TextField: StyledComponent<'input', DefaultTheme>
}

export type AuthorFormComponentOverrides = {
  [K in keyof AuthorFormComponents]?: AuthorFormComponents[K]
}

export const defaultAuthorFormComponents: AuthorFormComponents = {
  Legend,
  CheckboxLabel,
  TextField,
}
