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
import { css, styled } from '../../styled-components'
import { AuthorAffiliation as AuthorAffiliationT } from '../../types'
import { AuthorName } from '../AuthorName'

const AuthorNotes = styled.span`
  display: inline-block;
  font-size: 0.75em;
  line-height: 1;
  vertical-align: top;
`

const LinkSharedStyles = css`
  text-decoration: none;
  color: inherit;
  outline: none;

  &:hover,
  &:focus {
    &,
    span {
      color: ${props => props.theme.colors.text.tertiary};
    }
  }
`

const AuthorAffiliation = styled.span`
  ${LinkSharedStyles}
`

const AuthorsContainer = styled.a`
  display: inline-flex;
  ${LinkSharedStyles}
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

interface AuthorProps {
  author: Contributor
  affiliations?: AuthorAffiliationT[]
  jointFirstAuthor: boolean
  showEditButton: boolean
  selectAuthor: (data: Contributor) => void
  startEditing: () => void
}

export const Author: React.FunctionComponent<AuthorProps> = ({
  author,
  affiliations,
  jointFirstAuthor,
  startEditing,
  selectAuthor,
  showEditButton,
}) => (
  <span key={author._id}>
    {showEditButton ? (
      <AuthorsContainer
        href="#"
        onClick={() => {
          startEditing()
          selectAuthor(author)
        }}
      >
        <AuthorName name={author.bibliographicName} />
      </AuthorsContainer>
    ) : (
      <AuthorName name={author.bibliographicName} />
    )}
    {affiliations && (
      <AuthorNotes>
        {affiliations.map((affiliation, index) => (
          <React.Fragment key={affiliation.data._id}>
            {!!index && ','}
            <AuthorAffiliation
              aria-describedby={`affiliation-${affiliation.ordinal}`}
            >
              {affiliation.ordinal}
            </AuthorAffiliation>
          </React.Fragment>
        ))}
      </AuthorNotes>
    )}

    {author.isCorresponding && (
      <AuthorNotes title={'Corresponding author'}>*</AuthorNotes>
    )}
    {jointFirstAuthor && (
      <AuthorNotes title={'Joint contributor'}>†</AuthorNotes>
    )}
  </span>
)

export default Author
