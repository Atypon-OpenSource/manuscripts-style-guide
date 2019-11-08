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

import CorrespondingAuthorBadge from '@manuscripts/assets/react/CorrespondingAuthorBadge'
import JointFirstAuthorBadge from '@manuscripts/assets/react/FirstAuthorBadge'
import { Contributor } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import { isJointFirstAuthor } from '../../lib/authors'
import { styled } from '../../styled-components'
import { Avatar } from '../Avatar'
import {
  AuthorItemComponentOverrides,
  defaultAuthorItemComponents,
} from './AuthorItemComponents'

const AuthorItemComponent = styled.div`
  padding: ${props => props.theme.grid.unit}px
    ${props => props.theme.grid.unit * 4}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: grab;
  transition: background-color 0.25s;

  &.active,
  &.dragging,
  &:hover {
    background: ${props => props.theme.colors.background.info};
  }

  &.dragging {
    transform: scale(0.8);
  }
`

const AuthorMetadata = styled.div`
  display: flex;
  align-items: center;
`

const AvatarContainer = styled.span`
  display: inline-flex;
  position: relative;
`

const AuthorBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const AuthorNotes = styled.span`
  position: absolute;
  top: 0;
  right: 0;

  & ${AuthorBadge}:not(:last-child) {
    right: -20%;
  }
`

const AuthorNameSpace = styled.span`
  margin-left: ${props => props.theme.grid.unit * 3}px;
`

const InvitedContainer = styled.div`
  display: flex;
  align-items: center;
`

interface Props {
  author: Contributor
  authors: Contributor[]
  user: Partial<{
    _id: string
    avatar: string
  }>
  selectedAuthor?: Contributor | null
  sidebarItemDecorator?: JSX.Element | null
  position: number
  components?: AuthorItemComponentOverrides
}

const AuthorItem: React.FC<Props> = ({
  author,
  authors,
  position,
  selectedAuthor,
  user,
  sidebarItemDecorator,
  components,
}) => {
  const { AuthorName } = {
    ...defaultAuthorItemComponents,
    ...components,
  }

  const isSelected = selectedAuthor && selectedAuthor._id === author._id

  return (
    <AuthorItemComponent className={isSelected ? 'active' : ''} tabIndex={0}>
      <AuthorMetadata>
        <AvatarContainer>
          <Avatar src={user.avatar} size={36} />
          <AuthorNotes>
            {author.isCorresponding && (
              <AuthorBadge>
                <CorrespondingAuthorBadge />
              </AuthorBadge>
            )}
            {isJointFirstAuthor(authors, position) && (
              <AuthorBadge>
                <JointFirstAuthorBadge />
              </AuthorBadge>
            )}
          </AuthorNotes>
        </AvatarContainer>

        <AuthorNameSpace>
          <AuthorName name={author.bibliographicName} />
        </AuthorNameSpace>
      </AuthorMetadata>

      <InvitedContainer>{sidebarItemDecorator}</InvitedContainer>
    </AuthorItemComponent>
  )
}

export default AuthorItem
