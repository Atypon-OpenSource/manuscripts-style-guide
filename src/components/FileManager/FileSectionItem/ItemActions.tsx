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
import React, { ChangeEvent, useContext, useRef, useState } from 'react'

import { DropdownList } from '../../Dropdown'
import { PermissionsContext } from '../FileManager'
import { ActionsItem } from '../ItemsAction'

/**
 * This component represents the drop-down list action for each file item.
 */
export const ItemActions: React.FC<{
  downloadAttachmentHandler: (url: string) => void
  replaceAttachmentHandler: (
    submissionId: string,
    name: string,
    file: File,
    typeId: string
  ) => Promise<boolean>
  submissionId: string
  fileName: string
  designation?: string | undefined
  publicUrl: string | undefined
  hideActionList: () => void
}> = ({
  downloadAttachmentHandler,
  replaceAttachmentHandler,
  submissionId,
  fileName,
  designation,
  publicUrl,
  hideActionList,
}) => {
  const attachmentDesignation =
    designation == undefined ? 'undefined' : designation
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File>()
  const can = useContext(PermissionsContext)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0]
      setSelectedFile(file)
      replaceAttachmentHandler(
        submissionId,
        fileName,
        file,
        attachmentDesignation
      )
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
      {can?.replaceFile && (
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
