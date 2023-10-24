/*!
 * © 2023 Atypon Systems LLC
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
import React from 'react'
import styled from 'styled-components'

import { FileAttachment } from '../../lib/files'
import { Tooltip } from './Tooltip'

export const FileCreatedDate: React.FC<{
  file: FileAttachment
  className?: string
}> = ({ file, className }) => {
  return file.createdDate ? (
    <FileDateContainer
      data-tip="File Uploaded"
      data-for={`${file.id}-created-date`}
      className={className}
    >
      <FileDate>{format(new Date(file.createdDate), 'M/d/yy, HH:mm')}</FileDate>
      <Tooltip
        id={`${file.id}-created-date`}
        place="bottom"
        offset={{ top: 0 }}
        effect="solid"
        className="tooltip"
      >
        File Uploaded
      </Tooltip>
    </FileDateContainer>
  ) : (
    <></>
  )
}

export const FileDateContainer = styled.div`
  overflow: hidden;
  min-width: 88px;
  margin-left: 8px;
`

export const FileDate = styled.div`
  font-size: ${(props) => props.theme.font.size.small};
  line-height: 27px;
`
