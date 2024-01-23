/*!
 * © 2021 Atypon Systems LLC
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
import React, { ChangeEvent, useContext, useRef, useState } from 'react'
import styled from 'styled-components'

import { useDropdown } from '../../hooks/use-dropdown'
import { Category, Dialog } from '../Dialog'
import { DropdownContainer, DropdownList } from '../Dropdown'
import DotsIcon from '../icons/dots-icon'
import { Move, PermissionsContext, Replace } from './FileManager'
import { FileSectionType } from './util'

/**
 * This component represents the drop-down list action for each file item.
 */
export const FileActions: React.FC<{
  sectionType: FileSectionType
  handleDownload?: () => void
  handleReplace?: Replace
  handleDetach?: () => void
  move?: Move
  className?: string
}> = ({
  sectionType,
  handleDownload,
  handleReplace,
  handleDetach,
  move,
  className,
}) => {
  const can = useContext(PermissionsContext)

  const { isOpen, toggleOpen, wrapperRef } = useDropdown()
  const [isMoveDialogOpen, setMoveDialogOpen] = useState<boolean>(false)

  const showDownload = can?.downloadFiles && handleDownload
  const showReplace = can?.replaceFile && handleReplace
  const showDetach = can?.editArticle && handleDetach
  const showMove = can?.moveFile && move

  const show = showDownload || showReplace || showDetach || showMove

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (handleReplace && event && event.target && event.target.files) {
      const file = event.target.files[0]
      await handleReplace(file)
    }
  }

  const openFileDialog = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return show ? (
    <DropdownContainer ref={wrapperRef}>
      <ActionsIcon
        onClick={toggleOpen}
        type="button"
        className="show-on-hover"
        aria-label="Actions"
        aria-pressed={isOpen}
      >
        <DotsIcon />
      </ActionsIcon>
      {isOpen && (
        <FileActionDropdownList
          data-cy="file-actions-dropdown"
          direction="right"
          className={className}
          width={192}
          top={5}
          onClick={toggleOpen}
        >
          {showDownload && (
            <FileAction onClick={handleDownload}>Download</FileAction>
          )}
          {showReplace && (
            <>
              <FileAction onClick={openFileDialog}>Replace</FileAction>
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleChange}
              />
            </>
          )}
          {showDetach && <FileAction onClick={handleDetach}>Detach</FileAction>}
          {showMove && (
            <FileAction onClick={() => setMoveDialogOpen(true)}>
              Move to {move.sectionType}
            </FileAction>
          )}
        </FileActionDropdownList>
      )}
      {showMove && (
        <MoveFileConfirmationDialog
          data-cy="file-move-confirm-dialog"
          isOpen={isMoveDialogOpen}
          close={() => setMoveDialogOpen(false)}
          source={sectionType}
          target={move.sectionType}
          handleMove={move.handler}
        />
      )}
    </DropdownContainer>
  ) : (
    <></>
  )
}

const MoveFileConfirmationDialog: React.FC<{
  isOpen: boolean
  close: () => void
  source: FileSectionType
  target: FileSectionType
  handleMove: () => Promise<void>
}> = ({ isOpen, close, source, target, handleMove }) => {
  const header = `Are you sure you want to move this file to “${target}”?`
  const message = `The file will be removed from “${source}” and added to “${target}”.`

  const handleConfirm = async () => {
    await handleMove()
    close()
  }

  return (
    <Dialog
      isOpen={isOpen}
      category={Category.confirmation}
      header={header}
      message={message}
      actions={{
        primary: {
          action: handleConfirm,
          title: 'Move',
        },
        secondary: {
          action: () => close(),
          title: 'Cancel',
        },
      }}
    />
  )
}

export const ActionsIcon = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0 8px;
  &:focus {
    outline: none;
  }
  &:hover svg circle {
    fill: #1a9bc7;
  }
`

export const FileActionDropdownList = styled(DropdownList)`
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  min-width: 180px;
  background: ${(props) => props.theme.colors.background.primary};
  z-index: 999;
  text-align: left;
  overflow: hidden;
`

export const FileAction = styled.div`
  font-family: ${(props) => props.theme.font.family.Lato};
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.text.primary};
  padding: 16px;
  &:hover,
  &:focus {
    background: #f2fbfc;
  }
`
