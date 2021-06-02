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
import React, { useCallback, useRef, useState, useMemo } from 'react'
import styled from 'styled-components'
import { Capabilities } from '../../lib/capabilities'

import { isSavedComment } from '../SubmissionInspector'
import { CommentActions } from './CommentActions'
import { CommentBody, CommentBodyProps } from './CommentBody'
import { CommentUser } from './CommentUser'
import { CommentType, UnsavedComment } from '../../lib/comments'

const isOwn = (comment: CommentType | UnsavedComment, userId?: string) =>
  comment.contributions
    ? comment.contributions?.some((c) => c.profileID === userId)
    : false

export const CommentWrapper: React.FC<
  CommentBodyProps & {
    handleSetResolved?: () => void
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
  children,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>()
  const dropdownButtonRef = useRef<HTMLButtonElement>(null)

  const handleCommentFocus = useCallback(() => {
    if (isNew) {
      setIsEditing(true)
    } else if (dropdownButtonRef.current) {
      dropdownButtonRef.current.focus()
    }
  }, [isNew])

  const isOwnComment = useMemo(() => isOwn(comment, currentUserId), [
    comment,
    currentUserId,
  ])

  return (
    <Note>
      <NoteHeader>
        <NoteTitle type="button" onClick={handleCommentFocus}>
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
          dropdownButtonRef={dropdownButtonRef}
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
        isNew={isNew}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
      />
    </Note>
  )
}

const Note = styled.div`
  & .note-actions {
    opacity: 0;
    transition: 0.1s ease-in-out opacity;
  }
  &:focus-within .note-actions,
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
