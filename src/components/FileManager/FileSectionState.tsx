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
import { Designation } from './util'

export const getInitialState = (): State => ({
  uploadedFile: undefined,
  isUploadFile: false,
  isOpenPopup: false,
  confirmationPopupData: undefined,
  moveToOtherState: undefined,
  successMessage: '',
  isShowSuccessMessage: false,
  selectDesignation: undefined,
  isOpenSelectDesignationPopup: false,
})

export interface State {
  uploadedFile: File | undefined
  isUploadFile: boolean
  isOpenPopup: boolean
  confirmationPopupData:
    | { popupHeader: string; popupMessage: string }
    | undefined
  moveToOtherState:
    | { submissionId: string; typeId: string; name: string }
    | undefined
  successMessage: string
  isShowSuccessMessage: boolean
  selectDesignation: Designation | undefined
  isOpenSelectDesignationPopup: boolean
}

enum ActionTypes {
  UPLOAD_FILE = 'UploadFile',
  MOVE_FILE = 'moveFile',
  SELECT_DESIGNATION = 'selectDesignation',
  HANDLE_CANCEL_UPLOAD = 'handleCancel',
  HANDLE_UPLOAD_ACTION = 'handleUpload',
  HANDLE_MOVE_ACTION = 'handleMove',
  HANDLE_CANCEL_MOVE = 'handleCancelMove',
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.UPLOAD_FILE: {
      return {
        ...state,
        isOpenSelectDesignationPopup: true,
        uploadedFile: action.uploadFile,
        selectDesignation: undefined,
      }
    }

    case ActionTypes.MOVE_FILE: {
      return {
        ...state,
        moveToOtherState: {
          submissionId: action.submissionId,
          typeId: action.typeId,
          name: action.name,
        },
        confirmationPopupData: {
          popupHeader: action.confirmationPopupHeader,
          popupMessage: action.confirmationPopupMessage,
        },
        isOpenPopup: true,
        successMessage: action.successMoveMessage,
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
        isOpenSelectDesignationPopup: false,
        isUploadFile: true,
      }
    }

    case ActionTypes.HANDLE_CANCEL_UPLOAD: {
      return {
        ...state,
        isOpenSelectDesignationPopup: false,
      }
    }
    case ActionTypes.HANDLE_CANCEL_MOVE: {
      return {
        ...state,
        isOpenPopup: false,
      }
    }
    case ActionTypes.HANDLE_MOVE_ACTION: {
      return {
        ...state,
        isOpenPopup: false,
        isShowSuccessMessage: true,
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
  UPLOAD_FILE: (uploadFile: File): Action => ({
    type: ActionTypes.UPLOAD_FILE,
    uploadFile,
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
    submissionId: string,
    typeId: string,
    name: string,
    confirmationPopupHeader: string,
    confirmationPopupMessage: string,
    successMoveMessage: string
  ): Action => ({
    type: ActionTypes.MOVE_FILE,
    submissionId,
    typeId,
    name,
    confirmationPopupHeader,
    confirmationPopupMessage,
    successMoveMessage,
  }),
  HANDLE_MOVE_ACTION: (): Action => ({
    type: ActionTypes.HANDLE_MOVE_ACTION,
  }),
  HANDLE_CANCEL_MOVE: (): Action => ({
    type: ActionTypes.HANDLE_CANCEL_MOVE,
  }),
}
