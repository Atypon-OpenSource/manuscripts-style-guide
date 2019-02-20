import React from 'react'
import { styled } from '../styled-components'

import { AffiliationMap } from '../types'

const Container = styled.table`
  border: none;
  margin-top: 16px;
  color: ${props => props.theme.colors.global.text.secondary};
  font-size: 15px;
  line-height: 1.73;
  letter-spacing: -0.1px;
`

const Header = styled.th`
  font-weight: normal;
  padding-right: 4px;
`

interface Props {
  affiliations: AffiliationMap
}

export const AffiliationsList: React.FunctionComponent<Props> = ({
  affiliations,
}) => (
  <Container>
    <tbody>
      {Array.from(affiliations.values()).map((affiliation, index) => (
        <tr key={affiliation._id}>
          <Header>{index + 1}</Header>
          <td>{affiliation.institution}</td>
        </tr>
      ))}
    </tbody>
  </Container>
)
