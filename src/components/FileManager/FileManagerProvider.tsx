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
import React, { createContext } from 'react'

import { DeleteModel, FileManagement, SaveModel } from './FileManager'

export const FileManagerContext = createContext<{
  saveModel: SaveModel
  deleteModel: DeleteModel
  modelMap: Map<string, Model>
  fileManagement: FileManagement
}>({
  // @ts-ignore
  saveModel: () => '',
})

export const FileManagerProvider: React.FC<{
  saveModel: SaveModel
  deleteModel: DeleteModel
  modelMap: Map<string, Model>
  fileManagement: FileManagement
  children: React.ReactNode
}> = ({ children, saveModel, deleteModel, modelMap, fileManagement }) => {
  return (
    <FileManagerContext.Provider
      value={{
        saveModel,
        deleteModel,
        modelMap,
        fileManagement,
      }}
    >
      {children}
    </FileManagerContext.Provider>
  )
}
