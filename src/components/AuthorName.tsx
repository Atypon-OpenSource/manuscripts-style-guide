import { BibliographicName } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import { initials } from '../lib/name'
import { styled, withTheme } from '../styled-components'
import { Theme } from '../theme'

interface Props {
  name: BibliographicName
  theme: Theme
}

const NameParts = styled.span`
  line-height: 35px;
  font-size: 18px;
  letter-spacing: -0.3px;
  color: ${props => props.color || props.theme.colors.global.text.primary};
`

const buildNameLiteral = (name: BibliographicName) =>
  [initials(name), name.family, name.suffix].filter(part => part).join(' ')

const AuthorNameComponent: React.FunctionComponent<Props> = ({ name, theme }) =>
  !name.given && !name.family ? (
    <NameParts color={theme.colors.global.text.secondary}>
      Unknown Author
    </NameParts>
  ) : (
    <NameParts>{buildNameLiteral(name)}</NameParts>
  )

export const AuthorName = withTheme(AuthorNameComponent)
