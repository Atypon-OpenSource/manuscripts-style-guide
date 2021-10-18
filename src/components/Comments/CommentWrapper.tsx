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

import { ManuscriptNote } from '@manuscripts/manuscripts-json-schema'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'

import { Capabilities } from '../../lib/capabilities'
import { CommentType, isSavedComment, UnsavedComment } from '../../lib/comments'
import { CommentActions } from './CommentActions'
import { CommentBody, CommentBodyProps } from './CommentBody'
import { CommentUser } from './CommentUser'

const isOwn = (comment: CommentType | UnsavedComment, userId?: string) =>
  comment.contributions
    ? comment.contributions?.some((c) => c.profileID === userId)
    : false

export const CommentWrapper: React.FC<
  CommentBodyProps & {
    handleSetResolved?: () => void
    isSelected?: boolean
    handleRequestSelect?: () => void
    can?: Capabilities
    currentUserId?: string
    isProdNote?: boolean
  }
> = ({
  createKeyword,
  comment,
  can,
  currentUserId,
  getCollaborator,
  getKeyword,
  listCollaborators,
  listKeywords,
  saveComment,
  deleteComment,
  isReply,
  isNew,
  handleCreateReply,
  handleSetResolved,
  isProdNote,
  isSelected,
  handleRequestSelect,
  scrollIntoHighlight,
  children,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>()
  const threadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isNew) {
      setIsEditing(true)
      if (threadRef.current) {
        threadRef.current.scrollIntoView({
          block: 'nearest',
          inline: 'nearest',
        })
      }
    }
  }, [isNew])

  // use MouseDown and Spacebar/Enter key events to avoid taking focus
  // away from the editor
  const onTitleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      handleRequestSelect && handleRequestSelect()
    },
    [handleRequestSelect]
  )
  const onTitleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ([' ', 'Enter'].includes(e.key)) {
        e.preventDefault()
        handleRequestSelect && handleRequestSelect()
      }
    },
    [handleRequestSelect]
  )

  const isOwnComment = useMemo(() => isOwn(comment, currentUserId), [
    comment,
    currentUserId,
  ])

  return (
    <Note ref={threadRef} isSelected={isSelected}>
      <NoteHeader>
        <NoteTitle
          type="button"
          onMouseDown={onTitleMouseDown}
          onKeyDown={onTitleKeyDown}
        >
          {comment.contributions && (
            <CommentUser
              contributions={comment.contributions}
              getCollaboratorById={getCollaborator}
              displayName={(comment as ManuscriptNote).displayName}
              createdAt={
                isSavedComment(comment) ? comment.createdAt * 1000 : undefined
              }
            />
          )}
        </NoteTitle>
        <CommentActions
          id={comment._id}
          isOwnComment={isOwnComment}
          can={can}
          target={comment.target}
          isResolved={comment.resolved}
          handleSetResolved={handleSetResolved}
          deleteComment={deleteComment}
          setIsEditing={setIsEditing}
          isProdNote={isProdNote}
        />
      </NoteHeader>

      {children}

      <CommentBody
        createKeyword={createKeyword}
        comment={comment}
        deleteComment={deleteComment}
        getCollaborator={getCollaborator}
        getKeyword={getKeyword}
        listCollaborators={listCollaborators}
        listKeywords={listKeywords}
        isReply={isReply}
        saveComment={saveComment}
        handleCreateReply={handleCreateReply}
        scrollIntoHighlight={scrollIntoHighlight}
        isNew={isNew}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
      />
    </Note>
  )
}

const Note = styled.div<{ isSelected?: boolean }>`
  & .note-actions {
    opacity: 0;
    ${({ isSelected }) => isSelected && 'opacity: 1'}
    transition: 0.1s ease-in-out opacity;
  }
  &:hover .note-actions {
    opacity: 1;
  }
`

const NoteTitle = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
`

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.font.size.normal};
  margin-bottom: 16px;
  padding: 0 16px;
`
