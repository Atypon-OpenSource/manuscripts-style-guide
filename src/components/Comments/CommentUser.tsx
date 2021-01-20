/*!
 * © 2020 Atypon Systems LLC
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

import { UserProfileWithAvatar } from '@manuscripts/manuscript-transform'
import {
  BibliographicName,
  Contribution,
} from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import styled from 'styled-components'

import { Avatar } from '../Avatar'
import { LightRelativeDate } from '../ManuscriptNoteList'

const CommentUserContainer = styled.div`
  display: flex;
`

const CommentUserName = styled.div`
  margin: 0 ${(props) => props.theme.grid.unit * 2}px;
  font-weight: ${(props) => props.theme.font.weight.semibold};
`

const DateText = styled(CommentUserName)`
  font-size: ${(props) => props.theme.font.size.small};
  line-height: ${(props) => props.theme.font.lineHeight.normal};
  font-weight: ${(props) => props.theme.font.weight.normal};
  color: ${(props) => props.theme.colors.text.secondary};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.theme.font.size.normal};
`

export const CommentUser: React.FC<{
  contributions?: Contribution[]
  getCollaboratorById: (id: string) => UserProfileWithAvatar | undefined
  displayName?: string
  createdAt?: number
}> = ({ contributions, getCollaboratorById, displayName, createdAt }) => {
  if (!contributions || !contributions.length) {
    return (
      <CommentUserContainer>
        <Avatar size={20} />
        <CommentUserName>by {displayName || '(unknown user)'}</CommentUserName>
      </CommentUserContainer>
    )
  }

  const [contribution] = contributions // only one contributor

  const user = getCollaboratorById(contribution.profileID)

  const buildName = (
    name: Pick<BibliographicName, 'given' | 'family'>
  ): string => [name.given, name.family].filter((item) => item).join(' ')

  if (!user) {
    return null
  }

  return (
    <CommentUserContainer>
      <Header>
        <Avatar src={user.avatar} size={20} />
      </Header>
      <Header>
        <CommentUserName>
          By {buildName(user.bibliographicName)}
        </CommentUserName>
        <DateText>
          <LightRelativeDate createdAt={createdAt} />
        </DateText>
      </Header>
    </CommentUserContainer>
  )
}
