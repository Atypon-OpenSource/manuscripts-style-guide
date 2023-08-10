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
import styled from 'styled-components'

import { useDropdown } from '../../hooks/use-dropdown'
import DotsIcon from '../icons/dots-icon'
import { Replace } from './FileManager'
import {
  FileInfoContainer,
  FileNameTitleContainer,
  FileTitle,
} from './FileSectionItem/FileInfo'
import {
  ActionsIcon,
  FileAttachment,
  Item,
} from './FileSectionItem/FileSectionItem'
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
    <div>
      {inlineFiles.map((file, index) => (
        <ElementItem
          className={'item'}
          key={index}
          id={file.id}
          onClick={onElementClick}
        >
          <FileReferences className={'refItems'}>
            {file.attachments?.map((attachment) => (
              <>
                <FileReference
                  key={attachment.id}
                  attachment={attachment}
                  handleReplace={handleReplace}
                  handleUpdateInline={handleUpdateInline}
                  handleDetachFile={handleDetachFile}
                  handleDownload={handleDownload}
                  dispatch={dispatch}
                />
              </>
            ))}
          </FileReferences>
          <Element className={'element'}>
            {fileTypesWithIconMap.get(file.type)}
            <FileInfoContainer>
              <FileNameTitleContainer>
                <FileTitle>{file.label}</FileTitle>
              </FileNameTitleContainer>
            </FileInfoContainer>
          </Element>
        </ElementItem>
      ))}
    </div>
  )
}

const FileReference: React.FC<{
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
    <FileReferenceItem key={attachment.id}>
      <Container>
        {fileTypesWithIconMap.get(
          extensionsWithFileTypesMap.get(fileExtension)
        )}
        <FileReferenceName>{attachment.name}</FileReferenceName>
      </Container>
      {attachment.createdDate && (
        <FileDateContainer>
          <FileDate>{format(attachment.createdDate, 'M/d/yy HH:mm')}</FileDate>
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
    </FileReferenceItem>
  )
}
export const FileDateContainer = styled.div`
  overflow: hidden;
  display: none;
  width: 50%;
`
const ElementItem = styled(Item)`
  display: flex;
  // this will allow us to select the previous sibling node,
  // to change the background on the hover for adjacent node
  flex-direction: column-reverse;
  padding: 0;

  :hover {
    background: #f2fbfc;
  }

  .refItems:hover ~ .element {
    background: white !important;
  }
  &:hover ${FileDateContainer} {
    display: flex;
  }

  .refItems:hover {
    background: white !important;
  }

  border-bottom: 1px dashed #f0f0f0;

  :last-child {
    border-bottom: 0;
  }
`

const Container = styled.div`
  display: flex;
  width: 100%;
`
const Element = styled.div`
  display: flex;
  padding: 20px 15px;
`

const FileReferences = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const FileReferenceItem = styled.div`
  display: flex;
  width: 100%;
  align-items: space;
  justify-content: space-between;
  width: 100% svg {
    width: 14px;
    height: 17px;
  }

  path {
    fill: #6e6e6e;
  }

  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 4}px;

  :hover {
    background: #f2fbfc;
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
  :last-child {
    margin-bottom: 25px;
  }
`

const FileReferenceName = styled.div`
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
