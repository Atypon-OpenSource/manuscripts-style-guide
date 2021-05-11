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

import {
  buildNoteTree,
  CommentData,
  CommentsTreeMap,
  CommentType,
} from '../lib/comments'
import { CheckboxField, CheckboxLabel } from './Checkbox'
import { CommentTarget } from './Comments/CommentTarget'
import { CommentWrapper } from './Comments/CommentWrapper'
import { AddNoteIcon } from './icons/add-note'
import { RelativeDate } from './RelativeDate'

interface Props {
  createKeyword: (name: string) => Promise<Keyword>
  deleteModel: (id: string) => Promise<string>
  getCollaboratorById: (id: string) => UserProfile | undefined
  currentUserId?: string
  displayName?: string
  getKeyword: (id: string) => Keyword | undefined
  listCollaborators: () => UserProfile[]
  listKeywords: () => Keyword[]
  notes: ManuscriptNote[]
  noteSource: 'EMAIL' | 'EDITOR' | 'DASHBOARD'
  saveModel: (model: ManuscriptNote) => Promise<ManuscriptNote>
  selected: Selected | null
}

export const ManuscriptNoteList: React.FC<Props> = React.memo(
  ({
    createKeyword,
    deleteModel,
    getCollaboratorById,
    currentUserId,
    displayName,
    getKeyword,
    listCollaborators,
    listKeywords,
    notes,
    noteSource,
    saveModel,
    selected,
  }) => {
    const [newComment, setNewComment] = useState<ManuscriptNote>()
    const [selectResolved, setSelectResolved] = useState<boolean>(false)
    const [noteTarget, setNoteTarget] = useState<string>()

    useEffect(() => {
      if (noteTarget && !newComment) {
        const newComment = buildNote(noteTarget, noteSource) as ManuscriptNote
        newComment.displayName = displayName

        if (currentUserId) {
          const contribution = buildContribution(currentUserId)
          newComment.contributions = [contribution]
        } else {
          newComment.contributions = []
        }

        setNewComment(newComment)
      }
    }, [noteTarget, currentUserId, displayName, newComment, noteSource])

    const items = useMemo<
      Array<[string, CommentData<ManuscriptNote>[]]>
    >(() => {
      const combinedComments = [...notes]
      if (newComment) {
        combinedComments.push(newComment)
      }
      const commentsTreeMap = buildNoteTree(
        combinedComments
      ) as CommentsTreeMap<ManuscriptNote>
      return Array.from(commentsTreeMap.entries())
    }, [notes, newComment])

    const handleAddNewNote = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault()
        setNoteTarget(ObjectTypes.ManuscriptNote + ':' + uuid().toUpperCase())
        setSelectResolved(false)
      },
      [setNoteTarget]
    )

    const deleteNote = useCallback(
      (id: string) => {
        return deleteModel(id).finally(() => {
          if (newComment && newComment._id === id) {
            setNoteTarget(undefined)
            setNewComment(undefined)
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
            setNewComment(undefined)
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

    const handleOnSelectChange = useCallback(
      (e) => setSelectResolved(e.target.checked),
      []
    )
    return (
      <>
        <ActionHeader>
          <AddNoteButton onClick={handleAddNewNote}>
            <AddNoteIcon />
          </AddNoteButton>

          {items.length > 0 && (
            <Checkbox>
              <CheckboxField
                checked={selectResolved}
                onChange={handleOnSelectChange}
              />
              <LabelText>See resolved</LabelText>
            </Checkbox>
          )}
        </ActionHeader>

        {items.length >= 0 && (
          <NoteListContainer>
            {items.map(([target, noteData]) => {
              const isSelected = selected && selected.node.attrs.id
              const selectedNoteData = !selectResolved
                ? noteData
                : noteData.filter((note) => note.comment.resolved)
              return (
                <CommentTarget key={target} isSelected={isSelected}>
                  {selectedNoteData.map(({ comment, children }) => (
                    <NoteThread key={comment._id}>
                      <NoteBodyContainer
                        isSelected={isSelected}
                        isNew={isNew(comment as ManuscriptNote)}
                      >
                        <CommentWrapper
                          createKeyword={createKeyword}
                          comment={comment}
                          deleteComment={deleteNote}
                          resolvedCallback={async () =>
                            await saveModel({
                              ...comment,
                              resolved: !comment.resolved,
                            } as ManuscriptNote)
                          }
                          getCollaborator={getCollaboratorById}
                          getKeyword={getKeyword}
                          listCollaborators={listCollaborators}
                          listKeywords={listKeywords}
                          saveComment={saveNote}
                          setCommentTarget={setNoteTarget}
                          isNew={isNew(comment as ManuscriptNote)}
                        />
                      </NoteBodyContainer>

                      {children.map((note) => (
                        <ReplyBodyContainer key={note._id}>
                          <CommentWrapper
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
                        </ReplyBodyContainer>
                      ))}
                    </NoteThread>
                  ))}
                </CommentTarget>
              )
            })}
          </NoteListContainer>
        )}
      </>
    )
  }
)

const AddNoteButton = styled.button`
  cursor: pointer;
  background: none;
  border-style: none;
  height: 19px;
  &:focus-visible {
    outline: initial;
  }
`

const NoteListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const NoteBodyContainer = styled.div<{
  isSelected: boolean
  isNew: boolean
}>`
  padding: ${(props) => props.theme.grid.unit * 4}px 0
    ${(props) => props.theme.grid.unit * 2}px;
  background: ${(props) => props.theme.colors.background.primary};
  cursor: pointer;

  ${(props) => borderStyle(props.theme.colors.border.secondary)};
  ${(props) => props.isNew && borderStyle(props.theme.colors.border.primary)}

  .tooltip {
    border-radius: 6px;
    padding: 8px;
    text-align: center;
  }
`

const borderStyle = (color: string) => `
    ${'border: 1px solid ' + color};
    ${'border-left: 4px solid ' + color};
`

const NoteThread = styled.div`
  margin: 16px 16px 16px 0;
`

export const ReplyBodyContainer = styled.div`
  padding: ${(props) => props.theme.grid.unit * 4}px 0
    ${(props) => props.theme.grid.unit * 2}px;
  margin-left: ${(props) => props.theme.grid.unit * 4}px;
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  border-top: none;
`

export const LightRelativeDate = styled(RelativeDate)`
  font-size: ${(props) => props.theme.font.size.small};
  color: ${(props) => props.theme.colors.text.secondary};
  letter-spacing: -0.2px;
`

const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 17px;
  margin-left: 33px;
`

export const LabelText = styled.div`
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 14px;
  line-height: 24px;
`

const Checkbox = styled(CheckboxLabel)`
  div {
    color: ${(props) => props.theme.colors.text.primary};
  }
`
