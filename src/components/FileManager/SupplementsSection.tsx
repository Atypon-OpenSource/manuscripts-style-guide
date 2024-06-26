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
import {
  buildSupplement,
  ObjectTypes,
  Supplement,
} from '@manuscripts/json-schema'
import React, { useContext, useEffect, useState } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { ModelFile } from '../../lib/files'
import { FileActions } from './FileActions'
import { FileContainer } from './FileContainer'
import { FileCreatedDate } from './FileCreatedDate'
import { PermissionsContext, Replace } from './FileManager'
import { FileManagerContext } from './FileManagerProvider'
import { FileName } from './FileName'
import { FileSectionAlert, FileSectionAlertType } from './FileSectionAlert'
import { FileUploader } from './FileUploader'
import { FileSectionType } from './util'

/**
 *  This component represents the other files in the file section.
 */
export const SupplementsSection: React.FC<{
  supplements: ModelFile[]
}> = ({ supplements }) => {
  const { modelMap, saveModel, deleteModel, fileManagement } =
    useContext(FileManagerContext)

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
    const uploaded = await fileManagement.upload(file)
    setAlert({
      type: FileSectionAlertType.UPLOAD_SUCCESSFUL,
      message: '',
    })
    return uploaded
  }

  const handleUpload = async (file: File) => {
    const uploaded = await upload(file)
    const supplement = buildSupplement('', uploaded.id)
    await saveModel({ ...supplement, MIME: file.type } as Supplement)
  }

  const handleReplace = async (modelId: string, file: File) => {
    const uploaded = await upload(file)
    const supplement = buildSupplement('', uploaded.id)
    await deleteModel(modelId)
    await saveModel({ ...supplement, MIME: file.type } as Supplement)
  }

  const handleMoveToOtherFiles = async (modelId: string) => {
    await deleteModel(modelId)
    setAlert({
      type: FileSectionAlertType.MOVE_SUCCESSFUL,
      message: FileSectionType.OtherFile,
    })
  }

  return (
    <>
      {can?.uploadFile && <FileUploader onUpload={handleUpload} />}
      <FileSectionAlert alert={alert} />
      {supplements.map((supplement) => (
        <SupplementFile
          key={supplement.modelId}
          file={supplement}
          handleDownload={() => fileManagement.download(supplement)}
          handleReplace={async (f) =>
            await handleReplace(supplement.modelId, f)
          }
          handleDetach={async () =>
            await handleMoveToOtherFiles(supplement.modelId)
          }
        />
      ))}
    </>
  )
}

const SupplementFile: React.FC<{
  file: ModelFile
  handleDownload: () => void
  handleReplace: Replace
  handleDetach: () => Promise<void>
}> = ({ file, handleDownload, handleReplace, handleDetach }) => {
  const [{ isDragging }, dragRef, preview] = useDrag({
    type: 'file',
    item: {
      file,
      model: {
        _id: file.modelId,
        objectType: ObjectTypes.Supplement,
      },
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
      data-cy="file-container"
      key={file.id}
      ref={dragRef}
      className={isDragging ? 'dragging' : ''}
    >
      <FileName file={file} />
      <FileCreatedDate file={file} className="show-on-hover" />
      <FileActions
        data-cy="file-actions"
        sectionType={FileSectionType.Supplements}
        handleDownload={file.id ? handleDownload : undefined}
        handleReplace={handleReplace}
        move={
          file.id
            ? {
                sectionType: FileSectionType.OtherFile,
                handler: handleDetach,
              }
            : undefined
        }
      />
    </FileContainer>
  )
}
