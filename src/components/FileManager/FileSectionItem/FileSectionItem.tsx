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
import { ExternalFile } from '@manuscripts/manuscripts-json-schema'
import React, { CSSProperties, Dispatch, useCallback, useState } from 'react'
import { DragElementWrapper, DragSourceOptions } from 'react-dnd'
import styled from 'styled-components'

import { useDropdown } from '../../../hooks/use-dropdown'
import DotsIcon from '../../icons/dots-icon'
import { Action } from '../FileSectionState'
import { ActionsBox } from '../ItemsAction'
import { Designation, namesWithDesignationMap } from '../util'
import { FileInfo } from './FileInfo'
import { FileTypeIcon } from './FileTypeIcon'
import { ItemActions } from './ItemActions'

/**
 * This component will represent individual external file in different tabs,
 * which is contained file-icon, file-designation in other and supplemental tabs, file-name, file title, the file description and etc.
 */
export interface FileSectionItemProps {
  submissionId: string
  externalFile: ExternalFile
  title: string
  showAttachmentName: boolean
  showDesignationActions: boolean
  handleDownload: (url: string) => void
  handleReplace: (
    submissionId: string,
    name: string,
    file: File,
    typeId: string
  ) => Promise<boolean>
  handleChangeDesignation: (
    submissionId: string,
    typeId: string,
    name: string
  ) => Promise<boolean>
  dispatch: Dispatch<Action>
  dragRef?: DragElementWrapper<DragSourceOptions>
  className?: string
  style?: CSSProperties
}

export const FileSectionItem: React.FC<FileSectionItemProps> = ({
  submissionId,
  externalFile,
  title,
  showAttachmentName,
  showDesignationActions,
  handleDownload,
  handleReplace,
  handleChangeDesignation,
  dispatch,
  dragRef,
  className,
  style,
}) => {
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()

  const fileExtension = externalFile.filename.substring(
    externalFile.filename.lastIndexOf('.') + 1
  )

  const designation = namesWithDesignationMap.get(externalFile.designation)
  const isSubmissionFile = designation === Designation.SubmissionFile

  return (
    <Item ref={dragRef} className={className} style={style}>
      <ItemContainer>
        <FileTypeIcon
          withDot={isSubmissionFile}
          fileExtension={fileExtension}
          alt={externalFile.filename}
        />
        <FileInfo
          fileExtension={fileExtension}
          showAttachmentName={showAttachmentName}
          showDesignationActions={showDesignationActions}
          submissionAttachmentName={externalFile.filename}
          title={title}
          designation={designation}
          description={externalFile.description}
          handleChangeDesignation={handleChangeDesignation}
          submissionId={submissionId}
          dispatch={dispatch}
        />
      </ItemContainer>
      <ActionsContainer ref={wrapperRef}>
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
            replaceAttachmentHandler={handleReplace}
            downloadAttachmentHandler={handleDownload}
            submissionId={submissionId}
            fileName={externalFile.filename}
            designation={externalFile.designation}
            publicUrl={externalFile.publicUrl}
            hideActionList={toggleOpen}
          />
        )}
      </ActionsContainer>
    </Item>
  )
}

export const ActionsContainer = styled.div`
  position: relative;
  & ${ActionsBox} {
    position: absolute;
    top: 24px;
    right: 0px;
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
`
export const ItemContainer = styled.div`
  display: flex;
  min-width: calc(100% - 8px);
  padding-right: 4px;
  box-sizing: border-box;
`
