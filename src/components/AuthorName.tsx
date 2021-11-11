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

import { BibliographicName } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import styled, { DefaultTheme, ThemeProps, withTheme } from 'styled-components'

import { initials } from '../lib/name'

const NameParts = styled.span``

const buildNameLiteral = (name: BibliographicName) =>
  [initials(name), name.family, name.suffix].filter((part) => part).join(' ')

export interface AuthorNameProps {
  name: BibliographicName
  email?: string
}

const AuthorNameComponent: React.FC<
  AuthorNameProps & ThemeProps<DefaultTheme>
> = ({ name, email, theme }) =>
  !name.given && !name.family ? (
    <NameParts
      color={theme.colors.text.secondary}
      data-testid={`author-name--unknown`}
    >
      Unknown Author
    </NameParts>
  ) : (
    <NameParts data-testid={`author-name--${name.given}`}>
      {(email && buildNameLiteral(name).concat(' ').concat(`(${email})`)) ||
        buildNameLiteral(name)}
    </NameParts>
  )

export const AuthorName: React.FC<AuthorNameProps> =
  withTheme(AuthorNameComponent)
