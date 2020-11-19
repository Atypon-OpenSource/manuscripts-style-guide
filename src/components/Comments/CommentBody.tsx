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
import AnnotationEdit from '@manuscripts/assets/react/AnnotationEdit'
import AnnotationRemove from '@manuscripts/assets/react/AnnotationRemove'
import AnnotationReply from '@manuscripts/assets/react/AnnotationReply'
import { Comment, CommentField } from '@manuscripts/comment-editor'
import { Keyword, UserProfile } from '@manuscripts/manuscripts-json-schema'
import { Field, FieldProps, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { CommentType } from '../../lib/comments'
import { ButtonGroup, PrimaryButton, SecondaryButton } from '../Button'
import { FormError } from '../Form'

interface Props {
  createKeyword: (name: string) => Promise<Keyword>
  deleteComment: (comment: CommentType) => void
  getCollaborator: (id: string) => UserProfile | undefined
  getKeyword: (id: string) => Keyword | undefined
  isNew: boolean
  isReply?: boolean
  listCollaborators: () => UserProfile[]
  listKeywords: () => Keyword[]
  comment: CommentType
  saveComment: (comment: CommentType) => Promise<CommentType>
  setCommentTarget: (commentTarget?: string) => void
}

export const CommentBody: React.FC<Props> = React.memo(
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
    setCommentTarget,
  }) => {
    useEffect(() => {
      if (isNew) {
        setIsEditing(true)
      }
    }, [isNew])

    const [isDeleting, setIsDeleting] = useState<boolean>()
    const [isEditing, setIsEditing] = useState<boolean>()

    const handleDeleteComment = () => {
      setIsDeleting(true)
      deleteComment(comment)
    }

    const cancelEditing = () => {
      setIsEditing(false)
      if (isNew) {
        deleteComment(comment)
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

            <CommentFooter>
              <span>
                <ActionButton
                  onClick={() => setIsEditing(true)}
                  title={'Edit comment'}
                >
                  <AnnotationEdit />
                </ActionButton>
                {!isReply && (
                  <ActionButton
                    onClick={() => setCommentTarget(comment._id)}
                    title={'Reply'}
                  >
                    <AnnotationReply />
                  </ActionButton>
                )}
              </span>

              <span>
                <ActionButton
                  onClick={handleDeleteComment}
                  title={'Delete comment'}
                  disabled={isDeleting}
                >
                  <AnnotationRemove />
                </ActionButton>
              </span>
            </CommentFooter>
          </div>
        )}
      </>
    )
  }
)

const CommentFooter = styled.div`
  border-top: 1px solid #eee;
  margin-top: ${(props) => props.theme.grid.unit * 4}px;
  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 2}px 0;
  display: flex;
  justify-content: space-between;
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
  height: ${(props) => props.theme.grid.unit * 6}px;
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

    &:focus {
      outline: none;
    }

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

    &:focus {
      outline: none;
    }

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
