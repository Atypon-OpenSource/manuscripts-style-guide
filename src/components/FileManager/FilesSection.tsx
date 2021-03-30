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
import { ExternalFile } from '@manuscripts/manuscripts-json-schema'
import React, { useReducer, useState } from 'react'
import styled from 'styled-components'

import { ConfirmationPopUp } from './ConfirmationPopUp'
import { DragItemArea } from './DragItemArea'
import { DraggableFileSectionItem } from './FileSectionItem/DraggableFileSectionItem'
import {
  FileSectionItem,
  FileSectionItemProps,
} from './FileSectionItem/FileSectionItem'
import { FileSectionUploadItem } from './FileSectionItem/FileSectionUploadItem'
import { actions, getInitialState, reducer } from './FileSectionState'
import { SelectDialogDesignation } from './SelectDialogDesignation'
import { UploadFileArea } from './UploadFileArea'
import {
  Designation,
  designationWithFileSectionsMap,
  FileSectionType,
  generateExternalFilesTitles,
  getDesignationName,
  namesWithDesignationMap,
  sortExternalFiles,
} from './util'

/**
 *  This component represents the other files in the file section.
 */
export const FilesSection: React.FC<{
  submissionId: string
  externalFiles: ExternalFile[]
  enableDragAndDrop: boolean
  handleUpload: (
    submissionId: string,
    file: File,
    designation: string
  ) => Promise<boolean>
  handleDownload: (url: string) => void
  handleReplace: (
    submissionId: string,
    name: string,
    file: File,
    typeId: string
  ) => Promise<boolean>
  changeDesignationHandler: (
    submissionId: string,
    typeId: string,
    name: string
  ) => Promise<boolean>
  fileSection: FileSectionType
}> = ({
  submissionId,
  externalFiles,
  enableDragAndDrop,
  handleUpload,
  handleDownload,
  handleReplace,
  changeDesignationHandler,
  fileSection,
}) => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  let uploadedFileExtension = ''
  if (state.uploadedFile) {
    uploadedFileExtension = state.uploadedFile.name.substring(
      state.uploadedFile.name.lastIndexOf('.') + 1
    )
  }

  const isInlineFilesTab = fileSection === FileSectionType.Inline

  const isSupplementFilesTab = fileSection === FileSectionType.Supplements

  const isOtherFileTab = fileSection === FileSectionType.OtherFile

  const showAttachmentNameAndDesignationActions =
    isSupplementFilesTab || isOtherFileTab

  // Here we are filtering the external files to extract the other-files based on the designation.
  const itemsData = externalFiles.filter((element) => {
    const designation: Designation | undefined = namesWithDesignationMap.get(
      element.designation
    )
    return (
      designation !== undefined &&
      designationWithFileSectionsMap.get(designation) === fileSection
    )
  })

  // Generating a title for the external files and sorting the external files based on the generated title
  const itemsDataWithTitle = sortExternalFiles(
    generateExternalFilesTitles(itemsData)
  )

  const filesItems = itemsDataWithTitle.map((element) => {
    const itemProps: FileSectionItemProps = {
      submissionId: submissionId,
      externalFile: element.externalFile,
      title: element.title,
      showAttachmentName: showAttachmentNameAndDesignationActions,
      showDesignationActions: showAttachmentNameAndDesignationActions,
      handleDownload: handleDownload,
      handleReplace: handleReplace,
      changeDesignationHandler: changeDesignationHandler,
      dispatch: dispatch,
    }

    if (enableDragAndDrop && (isSupplementFilesTab || isOtherFileTab)) {
      return (
        <DraggableFileSectionItem
          {...itemProps}
          key={element.externalFile._id}
        />
      )
    } else {
      return <FileSectionItem {...itemProps} key={element.externalFile._id} />
    }
  })

  return (
    <div>
      {(isOtherFileTab || isSupplementFilesTab) && (
        <UploadFileArea
          uploadFileHandler={handleUpload}
          fileSection={fileSection}
          submissionId={submissionId}
          dispatch={dispatch}
        />
      )}
      {state.isUploadFile &&
        state.uploadedFile &&
        state.selectDesignation != undefined && (
          <FileSectionUploadItem
            submissionId={submissionId}
            fileName={state.uploadedFile.name}
            isLoading={state.isUploadFile}
          />
        )}

      <ConfirmationPopUp
        popupHeader={
          state.confirmationPopupData
            ? state.confirmationPopupData.popupHeader
            : ''
        }
        popUpMessage={
          state.confirmationPopupData
            ? state.confirmationPopupData.popupMessage
            : ''
        }
        isOpen={state.isOpenPopup}
        handleClose={() => dispatch(actions.HANDLE_CANCEL_MOVE())}
        handleMove={() => {
          dispatch(actions.HANDLE_MOVE_ACTION())
          if (state.moveToOtherState) {
            changeDesignationHandler(
              state.moveToOtherState.submissionId,
              state.moveToOtherState.typeId,
              state.moveToOtherState.name
            )
              .then((res) => {
                if (res) {
                  dispatch(actions.HANDLE_SUCCESS_MESSAGE())
                }
                return res
              })
              .catch((e) => console.error(e))
          }
        }}
      />
      {state.uploadedFile && isOtherFileTab && (
        <SelectDialogDesignation
          isOpen={state.isOpenSelectDesignationPopup}
          fileExtension={uploadedFileExtension}
          handleCancel={() => {
            dispatch(actions.HANDLE_CANCEL_UPLOAD())
          }}
          uploadFileHandler={() => {
            dispatch(actions.HANDLE_UPLOAD_ACTION())
            state.uploadedFile &&
              state.selectDesignation != undefined &&
              handleUpload(
                submissionId,
                state.uploadedFile,
                getDesignationName(state.selectDesignation)
              )
                .then((res) => {
                  dispatch(actions.HANDLE_FINISH_UPLOAD())
                  return true
                })
                .catch((e) => console.error(e))
          }}
          dispatch={dispatch}
          fileSection={fileSection}
        />
      )}

      {filesItems}
      {enableDragAndDrop && (isSupplementFilesTab || isOtherFileTab) && (
        <DragItemArea
          text={
            isSupplementFilesTab
              ? 'Drag the items to place them in the text'
              : 'Drag the items to place in the Supplements section or in the text'
          }
        />
      )}
      {state.successMessageElement}
    </div>
  )
}
