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
import React, { Dispatch, useCallback, useContext, useEffect } from 'react'

import { AlertMessage, AlertMessageType } from '../AlertMessage'
import { DragItemArea } from './DragItemArea'
import { PermissionsContext, Upload } from './FileManager'
import { FileSectionUploadItem } from './FileSectionItem/FileSectionUploadItem'
import { Action, actions, State } from './FileSectionState'
import { UploadFileArea } from './UploadFileArea'
import { FileSectionType } from './util'

/**
 *  This component represents the other files in the file section.
 */
export const FilesSection: React.FC<{
  enableDragAndDrop: boolean
  handleUpload: Upload
  fileSection: FileSectionType
  filesItem: JSX.Element[]
  dispatch: Dispatch<Action>
  state: State
}> = ({
  enableDragAndDrop,
  handleUpload,
  fileSection,
  filesItem,
  dispatch,
  state,
}) => {
  let uploadedFileExtension = ''
  if (state.uploadedFile) {
    uploadedFileExtension = state.uploadedFile.name.substring(
      state.uploadedFile.name.lastIndexOf('.') + 1
    )
  }
  const isSupplementFilesTab = fileSection === FileSectionType.Supplements
  const isOtherFileTab = fileSection === FileSectionType.OtherFile
  const can = useContext(PermissionsContext)

  useEffect(() => {
    state.uploadedFile &&
      fileSection === state.currentSection &&
      handleUpload(state.uploadedFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.uploadedFile])

  const handleSuccessMessage = () => {
    return (
      <AlertMessage
        type={AlertMessageType.success}
        hideCloseButton={true}
        dismissButton={{
          text: 'OK',
          action: () => dispatch(actions.HANDLE_SUCCESS_MESSAGE_DISMISS()),
        }}
      >
        {state.successMessage}
      </AlertMessage>
    )
  }

  return (
    <div>
      {can?.uploadFile && (
        <>
          {(isOtherFileTab || isSupplementFilesTab) && (
            <UploadFileArea
              handleUploadFile={handleUpload}
              fileSection={fileSection}
              dispatch={dispatch}
            />
          )}
          {state.isUploadFile && state.uploadedFile && (
            <FileSectionUploadItem
              fileName={state.uploadedFile.name}
              isLoading={state.isUploadFile}
            />
          )}
        </>
      )}

      {state.fileUploadedSuccessfullySection === fileSection &&
        handleSuccessMessage()}
      {filesItem}
    </div>
  )
}
