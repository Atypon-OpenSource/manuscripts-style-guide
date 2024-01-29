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
import { Model } from '@manuscripts/json-schema'
import { Build } from '@manuscripts/transform'
import React, { createContext } from 'react'

import { FileSectionType, useFiles } from '../../index'
import { Capabilities } from '../../lib/capabilities'
import { FileAttachment } from '../../lib/files'
import {
  InspectorTab,
  InspectorTabList,
  InspectorTabPanel,
  InspectorTabPanels,
  InspectorTabs,
} from '../Inspector'
import { InspectorSection } from '../InspectorSection'
import { DragLayer } from './DragLayer'
import { FileManagerProvider } from './FileManagerProvider'
import { InlineFilesSection } from './InlineFilesSection'
import { OtherFilesSection } from './OtherFilesSection'
import { SupplementsSection } from './SupplementsSection'
import { Tooltip } from './Tooltip'

export type Upload = (file: File) => Promise<FileAttachment>

export type Download = (file: FileAttachment) => void

export type PreviewLink = (file: FileAttachment) => string | undefined

export type Replace = (file: File) => Promise<void>

export type Move = {
  sectionType: FileSectionType
  handler: () => Promise<void>
}

export interface FileManagement {
  upload: Upload
  download: Download
  previewLink: PreviewLink
}

export type SaveModel = <T extends Model>(
  model: T | Build<T> | Partial<T>
) => Promise<T>

export type DeleteModel = (id: string) => Promise<string>

/**
 * This is the main component of the file handling
 * that should be called in the inspector,
 * and it expects to receive an array of submission attachments
 * and use Drag-and-Drop technique for manuscript-frontend inspector.
 *
 * File section component consist of three types of files which is:
 * 1- Inline files.
 * 2- Supplemental files.
 * 3- Other files.
 */

export const PermissionsContext = createContext<null | Capabilities>(null)

export const FileManager: React.FC<{
  files: FileAttachment[]
  fileManagement: FileManagement
  modelMap: Map<string, Model>
  saveModel: SaveModel
  deleteModel: DeleteModel
  enableDragAndDrop: boolean
  can: Capabilities
}> = ({
  files,
  fileManagement,
  modelMap,
  saveModel,
  deleteModel,
  enableDragAndDrop,
  can,
}) => {
  const { inlineFiles, supplements, otherFiles } = useFiles(modelMap, files)

  return (
    <FileManagerProvider
      saveModel={saveModel}
      deleteModel={deleteModel}
      modelMap={modelMap}
      fileManagement={fileManagement}
    >
      <DragLayer />
      <PermissionsContext.Provider value={can}>
        <InspectorSection
          title={'Files'}
          contentStyles={{ margin: '24px 16px' }}
        >
          <InspectorTabs
            defaultIndex={0}
            data-cy="files-tabs"
            style={{ overflow: 'visible' }}
          >
            <InspectorTabList>
              <InspectorTab data-for="inline" data-tip={true}>
                Inline files
              </InspectorTab>
              <Tooltip
                id="inline"
                place="bottom"
                offset={{ bottom: -11 }}
                effect="solid"
                className="tooltip"
              >
                Files that can be found inline in the manuscript.
              </Tooltip>
              <InspectorTab data-for="supplements" data-tip={true}>
                Supplements
              </InspectorTab>
              <Tooltip
                id="supplements"
                place="bottom"
                offset={{ bottom: -11 }}
                effect="solid"
                className="tooltip"
              >
                Files that were marked as supplements.
              </Tooltip>
              <InspectorTab data-for="other" data-tip={true}>
                Other files
              </InspectorTab>
              <Tooltip
                id="other"
                place="bottom"
                offset={{ bottom: -11 }}
                effect="solid"
                className="tooltip"
              >
                Files excluded from the final submission.
              </Tooltip>
            </InspectorTabList>
            <InspectorTabPanels
              style={{ overflowY: 'visible', position: 'relative' }}
            >
              <InspectorTabPanel data-cy="inline">
                <InlineFilesSection
                  elements={inlineFiles}
                  isEditor={enableDragAndDrop}
                />
              </InspectorTabPanel>
              <InspectorTabPanel data-cy="supplements">
                <SupplementsSection supplements={supplements} />
              </InspectorTabPanel>
              <InspectorTabPanel data-cy="other">
                <OtherFilesSection files={otherFiles} />
              </InspectorTabPanel>
            </InspectorTabPanels>
          </InspectorTabs>
        </InspectorSection>
      </PermissionsContext.Provider>
    </FileManagerProvider>
  )
}
