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
import React, { Dispatch, useContext } from 'react'
import styled from 'styled-components'

import { PermissionsContext } from '../FileManager'
import { Action } from '../FileSectionState'
import { Designation } from '../util'
import { DesignationActions } from './DesignationActions'

export const FileInfo: React.FC<{
  showAttachmentName: boolean
  showDesignationActions: boolean
  title: string
  submissionAttachmentName: string
  fileExtension: string
  designation?: Designation
  attachmentId: string
  handleChangeDesignation: (
    attachmentId: string,
    typeId: string,
    name: string
  ) => Promise<boolean>
  dispatch?: Dispatch<Action>
}> = ({
  showAttachmentName,
  showDesignationActions,
  title,
  submissionAttachmentName,
  fileExtension,
  designation,
  attachmentId,
  handleChangeDesignation,
  dispatch,
}) => {
  const fileName = submissionAttachmentName.substring(
    0,
    submissionAttachmentName.lastIndexOf('.')
  )

  const can = useContext(PermissionsContext)

  return (
    <FileInfoContainer>
      {showDesignationActions && designation !== undefined && (
        <DesignationActions
          designation={designation}
          attachmentId={attachmentId}
          fileExtension={fileExtension}
          handleChangeDesignation={handleChangeDesignation}
          fileName={submissionAttachmentName}
          dispatch={dispatch}
          can={can}
        />
      )}
      <FileNameTitleContainer>
        <FileTitle>
          {!showAttachmentName ? fileName : title}
          {showAttachmentName && ':'}
        </FileTitle>
        {showAttachmentName && (
          <FileNameContainer>
            <FileName>{fileName}</FileName>
            <div>.{fileExtension}</div>
          </FileNameContainer>
        )}
      </FileNameTitleContainer>
    </FileInfoContainer>
  )
}

export const FileInfoContainer = styled.div`
  margin-left: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`
export const FileNameTitleContainer = styled.div`
  display: flex;
  width: 100%;
`
export const FileTitle = styled.div`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  margin-right: 4px;
  white-space: nowrap;
`
export const FileNameContainer = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  overflow: hidden;
  width: 100%;
`
export const FileName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`
export const FileDescription = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 14px;
  line-height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`
