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

import { styled, ThemedStyledComponent } from '../../styled-components'
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
  font-size: 14px;
  letter-spacing: -0.2px;
  color: ${props => props.theme.colors.global.text.primary};
`

export const CheckboxField = styled.input.attrs({
  type: 'checkbox',
})<{ type?: string }>``

export const CheckboxLabel = styled.label`
  color: #444;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 24px;

  & ${LabelText} {
    margin-left: 4px;
  }

  &:not(:last-child) {
    margin-right: 16px;
  }
`

export const PlaintextButton = styled.button`
  margin-top: 24px;
  color: ${props => props.theme.colors.global.text.link};
  background: transparent;
  padding: 0;
  border: none;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;

  &[disabled] {
    color: inherit;
    cursor: not-allowed;
  }
`

export const Fieldset = styled.fieldset`
  border: none;
`

export const Legend = styled.legend`
  font-size: 20px;
  letter-spacing: -0.4px;
  color: ${props => props.theme.colors.global.text.secondary};
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

export interface AuthorFormComponents {
  Legend: ThemedStyledComponent<'legend'>
  CheckboxLabel: ThemedStyledComponent<'label'>
  TextField: ThemedStyledComponent<'input'>
}

export type AuthorFormComponentOverrides = {
  [K in keyof AuthorFormComponents]?: AuthorFormComponents[K]
}

export const defaultAuthorFormComponents: AuthorFormComponents = {
  Legend,
  CheckboxLabel,
  TextField,
}
