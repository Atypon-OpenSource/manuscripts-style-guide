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
import React from 'react'

import { Designation, FileSectionType } from './util'

export const getInitialState = (): State => ({
  uploadedFile: undefined,
  isUploadFile: false,
  moveToOtherState: undefined,
  fileUploadedSuccessfullySection: undefined,
  successMessage: '',
  isShowSuccessMessage: false,
  selectDesignation: undefined,
  showDesignationPopup: undefined,
})

export interface State {
  uploadedFile: File | undefined
  isUploadFile: boolean
  moveToOtherState: { typeId: string; name: string } | undefined
  fileUploadedSuccessfullySection: FileSectionType | undefined
  successMessage: string
  isShowSuccessMessage: boolean
  selectDesignation: Designation | undefined
  showDesignationPopup: FileSectionType | undefined
}

enum ActionTypes {
  UPLOAD_FILE = 'UploadFile',
  MOVE_FILE = 'moveFile',
  SELECT_DESIGNATION = 'selectDesignation',
  HANDLE_CANCEL_UPLOAD = 'handleCancel',
  HANDLE_UPLOAD_ACTION = 'handleUpload',
  HANDLE_FINISH_UPLOAD = 'handleFinishUpload',
  HANDLE_SUCCESS_MESSAGE = 'handleSuccessMessage',
  HANDLE_SUCCESS_MESSAGE_DISMISS = 'handleSuccessMessageDismiss',
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.UPLOAD_FILE: {
      return {
        ...state,
        showDesignationPopup: action.sectionType,
        uploadedFile: action.uploadFile,
        selectDesignation: undefined,
      }
    }

    case ActionTypes.MOVE_FILE: {
      return {
        ...state,
        moveToOtherState: {
          typeId: action.typeId,
          name: action.name,
        },
        successMessage: action.successMoveMessage,
        isShowSuccessMessage: false,
      }
    }

    case ActionTypes.SELECT_DESIGNATION: {
      return {
        ...state,
        selectDesignation: action.designation,
      }
    }
    case ActionTypes.HANDLE_UPLOAD_ACTION: {
      return {
        ...state,
        showDesignationPopup: undefined,
        isUploadFile: true,
        isShowSuccessMessage: false,
        successMessage: '',
      }
    }

    case ActionTypes.HANDLE_CANCEL_UPLOAD: {
      return {
        ...state,
        showDesignationPopup: undefined,
      }
    }
    case ActionTypes.HANDLE_FINISH_UPLOAD: {
      return {
        ...state,
        isUploadFile: false,
        uploadedFile: undefined,
        selectDesignation: undefined,
      }
    }
    case ActionTypes.HANDLE_SUCCESS_MESSAGE: {
      return {
        ...state,
        isShowSuccessMessage: true,
        successMessage: action.successMessage,
        fileUploadedSuccessfullySection: action.sectionType,
      }
    }
    case ActionTypes.HANDLE_SUCCESS_MESSAGE_DISMISS: {
      return {
        ...state,
        isShowSuccessMessage: false,
        successMessage: '',
        fileUploadedSuccessfullySection: undefined,
      }
    }
  }
  return state
}

export interface Action {
  type: ActionTypes
  [key: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const actions = {
  UPLOAD_FILE: (uploadFile: File, sectionType: FileSectionType): Action => ({
    type: ActionTypes.UPLOAD_FILE,
    uploadFile,
    sectionType,
  }),
  HANDLE_UPLOAD_ACTION: (): Action => ({
    type: ActionTypes.HANDLE_UPLOAD_ACTION,
  }),
  HANDLE_CANCEL_UPLOAD: (): Action => ({
    type: ActionTypes.HANDLE_CANCEL_UPLOAD,
  }),
  SELECT_DESIGNATION: (designation: Designation): Action => ({
    type: ActionTypes.SELECT_DESIGNATION,
    designation,
  }),
  MOVE_FILE: (
    attachmentId: string,
    typeId: string,
    name: string,
    successMoveMessage: string
  ): Action => ({
    type: ActionTypes.MOVE_FILE,
    typeId,
    name,
    successMoveMessage,
  }),
  /**
   * To hide the upload progress item when the file upload is finished.
   */
  HANDLE_FINISH_UPLOAD: (): Action => ({
    type: ActionTypes.HANDLE_FINISH_UPLOAD,
  }),
  /**
   * To handle transfer file success message from other file to supplementary file and vice versa.
   */
  HANDLE_SUCCESS_MESSAGE: (
    successMessage: string,
    sectionType?: FileSectionType
  ): Action => ({
    type: ActionTypes.HANDLE_SUCCESS_MESSAGE,
    successMessage,
    sectionType,
  }),
  HANDLE_SUCCESS_MESSAGE_DISMISS: (): Action => ({
    type: ActionTypes.HANDLE_SUCCESS_MESSAGE_DISMISS,
  }),
}
