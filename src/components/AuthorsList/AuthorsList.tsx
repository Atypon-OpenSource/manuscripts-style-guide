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

import { Contributor } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import styled from 'styled-components'

import { isJointFirstAuthor } from '../../lib/authors'
import { AuthorAffiliation } from '../../types'
import { PrimaryButton } from '../Button'
import { Author } from './Author'

const AuthorsContainer = styled.div<{ isEmpty: boolean }>`
  align-items: center;
  display: flex;

  @media (min-width: 768px) {
    & ${PrimaryButton} {
      display: ${(props) => (props.isEmpty ? 'initial' : 'none')};
    }

    &:hover ${PrimaryButton} {
      display: initial;
    }
  }
`

const AuthorsActions = styled.div`
  align-items: center;
  display: flex;
  margin-left: ${(props) => props.theme.grid.unit * 2}px;
`

interface Props {
  authors: Contributor[]
  authorAffiliations: Map<string, AuthorAffiliation[]>
  showEditButton?: boolean
  disableEditButton?: boolean
  startEditing?: () => void
  selectAuthor?: (data: Contributor) => void
}

export const AuthorsList: React.FunctionComponent<Props> = ({
  authors,
  authorAffiliations,
  startEditing,
  showEditButton,
  disableEditButton,
  selectAuthor,
}) => (
  <AuthorsContainer isEmpty={!authors.length}>
    <div>
      {authors.map((author, index) => (
        <React.Fragment key={author._id}>
          {!!index && ', '}
          <Author
            author={author}
            jointFirstAuthor={isJointFirstAuthor(authors, index)}
            affiliations={authorAffiliations.get(author._id)}
            selectAuthor={selectAuthor}
            startEditing={startEditing}
            showEditButton={showEditButton}
          />
        </React.Fragment>
      ))}
    </div>

    {showEditButton && startEditing && (
      <AuthorsActions>
        <PrimaryButton
          mini={true}
          onClick={startEditing}
          className={'edit_authors_button'}
          disabled={disableEditButton}
        >
          Edit Authors
        </PrimaryButton>
      </AuthorsActions>
    )}
  </AuthorsContainer>
)
