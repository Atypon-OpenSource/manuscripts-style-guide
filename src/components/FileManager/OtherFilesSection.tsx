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
import { buildSupplementaryMaterial } from '@manuscripts/transform'
import React, { Dispatch, useContext, useState } from 'react'

import { useDropdown } from '../../hooks/use-dropdown'
import { ManuscriptFile } from '../../lib/files'
import { DropdownContainer } from '../Dropdown'
import DotsIcon from '../icons/dots-icon'
import { FileActions } from './FileActions'
import { FileContainer } from './FileContainer'
import { FileCreatedDate } from './FileCreatedDate'
import { PermissionsContext } from './FileManager'
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
export const OtherFilesSection: React.FC<{
  files: ManuscriptFile[]
  dispatch: Dispatch<Action>
}> = ({ files, dispatch }) => {
  const { store, saveModel } = useContext(FileManagerContext)

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
    await store.upload(file)
    setUploadState({
      name: '',
      status: 'success',
    })
  }

  const moveToSupplements = async (file: ManuscriptFile) => {
    const supplement = buildSupplementaryMaterial('', 'attachment:' + file.id)
    await saveModel(supplement)
  }

  return (
    <div>
      {can?.uploadFile && <FileUploader handler={upload} />}
      <FileUploadState state={uploadState} />
      {files.map((file) => (
        <OtherFile
          key={file.id}
          file={file}
          handleDownload={() => store.download(file)}
          handleMoveToSupplements={async () => await moveToSupplements(file)}
          dispatch={dispatch}
        />
      ))}
    </div>
  )
}

const OtherFile: React.FC<{
  file: ManuscriptFile
  handleDownload: () => void
  handleMoveToSupplements: () => Promise<void>
  dispatch: Dispatch<Action>
}> = ({ file, handleDownload, handleMoveToSupplements, dispatch }) => {
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()

  return (
    <FileContainer key={file.id}>
      <FileName file={file} />
      {file.createdDate && <FileCreatedDate file={file} />}
      {handleDownload && (
        <DropdownContainer ref={wrapperRef}>
          <ActionsIcon
            onClick={toggleOpen}
            type="button"
            className={'show-on-hover'}
            aria-label="Actions"
            aria-pressed={isOpen}
          >
            <DotsIcon />
          </ActionsIcon>
          {isOpen && (
            <FileActions
              sectionType={FileSectionType.OtherFile}
              handleDownload={handleDownload}
              moveTarget={{
                sectionType: FileSectionType.Supplements,
                handler: handleMoveToSupplements,
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
