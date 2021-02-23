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
import React, { CSSProperties, useState } from 'react'
import { DragElementWrapper, DragSourceOptions } from 'react-dnd'
import styled from 'styled-components'

import DotsIcon from '../../icons/dots-icon'
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
  externalFile: ExternalFile
  title: string
  showAttachmentName: boolean
  showDesignationActions: boolean
  handleDownload: (url: string) => void
  handleReplace: (submissionId: string, file: File, name: string) => void
  changeDesignationHandler: (
    submissionId: string,
    file: File,
    designation: string | undefined
  ) => void
  dragRef?: DragElementWrapper<DragSourceOptions>
  className?: string
  style?: CSSProperties
}

export const FileSectionItem: React.FC<FileSectionItemProps> = ({
  externalFile,
  title,
  showAttachmentName,
  showDesignationActions,
  handleDownload,
  handleReplace,
  changeDesignationHandler,
  dragRef,
  className,
  style,
}) => {
  const [isActionsShown, setIsActionsShown] = useState(false)

  const toggleActionsList = () => {
    setIsActionsShown((prevState) => {
      return !prevState
    })
  }

  const hideActionsList = () => {
    setIsActionsShown(false)
  }

  const fileExtension = externalFile.filename.substring(
    externalFile.filename.lastIndexOf('.') + 1
  )

  const designation = namesWithDesignationMap.get(externalFile.designation)
  const isSubmissionFile = designation === Designation.SubmissionFile

  //todo replace the dummy data for download and replace handlers with correct one after connect the component on real data and its part from this ticket MAN-610.
  return (
    <Item
      ref={dragRef}
      className={className}
      style={style}
      onMouseLeave={hideActionsList}
    >
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
          changeDesignationHandler={changeDesignationHandler}
        />
      </ItemContainer>
      <ActionsContainer>
        <ActionsIcon onClick={toggleActionsList}>
          <DotsIcon />
        </ActionsIcon>
        {isActionsShown && (
          <ItemActions
            replaceAttachmentHandler={() => {
              handleReplace(
                'MPManuscript:valid-manuscript-id-1',
                new File([], 'test.txt'),
                'test.txt'
              )
              hideActionsList()
            }}
            downloadAttachmentHandler={() => {
              handleDownload('https://siam-x5432.ciplit.com')
              hideActionsList()
            }}
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
    right: -3px;
  }
`
export const ActionsIcon = styled.button`
  visibility: hidden;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  &:focus {
    outline: none;
  }
  &:hover svg circle {
    fill: #1a9bc7;
  }
`
export const Item = styled.div`
  display: flex;
  font-family: Lato;
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
  min-width: calc(100% - 4px);
  padding-right: 4px;
  box-sizing: border-box;
`
