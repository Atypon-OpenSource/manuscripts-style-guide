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
import React, { CSSProperties, useState } from 'react'
import { DragElementWrapper, DragSourceOptions } from 'react-dnd'
import styled from 'styled-components'

import { DesignationActions } from './DesignationActions'
import { FileInfoContainer, FileName, FileNameContainer } from './FileInfo'
import {
  ActionsContainer,
  ActionsIcon,
  Item,
  ItemContainer,
} from './FileSectionItem'
import { FileTypeIcon } from './FileTypeIcon'
import { ProgressBarUploadItem } from './ProgressBarUploadItem'

export interface FileSectionItemProps {
  fileName: string
  isLoading: boolean
  submissionId: string
  dragRef?: DragElementWrapper<DragSourceOptions>
  className?: string
  style?: CSSProperties
}

/**
 * This component will represent the upload item.
 */
export const FileSectionUploadItem: React.FC<FileSectionItemProps> = ({
  fileName,
  isLoading,
  submissionId,
  dragRef,
  className,
  style,
}) => {
  const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1)
  fileName = fileName.substring(0, fileName.lastIndexOf('.'))

  return (
    <Item ref={dragRef} className={className} style={style}>
      <UploadItemContainer>
        <FileTypeIcon withDot={false} />
        <FileInfoContainer>
          <FileNameContainer>
            <FileName>{fileName}</FileName>
            <div>.{fileExtension}</div>
          </FileNameContainer>
          {isLoading && <ProgressBarUploadItem />}
        </FileInfoContainer>
      </UploadItemContainer>
    </Item>
  )
}

export const UploadItemContainer = styled(ItemContainer)`
  min-width: calc(100% - 16px);
`
export const IconButton = styled(ActionsIcon)`
  visibility: visible;
`
export const ProgressBarContainer = styled.div`
  background: #e2e2e2;
  opacity: 0.7;
  border-radius: 8px;
  width: 100%;
  height: 4px;
  margin-top: 8px;
`
export const ProgressBar = styled.div`
  background: #1a9bc7;
  opacity: 0.7;
  border-radius: 8px 0px 0px 8px;
  width: 20%;
  height: 100%;
`
