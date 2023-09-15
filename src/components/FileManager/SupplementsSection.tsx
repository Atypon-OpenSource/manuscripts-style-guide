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

import { useDropdown } from '../../hooks/use-dropdown'
import { ManuscriptFile, ModelFile } from '../../lib/files'
import { DropdownContainer } from '../Dropdown'
import DotsIcon from '../icons/dots-icon'
import { FileActions } from './FileActions'
import { FileContainer } from './FileContainer'
import { FileCreatedDate } from './FileCreatedDate'
import { PermissionsContext, Replace } from './FileManager'
import { FileManagerContext } from './FileManagerProvider'
import { FileName } from './FileName'
import { ActionsIcon } from './FileSectionItem/FileSectionItem'
import { Action } from './FileSectionState'
import { FileUploader } from './FileUploader'
import { FileUploadState } from './FileUploadState'
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

  const [uploadState, setUploadState] = useState({
    name: '',
    status: '',
  })

  const upload = async (file: File) => {
    setUploadState({
      name: file.name,
      status: 'in-progress',
    })
    const uploaded = await store.upload(file)
    setUploadState({
      name: '',
      status: 'success',
    })
    return uploaded
  }

  const handleUpload = async (file: File) => {
    const uploaded = await upload(file)
    const id = 'attachment:' + uploaded.id
    const supplement = buildSupplementaryMaterial('', id)
    await saveModel(supplement)
  }

  const handleReplace = async (modelId: string, file: File) => {
    const uploaded = await upload(file)
    const supplement = modelMap.get(modelId) as Supplement
    await saveModel({
      ...supplement,
      href: 'attachment:' + uploaded.id,
    })
  }

  const handleDetach = async (modelId: string) => {
    await deleteModel(modelId)
  }

  return (
    <>
      {can?.uploadFile && <FileUploader handler={handleUpload} />}
      <FileUploadState state={uploadState} />
      {supplements.map((supplement) => (
        <SupplementFile
          key={supplement.modelId}
          file={supplement}
          handleDownload={() => store.download(supplement)}
          handleReplace={async (f) =>
            await handleReplace(supplement.modelId, f)
          }
          handleDetach={async () => await handleDetach(supplement.modelId)}
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
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()

  return (
    <FileContainer key={file.id}>
      <FileName file={file} />
      {file.createdDate && <FileCreatedDate file={file} />}
      {handleDownload && handleReplace && (
        <DropdownContainer ref={wrapperRef}>
          <ActionsIcon
            onClick={toggleOpen}
            type="button"
            className="show-on-hover"
            aria-label="Download or Replace or Detach"
            aria-pressed={isOpen}
          >
            <DotsIcon />
          </ActionsIcon>
          {isOpen && (
            <FileActions
              sectionType={FileSectionType.Supplements}
              handleDownload={handleDownload}
              handleUpdateInline={handleUpdateInline}
              handleReplace={handleReplace}
              moveTarget={{
                sectionType: FileSectionType.OtherFile,
                handler: handleDetach,
              }}
              hideActionList={toggleOpen}
              dispatch={dispatch}
            />
          )}
        </DropdownContainer>
      )}
    </FileContainer>
  )
}
