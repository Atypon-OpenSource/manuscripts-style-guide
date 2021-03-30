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
import React, {
  ChangeEvent,
  Dispatch,
  useCallback,
  useRef,
  useState,
} from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import styled, { css } from 'styled-components'

import { Action, actions } from './FileSectionState'
import { Designation, FileSectionType, getDesignationName } from './util'

/**
 * This component will show the drag or upload file area
 */
export const UploadFileArea: React.FC<{
  uploadFileHandler: (
    submissionId: string,
    file: File,
    designation: string
  ) => Promise<boolean>
  fileSection: FileSectionType
  submissionId: string
  dispatch: Dispatch<Action>
}> = ({ uploadFileHandler, fileSection, submissionId, dispatch }) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const handleUpload = useCallback(
    (submissionId, file, designation) => {
      dispatch(actions.HANDLE_UPLOAD_ACTION())
      dispatch(actions.SELECT_DESIGNATION(Designation.Supplementary))

      return uploadFileHandler(submissionId, file, designation)
        .then((res) => {
          dispatch(actions.HANDLE_FINISH_UPLOAD())
          return res
        })
        .catch((e) => console.error(e))
    },
    [dispatch, uploadFileHandler]
  )
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isSupplementFilesTab = fileSection === FileSectionType.Supplements
  const openFileDialog = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0]
      setSelectedFile(file)
      dispatch(actions.UPLOAD_FILE(file))
      if (file && isSupplementFilesTab) {
        handleUpload(
          submissionId,
          file,
          getDesignationName(Designation.Supplementary)
        )
      }
    }
  }

  const handleFileDrop = useCallback(
    (monitor: DropTargetMonitor) => {
      if (monitor) {
        const file = monitor.getItem().files[0]
        setSelectedFile(file)
        dispatch(actions.UPLOAD_FILE(file))
        if (selectedFile && isSupplementFilesTab) {
          handleUpload(
            submissionId,
            selectedFile,
            getDesignationName(Designation.Supplementary)
          )
        }
      }
    },
    [dispatch, handleUpload, isSupplementFilesTab, selectedFile, submissionId]
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
  background: #fafafa;
  border: 1px dashed #e2e2e2;
  box-sizing: border-box;
  border-radius: 8px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 24px;
  font-family: Lato;
  color: #6e6e6e;
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
