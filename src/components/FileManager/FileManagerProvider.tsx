/*!
 * © 2023 Atypon Systems LLC
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
import { Model } from '@manuscripts/json-schema'
import { Build } from '@manuscripts/transform'
import React, { createContext, Dispatch, SetStateAction, useState } from 'react'

import { FileAttachment } from './FileSectionItem/FileSectionItem'
import { FileSectionType } from './util'

type MoveFilePopup = {
  isOpen: boolean
  fileSection?: FileSectionType
  attachmentId?: string
}

export const FileManagerContext = createContext<{
  saveModel: <T extends Model>(model: T | Build<T> | Partial<T>) => Promise<T>
  getAttachments: () => FileAttachment[]
  moveFilePopup: MoveFilePopup
  setMoveFilePopupData: Dispatch<SetStateAction<MoveFilePopup>>
}>({
  // @ts-ignore
  saveModel: () => '',
  moveFilePopup: { isOpen: false },
  setMoveFilePopupData: () => '',
})

// TODO:: use this provider for file manager component to avoid props drilling
export const FileManagerProvider: React.FC<{
  saveModel: <T extends Model>(model: T | Build<T> | Partial<T>) => Promise<T>
  getAttachments: () => FileAttachment[]
}> = ({ children, saveModel, getAttachments }) => {
  const [moveFilePopup, setMoveFilePopupData] = useState({ isOpen: false })

  return (
    <FileManagerContext.Provider
      value={{
        saveModel,
        getAttachments,
        moveFilePopup,
        setMoveFilePopupData,
      }}
    >
      {children}
    </FileManagerContext.Provider>
  )
}
