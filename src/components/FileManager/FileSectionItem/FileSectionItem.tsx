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
import React, { CSSProperties, Dispatch } from 'react'
import { DragElementWrapper, DragSourceOptions } from 'react-dnd'
import styled from 'styled-components'

import { useDropdown } from '../../../hooks/use-dropdown'
import { DropdownContainer } from '../../Dropdown'
import { CloseOIcon } from '../../icons/'
import DotsIcon from '../../icons/dots-icon'
import { Maybe } from '../../SubmissionInspector/types'
import { ChangeDesignation, FileManagement, Replace } from '../FileManager'
import { Action } from '../FileSectionState'
import { Designation, FileSectionType, namesWithDesignationMap } from '../util'
import { FileInfo } from './FileInfo'
import { FileTypeIcon } from './FileTypeIcon'
import { ItemActions } from './ItemActions'

/**
 * This component will represent individual external file in different tabs,
 * which is contained file-icon, file-designation in other and supplemental tabs, file-name, file title, the file description and etc.
 */

export type SubmissionAttachment = {
  id: string
  name: string
  type: SubmissionAttachmentType
  link: string
}

export type SubmissionAttachmentType = {
  id: string
  label?: Maybe<string> | undefined
}

export interface FileSectionItemProps {
  fileSection: FileSectionType
  externalFile: SubmissionAttachment
  title: string
  showAttachmentName?: boolean
  showDesignationActions?: boolean
  showActions?: boolean
  showReplaceAction?: boolean
  handleDownload?: (url: string) => void
  handleReplace?: Replace
  handleSupplementReplace?: (attachment: SubmissionAttachment) => void
  handleChangeDesignation: ChangeDesignation
  dispatch?: Dispatch<Action>
  dragRef?: DragElementWrapper<DragSourceOptions>
  className?: string
  style?: CSSProperties
  onClose?: () => void
  isEditor?: boolean
}

export const FileSectionItem: React.FC<FileSectionItemProps> = ({
  fileSection,
  externalFile,
  title,
  showAttachmentName = false,
  showDesignationActions = false,
  showReplaceAction = true,
  handleDownload,
  handleReplace,
  handleChangeDesignation,
  handleSupplementReplace,
  dispatch,
  dragRef,
  className,
  style,
  onClose,
  isEditor,
}) => {
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()

  const fileExtension = externalFile.name.substring(
    externalFile.name.lastIndexOf('.') + 1
  )

  const designation = namesWithDesignationMap.get(externalFile.type.label)
  const isMainManuscript = designation === Designation.MainManuscript
  const isSelected = externalFile.id == window.location.hash.substr(1)
  return (
    <Item ref={dragRef} className={className} style={style}>
      <ItemContainer
        onClick={() => {
          window.location.hash =
            isEditor && !isSelected ? `#${externalFile.id}` : '#'
          if (isSelected) {
            window.location.hash = `#${externalFile.id}`
          }
        }}
      >
        <FileTypeIcon
          withDot={isMainManuscript}
          fileExtension={fileExtension}
          alt={externalFile.name}
        />
        <FileInfo
          fileExtension={fileExtension}
          showAttachmentName={showAttachmentName}
          showDesignationActions={showDesignationActions}
          submissionAttachmentName={externalFile.name}
          title={title}
          designation={designation}
          attachmentId={externalFile.id}
          handleChangeDesignation={handleChangeDesignation}
          dispatch={dispatch}
        />
      </ItemContainer>
      {onClose && (
        <IconCloseButton
          onClick={(e) => {
            e.preventDefault()
            onClose()
          }}
        >
          <CloseOIcon color={'#6E6E6E'} />
        </IconCloseButton>
      )}
      {handleDownload && handleReplace && (
        <DropdownContainer ref={wrapperRef}>
          <ActionsIcon
            onClick={toggleOpen}
            type="button"
            aria-label="Download or Replace"
            aria-pressed={isOpen}
          >
            <DotsIcon />
          </ActionsIcon>
          {isOpen && (
            <ItemActions
              fileSection={fileSection}
              replaceAttachmentHandler={handleReplace}
              showReplaceAction={showReplaceAction}
              downloadAttachmentHandler={handleDownload}
              handleSupplementReplace={handleSupplementReplace}
              attachmentId={externalFile.id}
              fileName={externalFile.name}
              designation={externalFile.type.label}
              publicUrl={externalFile.link}
              hideActionList={toggleOpen}
              dispatch={dispatch}
            />
          )}
        </DropdownContainer>
      )}
    </Item>
  )
}

const IconCloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0 8px;
  align-self: flex-start;
  &:hover {
    opacity: 0.5;
  }
`

export const ActionsIcon = styled.button`
  visibility: hidden;
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
export const Item = styled.div`
  display: flex;
  font-family: ${(props) => props.theme.font.family.Lato};
  padding: 20px 15px;
  cursor: pointer;
  box-sizing: border-box;
  width: 100%;
  position: relative;

  &:hover,
  &:focus {
    background: #f2fbfc;
  }

  &:hover ${ActionsIcon} {
    visibility: visible;
  }

  ${DropdownContainer} {
    position: absolute;
    top: 24px;
    right: 0;
    margin-right: 8px;
  }
`
export const ItemContainer = styled.div`
  display: flex;
  min-width: calc(100% - 8px);
  padding-right: 4px;
  box-sizing: border-box;
`
