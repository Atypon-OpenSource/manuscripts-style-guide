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
import React from 'react'
import styled from 'styled-components'

import { AlertMessage, AlertMessageType } from '../AlertMessage'
import UnknownFormatFileIcon from '../icons/unknown-format-file-icon'
import { FileContainer } from './FileContainer'
import { FileNameText } from './FileName'

export const FileUploadState: React.FC<{
  state: { name: string; status: string }
}> = ({ state }) => {
  return (
    <>
      {state.status === 'in-progress' && (
        <FileUploadInProgress name={state.name} />
      )}
      {state.status === 'success' && <FileUploadSuccess />}
    </>
  )
}

const FileUploadInProgress: React.FC<{
  name: string
}> = ({ name }) => {
  return (
    <FileUploadContainer>
      <UnknownFormatFileIcon />
      <FileUploadNameContainer>
        <UploadFileNameText>{name}</UploadFileNameText>
        <FileUploadProgressBar />
      </FileUploadNameContainer>
    </FileUploadContainer>
  )
}

const FileUploadSuccess: React.FC = () => {
  return (
    <AlertMessageContainer>
      <AlertMessage
        type={AlertMessageType.success}
        hideCloseButton={true}
        dismissButton={{
          text: 'OK',
        }}
      >
        File uploaded successfully
      </AlertMessage>
    </AlertMessageContainer>
  )
}

const AlertMessageContainer = styled.div`
  margin-left: 16px;
  margin-right: 16px;
`

const FileUploadContainer = styled(FileContainer)`
  background: #f2fbfc;
`

const FileUploadNameContainer = styled.div`
  flex-grow: 1;
  margin-left: 8px;
`

const UploadFileNameText = styled(FileNameText)`
  margin: 0;
`

const FileUploadProgressBar: React.FC = () => {
  return (
    <LinearProgress>
      <Bar className="bar1"></Bar>
      <Bar className="bar2"></Bar>
    </LinearProgress>
  )
}

const LinearProgress = styled.div`
  background: ${(props) => props.theme.colors.background.tertiary};
  opacity: 0.7;
  height: 4px;
  position: relative;
  width: 100%;
  margin: 8px auto 0;
  overflow: hidden;
  border-radius: 8px;
  animation: start 0.3s ease-in;
`
const Bar = styled.div`
  position: absolute;
  opacity: 0.7;
  background: #1a9bc7;
  transition: transform 0.2s linear;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;

  &.bar1 {
    animation: growBar1 2.5s infinite, moveBar1 2.5s infinite;
  }

  &.bar2 {
    animation: growBar2 2.5s infinite, moveBar2 2.5s infinite;
  }

  @keyframes growBar1 {
    0% {
      animation-timing-function: linear;
      transform: scaleX(0.1);
    }
    35% {
      animation-timing-function: cubic-bezier(0.3, 0.1, 0.7, 1);
      transform: scaleX(0.1);
    }
    70% {
      animation-timing-function: cubic-bezier(0.2, 0, 0.2, 1.4);
      transform: scaleX(0.8);
    }
    100% {
      transform: scaleX(0.1);
    }
  }

  @keyframes moveBar1 {
    0% {
      left: -105%;
      animation-timing-function: linear;
    }
    20% {
      left: -105%;
      animation-timing-function: cubic-bezier(0.5, 0, 0.7, 0.4);
    }
    60% {
      left: 21%;
      animation-timing-function: cubic-bezier(0.3, 0.4, 0.55, 0.9);
    }
    80% {
      left: 40%;
      animation-timing-function: cubic-bezier(0.1, 0.2, 0.3, 0.95);
    }
    100% {
      left: 90%;
    }
  }

  @keyframes growBar2 {
    0% {
      animation-timing-function: cubic-bezier(0.2, 0, 0.5, 0.4);
      transform: scaleX(0.1);
    }
    20% {
      animation-timing-function: cubic-bezier(0.1, 0.2, 0.6, 1);
      transform: scaleX(0.3);
    }
    60% {
      animation-timing-function: cubic-bezier(0.2, 0, 0.2, 1.4);
      transform: scaleX(0.6);
    }
    100% {
      transform: scaleX(0.1);
    }
  }
  @keyframes moveBar2 {
    0% {
      left: -100%;
      animation-timing-function: cubic-bezier(0.15, 0, 0.5, 0.4);
    }
    25% {
      left: -50%;
      animation-timing-function: cubic-bezier(0.3, 0.3, 0.8, 0.7);
    }
    50% {
      left: 45%;
      animation-timing-function: cubic-bezier(0.1, 0.6, 0.6, 0.9);
    }
    100% {
      left: 95%;
    }
  }
`
