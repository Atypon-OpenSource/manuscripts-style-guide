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

import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { useDropdown } from '../../hooks/use-dropdown'
import { Capabilities } from '../../lib/capabilities'
import { IconTextButton } from '../Button'
import { DropdownButton, DropdownContainer, DropdownList } from '../Dropdown'
import DotsIcon from '../icons/dots-icon'
import { ResolveButton } from './ResolveButton'

export const CommentActions: React.FC<{
  id: string
  target: string
  can?: Capabilities
  isResolved?: boolean
  isOwnComment: boolean
  handleSetResolved?: () => void
  deleteComment: (id: string, target?: string) => void
  setIsEditing: Dispatch<SetStateAction<boolean | undefined>>
  isProdNote?: boolean
}> = ({
  id,
  target,
  can,
  isResolved,
  handleSetResolved,
  deleteComment,
  setIsEditing,
  isOwnComment,
  isProdNote,
}) => {
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()

  const handleRequestEdit = useCallback(() => {
    setIsEditing(true)
  }, [setIsEditing])
  const handleRequestDelete = useCallback(
    () => deleteComment(id, target),
    [deleteComment, id, target]
  )

  const canResolve = useMemo(() => {
    if (!isProdNote) {
      return (
        (isOwnComment && can?.resolveOwnComment) || can?.resolveOthersComment
      )
    }
    return can?.handleNotes
  }, [isProdNote, isOwnComment, can])

  const canHandle = useMemo(() => {
    if (!isProdNote) {
      return (
        (isOwnComment && can?.handleOwnComments) || can?.handleOthersComments
      )
    }
    return can?.handleNotes
  }, [isProdNote, isOwnComment, can])

  return (
    <Container>
      {canResolve && handleSetResolved && (
        <ResolveButton
          id={id}
          resolved={isResolved}
          resolvedCallback={handleSetResolved}
          aria-label={'resolve comment'}
        />
      )}
      {canHandle && (
        <DropdownContainer ref={wrapperRef}>
          <ActionDropdownButton
            onClick={toggleOpen}
            className="note-actions"
            aria-label={'actions list'}
          >
            <DotsIcon />
          </ActionDropdownButton>
          {isOpen && (
            <DropdownList
              direction={'right'}
              width={125}
              height={96}
              onClick={toggleOpen}
            >
              <ActionButton onClick={handleRequestEdit}>Edit</ActionButton>
              <ActionButton onClick={handleRequestDelete}>Delete</ActionButton>
            </DropdownList>
          )}
        </DropdownContainer>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: ${(props) => props.theme.grid.unit * 6}px;
`

const ActionButton = styled(IconTextButton)`
  display: inline-block;
  text-align: left;
  padding-left: ${(props) => props.theme.grid.unit * 4}px;
`

const ActionDropdownButton = styled(DropdownButton)`
  &:not([disabled]):focus {
    circle {
      fill: ${(props) => props.theme.colors.brand.medium};
    }
    opacity: 1;
  }
  margin-left: ${(props) => props.theme.grid.unit}px;
`
