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
import React, {
  ChangeEvent,
  Dispatch,
  useContext,
  useRef,
  useState,
} from 'react'

import { DropdownList } from '../../Dropdown'
import { Maybe } from '../../SubmissionInspector/types'
import { PermissionsContext } from '../FileManager'
import { Action, actions } from '../FileSectionState'
import { ActionsItem } from '../ItemsAction'
import { Designation, namesWithDesignationMap } from '../util'
import { SubmissionAttachment } from './FileSectionItem'

/**
 * This component represents the drop-down list action for each file item.
 */
export const ItemActions: React.FC<{
  downloadAttachmentHandler: (url: string) => void
  replaceAttachmentHandler: (
    attachmentId: string,
    name: string,
    file: File,
    typeId: string
  ) => Promise<boolean | SubmissionAttachment | undefined>
  handleUpdateInline?: (attachment: SubmissionAttachment) => void
  attachmentId: string
  fileName: string
  designation?: Maybe<string> | undefined
  publicUrl: string | undefined
  hideActionList: (e?: React.MouseEvent) => void
  dispatch?: Dispatch<Action>
  dropDownClassName?: string
}> = ({
  downloadAttachmentHandler,
  replaceAttachmentHandler,
  handleUpdateInline,
  attachmentId,
  fileName,
  designation,
  publicUrl,
  hideActionList,
  dispatch,
  dropDownClassName,
}) => {
  const attachmentDesignation =
    designation == undefined ? 'undefined' : designation
  const attachmentDesignationName =
    attachmentDesignation !== 'undefined'
      ? namesWithDesignationMap.get(attachmentDesignation)
      : undefined
  const canBeReplaced =
    attachmentDesignationName == undefined ||
    ![
      Designation.MainManuscript,
      Designation.SubmissionFile,
      Designation.SubmissionPdf,
    ].includes(attachmentDesignationName)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File>()
  const can = useContext(PermissionsContext)
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0]
      setSelectedFile(file)
      if (dispatch) {
        dispatch(actions.HANDLE_UPLOAD_ACTION())
        dispatch(
          actions.SELECT_DESIGNATION(
            attachmentDesignationName || Designation.Document
          )
        )
      }
      const result = await replaceAttachmentHandler(
        attachmentId,
        fileName,
        file,
        attachmentDesignation
      )

      if (typeof result === 'object' && handleUpdateInline) {
        handleUpdateInline(result)
      }

      if (dispatch) {
        dispatch(actions.HANDLE_FINISH_UPLOAD())
      }
      hideActionList()
    }
  }
  const openFileDialog = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  return (
    <DropdownList
      direction={'right'}
      className={dropDownClassName}
      width={125}
      height={96}
      top={5}
      onClick={hideActionList}
    >
      <ActionsItem
        onClick={() => {
          publicUrl !== undefined ? downloadAttachmentHandler(publicUrl) : {}
        }}
      >
        Download
      </ActionsItem>
      {can?.replaceFile && canBeReplaced && (
        <>
          <ActionsItem onClick={openFileDialog}>Replace</ActionsItem>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => handleChange(e)}
            value={''}
          />
        </>
      )}
    </DropdownList>
  )
}
