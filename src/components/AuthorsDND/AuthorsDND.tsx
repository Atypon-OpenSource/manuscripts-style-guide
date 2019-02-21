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

import { Contributor, UserProfile } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import { styled } from '../../styled-components'
import DraggableAuthorItem from './DraggableAuthorItem'

const SidebarList = styled.div`
  flex: 1;
  overflow-y: visible;
`

interface Props {
  authors: Contributor[]
  selectAuthor: (item: Contributor) => void
  selectedAuthor: Contributor | null
  handleDrop: (oldIndex: number, newIndex: number) => void
  getSidebarItemDecorator?: (authorID: string) => JSX.Element | null
  renderAuthorName?: React.FunctionComponent
}

export const AuthorsDND: React.FunctionComponent<Props> = ({
  authors,
  selectAuthor,
  selectedAuthor,
  handleDrop,
  getSidebarItemDecorator,
  renderAuthorName,
}) => (
  <SidebarList>
    {authors.map((author, index) => {
      // const affiliations = authorAffiliations.get(author._id)
      // const user = users.findOne(author.userID) // TODO

      const user: Partial<UserProfile> = {
        _id: author.userID,
      }

      const authorItem = {
        _id: author._id,
        priority: author.priority || null,
        index,
      }

      const decorator = getSidebarItemDecorator
        ? getSidebarItemDecorator(author._id)
        : null

      return (
        <DraggableAuthorItem
          key={author._id}
          authorItem={authorItem}
          onDrop={handleDrop}
          author={author}
          authors={authors}
          user={user}
          selectedAuthor={selectedAuthor}
          selectAuthor={selectAuthor}
          sidebarItemDecorator={decorator}
          renderAuthorName={renderAuthorName}
        />
      )
    })}
  </SidebarList>
)
