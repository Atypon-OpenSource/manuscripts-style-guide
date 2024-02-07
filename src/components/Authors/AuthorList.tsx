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

import { Contributor } from '@manuscripts/json-schema'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components'

import { DragLayer } from '../DragLayer'
import { DraggableAuthor } from './DraggableAuthor'

const AuthorListContainer = styled.div`
  flex: 1;
  overflow-y: visible;
`

interface AuthorListProps {
  author?: Contributor
  authors: Contributor[]
  onSelect: (item: Contributor) => void
  moveAuthor: (index: number, target: number) => void
}

export const AuthorList: React.FC<AuthorListProps> = ({
  author,
  authors,
  onSelect,
  moveAuthor,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <AuthorListContainer>
        <DragLayer />
        {authors.map((a) => {
          return (
            <DraggableAuthor
              key={a._id}
              author={a}
              isSelected={a._id === author?._id}
              onClick={() => onSelect(a)}
              moveAuthor={moveAuthor}
            />
          )
        })}
      </AuthorListContainer>
    </DndProvider>
  )
}
