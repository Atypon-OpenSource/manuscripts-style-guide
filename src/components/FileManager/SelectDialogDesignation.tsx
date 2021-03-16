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
import React, { Dispatch } from 'react'
import styled from 'styled-components'

import { Category, Dialog, MessageContainer, ModalBody } from '../Dialog'
import { Action } from './FileSectionState'
import { SelectDesignationActions } from './SelectDesignationActions'
import { FileSectionType } from './util'

/**
 *  This component represents the other files in the file section.
 */
export const SelectDialogDesignation: React.FC<{
  isOpen: boolean
  fileExtension: string
  fileSection: FileSectionType
  handleCancel: () => void
  uploadFileHandler: () => void
  dispatch: Dispatch<Action>
  // setSelectDesignation: Dispatch<SetStateAction<Designation | undefined>>
}> = ({
  isOpen,
  fileExtension,
  fileSection,
  handleCancel,
  uploadFileHandler,
  dispatch,
}) => {
  return (
    <DesignationDialog
      isOpen={isOpen}
      category={Category.confirmation}
      header="Choose designation"
      message="Please choose the designation for the file"
      actions={{
        primary: {
          action: uploadFileHandler,
          title: 'Choose',
        },
        secondary: {
          action: handleCancel,
          title: 'Cancel',
        },
      }}
    >
      <SelectDesignationActions
        fileExtension={fileExtension}
        fileSection={fileSection}
        dispatch={dispatch}
      />
    </DesignationDialog>
  )
}
const DesignationDialog = styled(Dialog)`
  & ${ModalBody} {
    overflow: visible;
  }

  & ${MessageContainer} {
    overflow: visible;
  }
`
