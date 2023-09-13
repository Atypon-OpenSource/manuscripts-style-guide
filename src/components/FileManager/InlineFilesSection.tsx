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
import { format } from 'date-fns'
import React, { Dispatch, useCallback } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import { useDropdown } from '../../hooks/use-dropdown'
import DotsIcon from '../icons/dots-icon'
import { Replace } from './FileManager'
import { ActionsIcon, FileAttachment } from './FileSectionItem/FileSectionItem'
import { ItemActions } from './FileSectionItem/ItemActions'
import { Action } from './FileSectionState'
import {
  extensionsWithFileTypesMap,
  FileSectionType,
  FileType,
  fileTypesWithIconMap,
} from './util'

const trackedJoint = ':dataTracked:'

export const InlineFilesSection: React.FC<{
  inlineFiles: {
    id: string
    label: string
    type: FileType
    caption?: string
    attachments?: FileAttachment[]
  }[]
  handleReplace: Replace
  handleDownload: (url: string) => void
  handleUpdateInline?: (modelId: string, attachment: FileAttachment) => void
  handleDetachFile?: (attachmentLink: string, modelId: string) => void
  isEditor: boolean
  dispatch: Dispatch<Action>
}> = ({
  handleReplace,
  handleDownload,
  handleUpdateInline,
  handleDetachFile,
  inlineFiles,
  isEditor,
  dispatch,
}) => {
  const onElementClick = useCallback(
    (e) => {
      if (!isEditor) {
        return
      }
      const { id } = e.currentTarget
      const clearedId = id.split(trackedJoint)[0]
      const isSelected = clearedId == window.location.hash.substr(1)

      window.location.hash = !isSelected ? `#${clearedId}` : '#'
      if (isSelected) {
        window.location.hash = `#${clearedId}`
      }
    },
    [isEditor]
  )

  return (
    <>
      {inlineFiles.map((file, index) => (
        <Element
          className={'element'}
          key={index}
          id={file.id}
          onClick={onElementClick}
        >
          <ElementHeader>
            {fileTypesWithIconMap.get(file.type)}
            <ElementName>{file.label}</ElementName>
          </ElementHeader>
          <ElementFiles className={'element-files'}>
            {file.attachments?.map((attachment) => (
              <ElementFile
                key={attachment.id}
                attachment={attachment}
                handleReplace={handleReplace}
                handleUpdateInline={handleUpdateInline}
                handleDetachFile={handleDetachFile}
                handleDownload={handleDownload}
                dispatch={dispatch}
              />
            ))}
          </ElementFiles>
        </Element>
      ))}
    </>
  )
}

const ElementFile: React.FC<{
  attachment?: FileAttachment & { modelId?: string }
  handleReplace: (
    attachmentId: string,
    name: string,
    file: File
  ) => Promise<boolean | FileAttachment | undefined>
  handleDetachFile?: (attachmentLink: string, modelId: string) => void
  handleDownload: (url: string) => void
  handleUpdateInline?: (modelId: string, attachment: FileAttachment) => void
  dispatch: Dispatch<Action>
}> = ({
  attachment,
  handleReplace,
  handleDownload,
  handleUpdateInline,
  handleDetachFile,
  dispatch,
}) => {
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()

  if (!attachment || !attachment.name) {
    return null
  }

  const fileExtension = attachment.name.substring(
    attachment.name.lastIndexOf('.') + 1
  )

  return (
    <ElementFileContainer key={attachment.id} className={'element-file'}>
      <ElementFileHeader>
        {fileTypesWithIconMap.get(
          extensionsWithFileTypesMap.get(fileExtension)
        )}
        <ElementFileName>{attachment.name}</ElementFileName>
      </ElementFileHeader>
      {attachment.createdDate && (
        <FileDateContainer data-tip="tooltip-content">
          <FileDate>
            {format(new Date(attachment.createdDate), 'M/d/yy, HH:mm')}
          </FileDate>
          <ReactTooltip
            place="bottom"
            offset={{ top: 0 }}
            effect="solid"
            className="tooltip"
          >
            File Uploaded
          </ReactTooltip>
        </FileDateContainer>
      )}
      {handleDownload && handleReplace && (
        <DropdownContainer ref={wrapperRef}>
          <ActionsIcon
            onClick={toggleOpen}
            type="button"
            className={'external_file_dropdown'}
            aria-label="Download or Replace or Detach"
            aria-pressed={isOpen}
          >
            <DotsIcon />
          </ActionsIcon>
          {isOpen && (
            <ItemActions
              fileSection={FileSectionType.Inline}
              replaceAttachmentHandler={handleReplace}
              showReplaceAction={true}
              handleUpdateInline={(uploadAttachment: FileAttachment) =>
                handleUpdateInline &&
                attachment?.modelId &&
                handleUpdateInline(attachment.modelId, uploadAttachment)
              }
              detachAttachmnetHandler={() =>
                handleDetachFile &&
                attachment.modelId &&
                handleDetachFile(attachment.id, attachment.modelId)
              }
              downloadAttachmentHandler={handleDownload}
              attachmentId={attachment.id}
              fileName={attachment.name}
              publicUrl={attachment.link}
              hideActionList={toggleOpen}
              dispatch={dispatch}
              dropDownClassName={'ref_item_dropdown'}
            />
          )}
        </DropdownContainer>
      )}
    </ElementFileContainer>
  )
}

export const FileDateContainer = styled.div`
  overflow: hidden;
  display: none;
`

const Element = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;

  border-bottom: 1px dashed #f0f0f0;

  :last-child {
    border-bottom: 0;
  }
`

const ElementHeader = styled.div`
  display: flex;
  padding: 20px 16px;
`

const ElementName = styled.div`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;
  margin-left: ${(props) => props.theme.grid.unit * 2}px;
`

const ElementFileHeader = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`

const ElementFiles = styled.div`
  width: 100%;
  > :last-child {
    margin-bottom: 25px;
  }
`

const ElementFileContainer = styled.div`
  display: flex;
  font-family: ${(props) => props.theme.font.family.Lato};
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  padding: 8px 16px;
  height: 40px;

  &:hover ${FileDateContainer} {
    display: block;
  }

  path {
    fill: #6e6e6e;
  }

  &:hover,
  &:focus {
    background: #f2fbfc;
  }

  &:hover ${ActionsIcon} {
    visibility: visible;
  }

  .external_file_dropdown {
    opacity: 0;
  }

  :hover .external_file_dropdown {
    opacity: 1;
  }

  .ref_item_dropdown {
    top: 65%;
    right: 10px;
    width: 180px;
  }
`

const ElementFileName = styled.div`
  font-family: ${(props) => props.theme.font.family.Lato};
  font-size: ${(props) => props.theme.font.size.medium};
  line-height: ${(props) => props.theme.font.lineHeight.large};
  font-weight: ${(props) => props.theme.font.weight.normal};
  color: ${(props) => props.theme.colors.text.primary};
  margin-left: ${(props) => props.theme.grid.unit * 2}px;
`

const DropdownContainer = styled.div`
  position: relative;
`

export const FileDate = styled.div`
  font-size: ${(props) => props.theme.font.size.small};
  line-height: 27px;
`
