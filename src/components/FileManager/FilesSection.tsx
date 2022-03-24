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
import React, { Dispatch, useContext } from 'react'

import { DragItemArea } from './DragItemArea'
import { PermissionsContext } from './FileManager'
import { FileSectionUploadItem } from './FileSectionItem/FileSectionUploadItem'
import { Action, actions, State } from './FileSectionState'
import { SelectDialogDesignation } from './SelectDialogDesignation'
import { UploadFileArea } from './UploadFileArea'
import { FileSectionType, getDesignationName } from './util'

/**
 *  This component represents the other files in the file section.
 */
export const FilesSection: React.FC<{
  submissionId: string
  enableDragAndDrop: boolean
  handleUpload: (
    submissionId: string,
    file: File,
    designation: string
  ) => Promise<any>
  fileSection: FileSectionType
  filesItem: JSX.Element[]
  dispatch: Dispatch<Action>
  state: State
}> = ({
  submissionId,
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
  const handleUploadOtherFile = () => {
    dispatch(actions.HANDLE_UPLOAD_ACTION())
    state.uploadedFile &&
      state.selectDesignation !== undefined &&
      handleUpload(
        submissionId,
        state.uploadedFile,
        getDesignationName(state.selectDesignation)
      )
  }
  const can = useContext(PermissionsContext)

  return (
    <div>
      {can?.uploadFile && (
        <>
          {(isOtherFileTab || isSupplementFilesTab) && (
            <UploadFileArea
              handleUploadFile={handleUpload}
              fileSection={fileSection}
              submissionId={submissionId}
              dispatch={dispatch}
            />
          )}
          {state.isUploadFile &&
            state.uploadedFile &&
            state.selectDesignation !== undefined && (
              <FileSectionUploadItem
                submissionId={submissionId}
                fileName={state.uploadedFile.name}
                isLoading={state.isUploadFile}
              />
            )}
        </>
      )}

      {state.uploadedFile && isOtherFileTab && (
        <SelectDialogDesignation
          isOpen={state.isOpenSelectDesignationPopup}
          fileExtension={uploadedFileExtension}
          handleCancel={() => {
            dispatch(actions.HANDLE_CANCEL_UPLOAD())
          }}
          uploadFileHandler={() => handleUploadOtherFile()}
          dispatch={dispatch}
          fileSection={fileSection}
        />
      )}

      {filesItem}
      {can?.changeDesignation &&
        enableDragAndDrop &&
        (isSupplementFilesTab || isOtherFileTab) && (
          <DragItemArea
            text={
              isSupplementFilesTab
                ? 'Drag the items to place them in the text'
                : 'Drag the items to place in the Supplements section or in the text'
            }
          />
        )}
    </div>
  )
}
