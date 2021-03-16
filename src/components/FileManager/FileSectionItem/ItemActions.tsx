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
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import { ActionsBox, ActionsItem } from '../ItemsAction'

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
  ) => void
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
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0]
      setSelectedFile(file)
    }
  }
  const openFileDialog = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  useEffect(() => {
    if (selectedFile) {
      //todo replace the dummy data with correct one after connect the component on real data and its part from this ticket MAN-610.
      replaceAttachmentHandler(
        submissionId,
        fileName,
        selectedFile,
        attachmentDesignation
      )
    }
  }, [
    selectedFile,
    replaceAttachmentHandler,
    submissionId,
    fileName,
    attachmentDesignation,
  ])
  return (
    <ActionsBox>
      <ActionsItem
        onClick={() => {
          publicUrl !== undefined ? downloadAttachmentHandler(publicUrl) : {}
        }}
      >
        Download
      </ActionsItem>
      <>
        <ActionsItem onClick={openFileDialog}>Replace</ActionsItem>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => handleChange(e)}
        />
      </>
    </ActionsBox>
  )
}
