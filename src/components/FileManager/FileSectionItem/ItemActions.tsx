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
import { PermissionsContext, Replace } from '../FileManager'
import { FileManagerContext } from '../FileManagerProvider'
import { Action, actions } from '../FileSectionState'
import { ActionsItem } from '../ItemsAction'
import { FileSectionType } from '../util'
import { FileAttachment } from './FileSectionItem'

/**
 * This component represents the drop-down list action for each file item.
 */
export const ItemActions: React.FC<{
  fileSection: FileSectionType
  isMainManuscript?: boolean
  downloadAttachmentHandler: (url: string) => void
  replaceAttachmentHandler: Replace
  detachAttachmnetHandler?: () => void
  handleUpdateInline?: (attachment: FileAttachment) => void
  handleSupplementReplace?: (
    attachment: FileAttachment,
    oldAttachmentId: string
  ) => void
  attachmentId: string
  fileName: string
  publicUrl: string | undefined
  hideActionList: (e?: React.MouseEvent) => void
  dispatch?: Dispatch<Action>
  dropDownClassName?: string
  showReplaceAction?: boolean
}> = ({
  fileSection,
  isMainManuscript,
  downloadAttachmentHandler,
  replaceAttachmentHandler,
  handleSupplementReplace,
  detachAttachmnetHandler,
  handleUpdateInline,
  attachmentId,
  fileName,
  publicUrl,
  hideActionList,
  dispatch,
  dropDownClassName,
  showReplaceAction,
}) => {
  const can = useContext(PermissionsContext)
  const { setMoveFilePopupData } = useContext(FileManagerContext)

  const canBeReplaced = showReplaceAction == undefined || showReplaceAction
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File>()
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0]
      setSelectedFile(file)
      if (dispatch) {
        dispatch(actions.HANDLE_UPLOAD_ACTION())
      }
      const result = await replaceAttachmentHandler(
        attachmentId,
        fileName,
        file
      )

      if (
        fileSection === FileSectionType.Supplements &&
        typeof result === 'object' &&
        handleSupplementReplace
      ) {
        handleSupplementReplace(result, attachmentId)
      }

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
      width={200}
      height={120}
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
      {can?.editArticle && detachAttachmnetHandler && (
        <ActionsItem onClick={() => detachAttachmnetHandler()}>
          Detach
        </ActionsItem>
      )}

      {!isMainManuscript && (
        <ActionsItem
          onClick={() =>
            setMoveFilePopupData({ isOpen: true, attachmentId, fileSection })
          }
        >
          Move to{' '}
          {(fileSection === FileSectionType.OtherFile && 'Supplements') ||
            'Other files'}
        </ActionsItem>
      )}
    </DropdownList>
  )
}
