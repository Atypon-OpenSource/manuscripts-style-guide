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
import { styled } from '../styled-components'

import formatAddress from '../lib/formatAddress'
import { AffiliationMap } from '../types'

const Container = styled.table`
  border: none;
  margin-top: 16px;
  color: ${props => props.theme.colors.global.text.secondary};
  font-size: 15px;
  line-height: 1.25;
  letter-spacing: -0.1px;

  td {
    padding-bottom: 0.6em;
  }
`

const Header = styled.th`
  font-weight: normal;
  padding-right: 4px;
  vertical-align: top;
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
          <td>{formatAddress(affiliation)}</td>
        </tr>
      ))}
    </tbody>
  </Container>
)
