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
import React, { useCallback } from 'react'
import {
  SortableContainer as sortableContainer,
  SortableElement as sortableElement,
} from 'react-sortable-hoc'
import AuthorItem from './AuthorItem'
import { AuthorItemComponentOverrides } from './AuthorItemComponents'
import AuthorSortableList from './AuthorSortableList'

interface OnSortStartArgs {
  index: number
  isKeySorting: boolean
}

interface OnSortEndArgs {
  oldIndex: number
  newIndex: number
}

const SortableContainer = sortableContainer(AuthorSortableList)
const SortableItem = sortableElement(AuthorItem)

interface Props {
  authors: Contributor[]
  selectAuthor: (author: Contributor) => void
  selectedAuthor?: Contributor | null
  handleDrop: (oldIndex: number, newIndex: number) => void
  getSidebarItemDecorator?: (id: string) => JSX.Element | null
  components?: AuthorItemComponentOverrides
}

export const AuthorsDND: React.FC<Props> = ({
  authors,
  handleDrop,
  getSidebarItemDecorator,
  selectAuthor,
  selectedAuthor,
  components,
}) => {
  const onSortStart = ({ index }: OnSortStartArgs) => {
    selectAuthor(authors[index])
  }

  const onDrop = useCallback(
    ({ oldIndex, newIndex }: OnSortEndArgs) => {
      if (oldIndex !== newIndex) {
        handleDrop(oldIndex, newIndex)
      }
    },
    [authors]
  )

  return (
    <SortableContainer
      onSortStart={onSortStart}
      onSortEnd={onDrop}
      keyboardSortingTransitionDuration={50}
    >
      {authors.map((author, position) => {
        const user = {
          _id: author.userID,
        }

        const decorator = getSidebarItemDecorator
          ? getSidebarItemDecorator(author._id)
          : null

        return (
          <SortableItem
            key={author._id}
            position={position}
            index={position}
            author={author}
            authors={authors}
            sidebarItemDecorator={decorator}
            selectedAuthor={selectedAuthor}
            user={user}
            components={components}
          />
        )
      })}
    </SortableContainer>
  )
}
