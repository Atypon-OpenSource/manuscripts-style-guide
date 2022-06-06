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
import { Model } from '@manuscripts/manuscripts-json-schema'
import React, { Dispatch, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { useDropdown } from '../../hooks/use-dropdown'
import getInlineFiles from '../../lib/inlineFiles'
import DotsIcon from '../icons/dots-icon'
import {
  FileDescription,
  FileInfoContainer,
  FileNameTitleContainer,
  FileTitle,
} from './FileSectionItem/FileInfo'
import {
  ActionsIcon,
  Item,
  SubmissionAttachment,
} from './FileSectionItem/FileSectionItem'
import { ItemActions } from './FileSectionItem/ItemActions'
import { Action } from './FileSectionState'
import {
  extensionsWithFileTypesMap,
  FileType,
  fileTypesWithIconMap,
} from './util'

export interface ExternalFileRef {
  url: string
  kind?: string
  ref?: SubmissionAttachment
}

export const InlineFilesSection: React.FC<{
  submissionId: string
  inlineFiles: {
    id: string
    label: string
    type: FileType
    caption?: string
    attachments?: SubmissionAttachment[]
  }[]
  handleReplace: (
    submissionId: string,
    attachmentId: string,
    name: string,
    file: File,
    typeId: string
  ) => Promise<{ data: { uploadAttachment: SubmissionAttachment } }>
  handleDownload: (url: string) => void
  handleUpdateInline?: (
    modelId: string,
    attachment: SubmissionAttachment
  ) => void
  isEditor: boolean
  dispatch: Dispatch<Action>
}> = ({
  submissionId,
  handleReplace,
  handleDownload,
  handleUpdateInline,
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
      const isSelected = id == window.location.hash.substr(1)

      window.location.hash = !isSelected ? `#${id}` : '#'
      if (isSelected) {
        window.location.hash = `#${id}`
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
              <FileReference
                key={attachment.id}
                attachment={attachment}
                submissionId={submissionId}
                handleReplace={handleReplace}
                handleUpdateInline={handleUpdateInline}
                handleDownload={handleDownload}
                dispatch={dispatch}
              />
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
  attachment?: SubmissionAttachment & { modelId?: string }
  submissionId: string
  handleReplace: (
    submissionId: string,
    attachmentId: string,
    name: string,
    file: File,
    typeId: string
  ) => Promise<{ data: { uploadAttachment: SubmissionAttachment } }>
  handleDownload: (url: string) => void
  handleUpdateInline?: (
    modelId: string,
    attachment: SubmissionAttachment
  ) => void
  dispatch: Dispatch<Action>
}> = ({
  attachment,
  submissionId,
  handleReplace,
  handleDownload,
  handleUpdateInline,
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
      {handleDownload && handleReplace && submissionId && (
        <DropdownContainer ref={wrapperRef}>
          <ActionsIcon
            onClick={toggleOpen}
            type="button"
            className={'external_file_dropdown'}
            aria-label="Download or Replace"
            aria-pressed={isOpen}
          >
            <DotsIcon />
          </ActionsIcon>
          {isOpen && (
            <ItemActions
              replaceAttachmentHandler={handleReplace}
              handleUpdateInline={(uploadAttachment: SubmissionAttachment) =>
                handleUpdateInline &&
                attachment?.modelId &&
                handleUpdateInline(attachment.modelId, uploadAttachment)
              }
              downloadAttachmentHandler={handleDownload}
              submissionId={submissionId}
              attachmentId={attachment.id}
              fileName={attachment.name}
              designation={attachment.type.label}
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
`

const Element = styled.div`
  display: flex;
  padding: 20px 15px;
`

const FileReferences = styled.div``

const FileReferenceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
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
