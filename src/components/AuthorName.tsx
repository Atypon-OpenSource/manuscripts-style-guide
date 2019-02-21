import { BibliographicName } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import { initials } from '../lib/name'
import { styled, ThemeProps, withTheme } from '../styled-components'

const NameParts = styled.span`
  line-height: 35px;
  font-size: 18px;
  letter-spacing: -0.3px;
  color: ${props => props.color || props.theme.colors.global.text.primary};
`

const buildNameLiteral = (name: BibliographicName) =>
  [initials(name), name.family, name.suffix].filter(part => part).join(' ')

export interface AuthorNameProps {
  name: BibliographicName
}

const AuthorNameComponent: React.FunctionComponent<
  AuthorNameProps & ThemeProps
> = ({ name, theme }) =>
  !name.given && !name.family ? (
    <NameParts color={theme.colors.global.text.secondary}>
      Unknown Author
    </NameParts>
  ) : (
    <NameParts>{buildNameLiteral(name)}</NameParts>
  )

export const AuthorName = withTheme(AuthorNameComponent)
