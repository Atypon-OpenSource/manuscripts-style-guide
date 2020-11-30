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
import {
  buildContribution,
  buildNote,
  ManuscriptNode,
  Selected,
} from '@manuscripts/manuscript-transform'
import {
  Keyword,
  ManuscriptNote,
  ObjectTypes,
  UserProfile,
} from '@manuscripts/manuscripts-json-schema'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

import { buildNoteTree, CommentData, CommentType } from '../lib/comments'
import { CommentBody } from './Comments/CommentBody'
import { CommentTarget } from './Comments/CommentTarget'
import { CommentUser } from './Comments/CommentUser'
import { AddNoteIcon } from './icons/add-note'
import { RelativeDate } from './RelativeDate'

interface Props {
  createKeyword: (name: string) => Promise<Keyword>
  deleteModel: (id: string) => Promise<string>
  doc: ManuscriptNode
  getCollaboratorById: (id: string) => UserProfile | undefined
  currentUserId: string
  getKeyword: (id: string) => Keyword | undefined
  listCollaborators: () => UserProfile[]
  listKeywords: () => Keyword[]
  notes: ManuscriptNote[]
  noteTarget?: string
  saveModel: (model: ManuscriptNote) => Promise<ManuscriptNote>
  selected: Selected | null
  setNoteTarget: (noteTarget?: string) => void
}

export const ManuscriptNoteList: React.FC<Props> = React.memo(
  ({
    createKeyword,
    deleteModel,
    doc,
    getCollaboratorById,
    currentUserId,
    getKeyword,
    listCollaborators,
    listKeywords,
    notes,
    noteTarget,
    saveModel,
    selected,
    setNoteTarget,
  }) => {
    const [newComment, setNewComment] = useState<ManuscriptNote>()

    useEffect(() => {
      if (noteTarget && !newComment) {
        const newComment = buildNote(noteTarget) as ManuscriptNote

        const contribution = buildContribution(currentUserId)
        newComment.contributions = [contribution]
        setNewComment(newComment)
      }
    }, [noteTarget, currentUserId, doc, newComment])

    const items = useMemo<Array<[string, CommentData[]]>>(() => {
      const combinedComments = [...notes]
      if (newComment) {
        combinedComments.push(newComment)
      }
      const commentsTreeMap = buildNoteTree(doc, combinedComments)
      return Array.from(commentsTreeMap.entries())
    }, [notes, newComment, doc])

    const handleAddNewNote = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault()
        setNoteTarget(ObjectTypes.ManuscriptNote + ':' + uuid().toUpperCase())
      },
      [setNoteTarget]
    )

    const deleteNote = useCallback(
      (comment: CommentType) => {
        return deleteModel(comment._id).finally(() => {
          if (newComment && newComment._id === comment._id) {
            setNoteTarget(undefined)
          }
        })
      },
      [deleteModel, newComment, setNoteTarget]
    )

    const saveNote = useCallback(
      (note: CommentType) => {
        return saveModel(note as ManuscriptNote).then((note) => {
          if (newComment && newComment._id === note._id) {
            setNoteTarget(undefined)
          }
          return note
        })
      },
      [newComment, setNoteTarget, saveModel]
    )

    const isNew = useCallback(
      (note: ManuscriptNote): boolean => {
        return newComment ? newComment._id === note._id : false
      },
      [newComment]
    )

    return (
      <>
        <AddNoteButton onClick={handleAddNewNote}>
          <AddText>Add</AddText>
          <AddNoteIcon />
        </AddNoteButton>

        {items !== undefined && items.length >= 0 && (
          <>
            <NoteListContainer>
              {items.map(([target, noteData]) => {
                const isSelected = selected && selected.node.attrs.id
                return (
                  <CommentTarget key={target} isSelected={isSelected}>
                    {noteData.map(({ comment, children }) => (
                      <NoteThread key={comment._id}>
                        <Container isSelected={isSelected}>
                          <NoteHeader>
                            {comment.contributions && (
                              <CommentUser
                                contributions={comment.contributions}
                                getCollaboratorById={getCollaboratorById}
                              />
                            )}
                            <LightRelativeDate
                              createdAt={comment.createdAt * 1000}
                            />
                          </NoteHeader>

                          <CommentBody
                            createKeyword={createKeyword}
                            comment={comment}
                            deleteComment={deleteNote}
                            getCollaborator={getCollaboratorById}
                            getKeyword={getKeyword}
                            listCollaborators={listCollaborators}
                            listKeywords={listKeywords}
                            saveComment={saveNote}
                            setCommentTarget={setNoteTarget}
                            isNew={isNew(comment as ManuscriptNote)}
                          />
                        </Container>

                        {children.map((note) => (
                          <Reply key={note._id}>
                            <NoteHeader>
                              {note.contributions && (
                                <CommentUser
                                  contributions={note.contributions}
                                  getCollaboratorById={getCollaboratorById}
                                />
                              )}
                              <LightRelativeDate
                                createdAt={note.createdAt * 1000}
                              />
                            </NoteHeader>

                            <CommentBody
                              createKeyword={createKeyword}
                              comment={note}
                              deleteComment={deleteNote}
                              getCollaborator={getCollaboratorById}
                              getKeyword={getKeyword}
                              isReply={true}
                              listCollaborators={listCollaborators}
                              listKeywords={listKeywords}
                              saveComment={saveNote}
                              setCommentTarget={setNoteTarget}
                              isNew={isNew(note as ManuscriptNote)}
                            />
                          </Reply>
                        ))}
                      </NoteThread>
                    ))}
                  </CommentTarget>
                )
              })}
            </NoteListContainer>
          </>
        )}
      </>
    )
  }
)

const AddText = styled.div`
  float: left;
  padding: 0px 43px 25px 8px;
`

const AddNoteButton = styled.button`
  cursor: pointer;
  background: none;
  border-style: none;
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: initial;
  }
`

const NoteListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`

const Container = styled.div<{
  isSelected: boolean
}>`
  padding: ${(props) => props.theme.grid.unit * 4}px 0
    ${(props) => props.theme.grid.unit * 2}px;
  background: ${(props) => props.theme.colors.background.primary};
  border: 1px solid ${(props) => props.theme.colors.brand.xlight};
  border-left: 4px solid ${(props) => props.theme.colors.brand.light};
`

const NoteThread = styled.div`
  margin: 16px 16px 16px 0;
`

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => props.theme.font.size.normal};
  margin-bottom: 16px;
  padding: 0 16px;
`

const Reply = styled.div`
  padding: ${(props) => props.theme.grid.unit * 4}px 0
    ${(props) => props.theme.grid.unit * 2}px;
  margin-left: ${(props) => props.theme.grid.unit * 4}px;
  border: 1px solid ${(props) => props.theme.colors.brand.xlight};
  border-top: none;
`

const LightRelativeDate = styled(RelativeDate)`
  font-size: ${(props) => props.theme.font.size.small};
  color: ${(props) => props.theme.colors.text.secondary};
  letter-spacing: -0.2px;
`
