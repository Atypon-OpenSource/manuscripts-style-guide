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

const CommentUserContainer = styled.div`
  display: flex;
  align-items: center;
`

const CommentUserName = styled.div`
  margin: 0 ${(props) => props.theme.grid.unit * 2}px;
  font-weight: ${(props) => props.theme.font.weight.semibold};
`

export const CommentUser: React.FC<{
  contributions: Contribution[]
  getCollaboratorById: (id: string) => UserProfileWithAvatar | undefined
}> = ({ contributions, getCollaboratorById }) => {
  if (!contributions.length) {
    return null
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
      <Avatar src={user.avatar} size={20} />
      <CommentUserName>by {buildName(user.bibliographicName)}</CommentUserName>
    </CommentUserContainer>
  )
}
