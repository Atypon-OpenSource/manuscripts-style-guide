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
import React, { ChangeEvent, Dispatch, useCallback, useRef } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import styled, { css } from 'styled-components'

import { Upload } from './FileManager'
import { Action, actions } from './FileSectionState'
import { FileSectionType } from './util'

/**
 * This component will show the drag or upload file area
 */
export const UploadFileArea: React.FC<{
  handleUploadFile: Upload
  fileSection: FileSectionType
  dispatch: Dispatch<Action>
}> = ({ fileSection, dispatch }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openFileDialog = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0]
      dispatch(actions.UPLOAD_FILE(file, fileSection))
    }
  }

  const handleFileDrop = useCallback(
    (monitor: DropTargetMonitor) => {
      if (monitor) {
        const file = monitor.getItem().files[0]
        dispatch(actions.UPLOAD_FILE(file, fileSection))
      }
    },
    [dispatch, fileSection]
  )

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: [NativeTypes.FILE],
    drop(item, monitor) {
      handleFileDrop(monitor)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = canDrop && isOver

  return (
    <Container ref={dropRef} active={isActive} onClick={openFileDialog}>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => handleChange(e)}
        value={''}
      />
      Drag or click to upload a new file
    </Container>
  )
}

const activeBoxStyle = css`
  background: #f2fbfc;
  border: 1px dashed #bce7f6;
`

const Container = styled.div<{ active: boolean }>`
  background: ${(props) => props.theme.colors.background.secondary};
  border: 1px dashed #e2e2e2;
  box-sizing: border-box;
  border-radius: 8px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 24px;
  font-family: ${(props) => props.theme.font.family.Lato};
  color: ${(props) => props.theme.colors.text.onLight};
  cursor: pointer;
  margin-bottom: 7px;
  margin-top: 16px;
  ${(props) =>
    props.active
      ? css`
          ${activeBoxStyle}
        `
      : css``}
`
