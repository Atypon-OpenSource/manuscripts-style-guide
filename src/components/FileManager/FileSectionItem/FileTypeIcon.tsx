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
import React from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import UnknownFormatFileIcon from '../../icons/unknown-format-file-icon'
import { TooltipDiv } from '../TooltipDiv'
import { extensionsWithFileTypesMap, fileTypesWithIconMap } from '../util'

/**
 * Each file item has an icon to represent besides the file info based on the file extension,
 * in case the file type is an image or video then the icon should be the preview image or video thumbnail.
 */
export const FileTypeIcon: React.FC<{
  withDot: boolean
  fileExtension?: string
  alt?: string
}> = ({ withDot, fileExtension, alt }) => {
  let fileIcon: JSX.Element | undefined = <UnknownFormatFileIcon />

  if (fileExtension) {
    const fileType = extensionsWithFileTypesMap.get(fileExtension.toLowerCase())

    fileIcon = fileTypesWithIconMap.get(fileType)
  }

  return (
    <Container>
      {withDot && <Dot data-for="dot" data-tip={true} />}
      <TooltipDiv>
        <ReactTooltip
          id="dot"
          place="bottom"
          offset={{ bottom: -7 }}
          effect="solid"
          className="tooltip"
        >
          <div>Submission File. Only one file per submission</div>
        </ReactTooltip>
      </TooltipDiv>
      {fileIcon}
    </Container>
  )
}

const Container = styled.div`
  width: 40px;
  min-width: 40px;
  height: 40px;
  background-color: ${(props) => props.theme.colors.background.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f2f2f2;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
`
const Dot = styled.div`
  width: 12px;
  height: 12px;
  background: #1a9bc7;
  border: 2px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  top: -8px;
  left: -8px;
`
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`
const VideoIconContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`
