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
import AnnotationReply from '@manuscripts/assets/react/AnnotationReply'
import { Keyword, UserProfile } from '@manuscripts/json-schema'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import styled from 'styled-components'

import { CommentType, UnsavedComment } from '../../lib/comments'
import { ButtonGroup, PrimaryButton, SecondaryButton } from '../Button'
import { FormError } from '../Form'
import { Tooltip } from '../Tooltip'

export interface CommentBodyProps {
  createKeyword: (name: string) => Promise<Keyword>
  deleteComment: (id: string, target?: string) => void
  getCollaborator: (id: string) => UserProfile | undefined
  getKeyword: (id: string) => Keyword | undefined
  isNew: boolean
  isReply?: boolean
  listCollaborators: () => UserProfile[]
  listKeywords: () => Keyword[]
  comment: CommentType | UnsavedComment
  saveComment: (comment: CommentType | UnsavedComment) => Promise<CommentType>
  handleCreateReply: (id: string) => void
  scrollIntoHighlight?: (comment: CommentType | UnsavedComment) => void
  onFocusOut?: (id: string, content: string) => boolean
}

export const CommentBody: React.FC<
  CommentBodyProps & {
    setIsEditing: Dispatch<SetStateAction<boolean | undefined>>
    isEditing?: boolean
    isDeleting?: boolean
    isProdNote?: boolean
  }
> = React.memo(
  ({
    comment,
    saveComment,
    deleteComment,
    isReply,
    isNew,
    handleCreateReply,
    setIsEditing,
    scrollIntoHighlight,
    onFocusOut,
    isEditing,
    isProdNote,
  }) => {
    useEffect(() => {
      if (isNew) {
        setIsEditing(true)
      }
    }, [isNew, setIsEditing])

    const cancelEditing = () => {
      setIsEditing(false)
      if (isNew) {
        deleteComment(comment._id)
      }
    }

    return (
      <>
        {isEditing ? (
          <Formik
            initialValues={comment}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true)
              saveComment(values)
              setIsEditing(false)
            }}
          >
            {({ errors, values, setFieldValue }) => (
              <Form>
                {errors.contents && <FormError>{errors.contents}</FormError>}

                <Field name={'contents'}>
                  {(props: FieldProps) => (
                    <CommentContent>
                      <StyledCommentField
                        id={comment._id}
                        autoFocus={isEditing}
                        value={values.contents}
                        onChange={(event) =>
                          setFieldValue(props.field.name, event.target.value)
                        }
                        onBlur={(event) =>
                          onFocusOut &&
                          onFocusOut(comment._id, event.target.value)
                        }
                        placeholder={!isReply ? 'Comment...' : 'Reply...'}
                      />
                    </CommentContent>
                  )}
                </Field>

                <EditingCommentFooter>
                  <Actions>
                    <SecondaryButton onClick={cancelEditing}>
                      Cancel
                    </SecondaryButton>
                    <PrimaryButton
                      disabled={
                        !values.contents.replace(/<[^>]+>/g, '').length ||
                        (!isNew &&
                          (comment.contents === values.contents ||
                            !values.contents.replace(/<[^>]+>/g, '').length))
                      }
                      type="submit"
                    >
                      Save
                    </PrimaryButton>
                  </Actions>
                </EditingCommentFooter>
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            <CommentContent
              onClick={() =>
                scrollIntoHighlight && scrollIntoHighlight(comment)
              }
            >
              <StyledCommentViewer data-cy="note-text">
                {comment.contents}
              </StyledCommentViewer>
            </CommentContent>

            {!isReply && (
              <CommentFooter>
                <span>
                  {/* TODO:: remove hidden props to show reply for comment LEAN-2052 */}
                  <ActionButton
                    hidden={!isProdNote}
                    data-tooltip-id={`reply-${comment._id}`}
                    onClick={() => handleCreateReply(comment._id)}
                    aria-label={'reply'}
                    className="reply-button note-actions"
                  >
                    <AnnotationReply />
                  </ActionButton>
                </span>
                <Tooltip id={`reply-${comment._id}`} place="bottom">
                  Reply
                </Tooltip>
              </CommentFooter>
            )}
          </div>
        )}
      </>
    )
  }
)

const CommentFooter = styled.div`
  margin-bottom: ${(props) => props.theme.grid.unit * 2}px;
  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 2}px 0;
  display: flex;
  justify-content: flex-end;
  height: ${(props) => props.theme.grid.unit * 6}px;
`

const EditingCommentFooter = styled(CommentFooter)`
  justify-content: flex-end;
  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 4}px 0;
`

const ActionButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  &:not([disabled]):hover {
    path {
      stroke: ${(props) => props.theme.colors.brand.medium};
    }
  }
`

const CommentContent = styled.div`
  cursor: pointer;
  padding: 0 ${(props) => props.theme.grid.unit * 4}px;
`

const StyledCommentField = styled.textarea`
  cursor: text;
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.primary};
  margin: ${(props) => props.theme.grid.unit * 2}px 0;
  resize: none;

  width: 100%;
  outline: 0;
  border: 1px solid #e2e2e2;
  border-radius: 6px;

  &:focus {
    background: #f2fbfc;
    border: 1px solid #bce7f6;
    border-radius: 6px;
  }

  .empty-node::before {
    position: absolute;
    color: #c9c9c9;
    cursor: text;
    pointer-events: none;
  }

  box-sizing: border-box;
  padding: 3px 16px 3px 16px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
`

const StyledCommentViewer = styled.div`
  flex: 1;

  font-family: ${(props) => props.theme.font.family.sans};
  line-height: 1.06;
  letter-spacing: -0.2px;
  color: ${(props) => props.theme.colors.text.primary};
  margin: ${(props) => props.theme.grid.unit * 2}px 0;
`

const Actions = styled(ButtonGroup)`
  & button:not(:last-of-type) {
    margin-right: 4px;
  }
`
