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

import { ErrorProps } from './Form'
import { TextFieldLabel } from './TextField'
import { TextFieldError, TextFieldErrorItem } from './TextFieldError'

interface TextFieldContainerProps {
  label?: string
  error?: string | null | Record<string, unknown>
  children: React.ReactElement<ErrorProps>
}

export const TextFieldContainer: React.FunctionComponent<TextFieldContainerProps> =
  ({ label, error, children }) => {
    const childrenWithErrorProp = React.Children.map(
      children,
      (child: React.ReactElement<ErrorProps>) =>
        React.cloneElement(child, { error })
    )

    return (
      <React.Fragment>
        {label ? (
          <TextFieldLabel>
            {label} {childrenWithErrorProp}
          </TextFieldLabel>
        ) : (
          childrenWithErrorProp
        )}
        {error && (
          <TextFieldError>
            <TextFieldErrorItem>{error}</TextFieldErrorItem>
          </TextFieldError>
        )}
      </React.Fragment>
    )
  }
