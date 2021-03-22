/*!
 * © 2021 Atypon Systems LLC
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

import { Contributor } from '@manuscripts/manuscripts-json-schema'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { AuthorData } from '../types'
import { AffiliationsList } from './AffiliationsList'
import { AuthorsList } from './AuthorsList'

export const AuthorsContainer: React.FC<{
  authorData: AuthorData
  showEditButton: boolean
  startEditing: () => void
  selectAuthor: (data: Contributor) => void
}> = ({ authorData, showEditButton, startEditing, selectAuthor }) => {
  const authorAffiliations = useMemo(
    () => authorData.authors.filter((author) => author.role === 'author'),
    [authorData.authors]
  )

  const isThereJointContributor = useMemo(
    () =>
      authorData.authors.find((contributor) => contributor.isJointContributor),
    [authorData.authors]
  )

  return (
    <Container data-cy={'author-container'}>
      <AuthorsList
        authors={authorAffiliations}
        authorAffiliations={authorData.authorAffiliations}
        startEditing={startEditing}
        showEditButton={showEditButton}
        selectAuthor={selectAuthor}
      />

      <AffiliationsList affiliations={authorData.affiliations} />

      {isThereJointContributor && (
        <LegendWrapper>
          <Legend>†</Legend>
          These authors contributed equally to this work.
        </LegendWrapper>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-top: ${(props) => props.theme.grid.unit * 4}px;
`

const LegendWrapper = styled.p`
  margin: ${(props) => props.theme.grid.unit * 4}px 0 0 0;
`

const Legend = styled.span`
  display: inline-block;
  font-size: 0.75em;
  line-height: 1;
  vertical-align: top;
`
