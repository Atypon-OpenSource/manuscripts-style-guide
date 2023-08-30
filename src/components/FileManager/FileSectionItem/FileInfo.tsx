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
import React, { Dispatch, useContext } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import { PermissionsContext } from '../FileManager'
import { Action } from '../FileSectionState'
import { TooltipDiv } from '../TooltipDiv'

export const FileInfo: React.FC<{
  showAttachmentName: boolean
  title: string
  fileAttachmentName: string
  fileExtension: string
  attachmentId: string
  fileCreatedDate: Date
  dispatch?: Dispatch<Action>
}> = ({
  showAttachmentName,
  title,
  fileAttachmentName,
  fileExtension,
  attachmentId,
  dispatch,
  fileCreatedDate,
}) => {
  const fileName = fileAttachmentName.substring(
    0,
    fileAttachmentName.lastIndexOf('.')
  )

  const can = useContext(PermissionsContext)
  fileCreatedDate = new Date()
  console.log(fileCreatedDate)
  return (
    <FileInfoContainer>
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
        {fileCreatedDate && (
          <FileDateContainer data-tip="tooltip-content">
            <FileDate>
              {format(new Date(fileCreatedDate), 'M/d/yy, HH:mm')}
            </FileDate>
            <TooltipDiv>
              <ReactTooltip
                place="bottom"
                offset={{ top: 0 }}
                effect="solid"
                className="tooltip"
              >
                <div>File uploaded</div>
              </ReactTooltip>
            </TooltipDiv>
          </FileDateContainer>
        )}
      </FileNameTitleContainer>
    </FileInfoContainer>
  )
}
export const FileDateContainer = styled.div`
  line-height: 20px;
  overflow: hidden;
  width: 100%;
  display: none;
  justify-content: flex-end;
`
export const FileInfoContainer = styled.div`
  margin-left: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;

  &:hover ${FileDateContainer} {
    display: flex;
  }
`
export const FileNameTitleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: baseline;
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
  width: 50px;
`
export const FileDate = styled.div`
  font-size: font-size: ${(props) => props.theme.font.size.small};
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
