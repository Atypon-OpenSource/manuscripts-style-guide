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
import { Comment, CommentField } from '@manuscripts/comment-editor'
import { Keyword, UserProfile } from '@manuscripts/manuscripts-json-schema'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import { CommentType, UnsavedComment } from '../../lib/comments'
import { ButtonGroup, PrimaryButton, SecondaryButton } from '../Button'
import { FormError } from '../Form'

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
}

export const CommentBody: React.FC<
  CommentBodyProps & {
    setIsEditing: Dispatch<SetStateAction<boolean | undefined>>
    isEditing?: boolean
    isDeleting?: boolean
  }
> = React.memo(
  ({
    createKeyword,
    comment,
    getCollaborator,
    getKeyword,
    listCollaborators,
    listKeywords,
    saveComment,
    deleteComment,
    isReply,
    isNew,
    handleCreateReply,
    setIsEditing,
    isEditing,
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
                        autoFocus={isEditing}
                        value={values.contents}
                        handleChange={(data: string) =>
                          setFieldValue(props.field.name, data)
                        }
                        createKeyword={createKeyword}
                        listCollaborators={listCollaborators}
                        listKeywords={listKeywords}
                      />
                    </CommentContent>
                  )}
                </Field>

                <EditingCommentFooter>
                  <Actions>
                    <SecondaryButton onClick={cancelEditing}>
                      Cancel
                    </SecondaryButton>
                    <PrimaryButton type="submit">Save</PrimaryButton>
                  </Actions>
                </EditingCommentFooter>
              </Form>
            )}
          </Formik>
        ) : (
          <div>
            <CommentContent>
              <StyledCommentViewer
                value={comment.contents}
                getCollaborator={getCollaborator}
                getKeyword={getKeyword}
              />
            </CommentContent>

            {!isReply && (
              <CommentFooter>
                <span>
                  <ActionButton
                    data-tip={true}
                    data-for={`reply-${comment._id}`}
                    onClick={() => handleCreateReply(comment._id)}
                    aria-label={'reply'}
                    className="reply-button note-actions"
                  >
                    <AnnotationReply />
                  </ActionButton>
                </span>
                <ReactTooltip
                  id={`reply-${comment._id}`}
                  place="bottom"
                  effect="solid"
                  offset={{ top: 10 }}
                  className="tooltip"
                >
                  Reply
                </ReactTooltip>
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
  padding: 0 ${(props) => props.theme.grid.unit * 4}px;
`

const StyledCommentField = styled(CommentField)`
  flex: 1;

  & .ProseMirror {
    cursor: text;
    font-family: ${(props) => props.theme.font.family.sans};
    line-height: 1.06;
    letter-spacing: -0.2px;
    color: ${(props) => props.theme.colors.text.primary};
    margin: ${(props) => props.theme.grid.unit * 2}px 0;
    padding: ${(props) => props.theme.grid.unit}px;

    & p:first-child {
      margin-top: 0;
    }

    & p:last-child {
      margin-bottom: 0;
    }

    & blockquote {
      margin: ${(props) => props.theme.grid.unit * 2}px 0;
      border-left: ${(props) => props.theme.grid.unit}px solid #faed98;
      padding-left: 1em;
      font-size: ${(props) => props.theme.font.size.small};
      font-style: italic;
      line-height: 1.17;
      letter-spacing: -0.2px;
      color: #bababa;
    }
  }
`

const StyledCommentViewer = styled(Comment)`
  flex: 1;

  & .ProseMirror {
    font-family: ${(props) => props.theme.font.family.sans};
    line-height: 1.06;
    letter-spacing: -0.2px;
    color: ${(props) => props.theme.colors.text.primary};
    margin: ${(props) => props.theme.grid.unit * 2}px 0;

    & p:first-child {
      margin-top: 0;
    }

    & p:last-child {
      margin-bottom: 0;
    }

    & blockquote {
      margin: 10px 0;
      border-left: 4px solid #faed98;
      padding-left: 1em;
      font-size: ${(props) => props.theme.font.size.small};
      font-style: italic;
      line-height: 1.17;
      letter-spacing: -0.2px;
      color: #bababa;
    }
  }
`

const Actions = styled(ButtonGroup)`
  & button:not(:last-of-type) {
    margin-right: 4px;
  }
`
