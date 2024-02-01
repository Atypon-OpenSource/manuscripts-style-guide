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
import { buildSupplement } from '@manuscripts/json-schema'
import React, { useContext, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { FileAttachment } from '../../lib/files'
import { FileActions } from './FileActions'
import { FileContainer } from './FileContainer'
import { FileCreatedDate } from './FileCreatedDate'
import { PermissionsContext } from './FileManager'
import { FileManagerContext } from './FileManagerProvider'
import { FileName } from './FileName'
import { FileSectionAlert, FileSectionAlertType } from './FileSectionAlert'
import { FileUploader } from './FileUploader'
import { FileSectionType } from './util'

/**
 *  This component represents the other files in the file section.
 */
export const OtherFilesSection: React.FC<{
  files: FileAttachment[]
}> = ({ files }) => {
  const { fileManagement, saveModel } = useContext(FileManagerContext)

  const can = useContext(PermissionsContext)

  const [alert, setAlert] = useState({
    type: FileSectionAlertType.NONE,
    message: '',
  })

  const upload = async (file: File) => {
    setAlert({
      type: FileSectionAlertType.UPLOAD_IN_PROGRESS,
      message: file.name,
    })
    await fileManagement.upload(file)
    setAlert({
      type: FileSectionAlertType.UPLOAD_SUCCESSFUL,
      message: '',
    })
  }

  const moveToSupplements = async (file: FileAttachment) => {
    const supplement = buildSupplement('', file.id)
    await saveModel(supplement)
    setAlert({
      type: FileSectionAlertType.MOVE_SUCCESSFUL,
      message: FileSectionType.Supplements,
    })
  }

  return (
    <div>
      {can?.uploadFile && <FileUploader handler={upload} />}
      <FileSectionAlert alert={alert} />
      {files.map((file) => (
        <OtherFile
          key={file.id}
          file={file}
          handleDownload={() => fileManagement.download(file)}
          handleMoveToSupplements={async () => await moveToSupplements(file)}
        />
      ))}
    </div>
  )
}

const OtherFile: React.FC<{
  file: FileAttachment
  handleDownload: () => void
  handleMoveToSupplements: () => Promise<void>
}> = ({ file, handleDownload, handleMoveToSupplements }) => {
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      file,
      type: 'file',
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  useEffect(() => {
    preview(getEmptyImage())
  }, [preview])

  return (
    <FileContainer
      key={file.id}
      data-cy="file-container"
      ref={drag}
      className={isDragging ? 'dragging' : ''}
    >
      <FileName file={file} />
      <FileCreatedDate file={file} className="show-on-hover" />
      <FileActions
        sectionType={FileSectionType.OtherFile}
        handleDownload={handleDownload}
        move={{
          sectionType: FileSectionType.Supplements,
          handler: handleMoveToSupplements,
        }}
      />
    </FileContainer>
  )
}
