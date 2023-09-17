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
import { Supplement } from '@manuscripts/json-schema'
import { buildSupplementaryMaterial } from '@manuscripts/transform'
import React, { Dispatch, useContext, useState } from 'react'

import { ManuscriptFile, ModelFile } from '../../lib/files'
import { FileActions } from './FileActions'
import { FileContainer } from './FileContainer'
import { FileCreatedDate } from './FileCreatedDate'
import { PermissionsContext, Replace } from './FileManager'
import { FileManagerContext } from './FileManagerProvider'
import { FileName } from './FileName'
import { FileSectionAlert, FileSectionAlertType } from './FileSectionAlert'
import { Action } from './FileSectionState'
import { FileUploader } from './FileUploader'
import { FileSectionType } from './util'

/**
 *  This component represents the other files in the file section.
 */
export const SupplementsSection: React.FC<{
  supplements: ModelFile[]
  dispatch: Dispatch<Action>
}> = ({ supplements, dispatch }) => {
  const { modelMap, saveModel, deleteModel, store } =
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
    const uploaded = await store.upload(file)
    setAlert({
      type: FileSectionAlertType.UPLOAD_SUCCESSFUL,
      message: '',
    })
    return uploaded
  }

  const handleUpload = async (file: File) => {
    const uploaded = await upload(file)
    //TODO
    const id = 'attachment:' + uploaded.id
    const supplement = buildSupplementaryMaterial('', id)
    await saveModel(supplement)
  }

  const handleReplace = async (modelId: string, file: File) => {
    const uploaded = await upload(file)
    const supplement = modelMap.get(modelId) as Supplement
    //TODO
    await saveModel({
      ...supplement,
      href: 'attachment:' + uploaded.id,
    })
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
      {can?.uploadFile && <FileUploader handler={handleUpload} />}
      <FileSectionAlert alert={alert} />
      {supplements.map((supplement) => (
        <SupplementFile
          key={supplement.modelId}
          file={supplement}
          handleDownload={() => store.download(supplement)}
          handleReplace={async (f) =>
            await handleReplace(supplement.modelId, f)
          }
          handleDetach={async () =>
            await handleMoveToOtherFiles(supplement.modelId)
          }
          dispatch={dispatch}
        />
      ))}
    </>
  )
}

const SupplementFile: React.FC<{
  file: ManuscriptFile
  handleDownload: () => void
  handleReplace: Replace
  handleDetach: () => Promise<void>
  handleUpdateInline?: () => void
  dispatch: Dispatch<Action>
}> = ({
  file,
  handleDownload,
  handleReplace,
  handleDetach,
  handleUpdateInline,
  dispatch,
}) => {
  return (
    <FileContainer key={file.id}>
      <FileName file={file} />
      {file.createdDate && <FileCreatedDate file={file} />}
      <FileActions
        sectionType={FileSectionType.Supplements}
        handleDownload={handleDownload}
        handleUpdateInline={handleUpdateInline}
        handleReplace={handleReplace}
        move={{
          sectionType: FileSectionType.OtherFile,
          handler: handleDetach,
        }}
        dispatch={dispatch}
      />
    </FileContainer>
  )
}
