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
import {
  Figure,
  Model,
  ObjectTypes,
  Supplement,
} from '@manuscripts/json-schema'
import {
  Build,
  buildSupplementaryMaterial,
  getModelsByType,
} from '@manuscripts/transform'
import React, { createContext, useCallback, useReducer } from 'react'
import ReactTooltip from 'react-tooltip'

import { FileSectionType, useFiles } from '../../index'
import { Capabilities } from '../../lib/capabilities'
import {
  InspectorTab,
  InspectorTabList,
  InspectorTabPanel,
  InspectorTabPanels,
  InspectorTabs,
} from '../Inspector'
import { InspectorSection } from '../InspectorSection'
import { DraggableFileSectionItem } from './FileSectionItem/DraggableFileSectionItem'
import { DragLayer } from './FileSectionItem/DragLayer'
import {
  FileSectionItem,
  FileSectionItemProps,
  SubmissionAttachment,
} from './FileSectionItem/FileSectionItem'
import { actions, getInitialState, reducer } from './FileSectionState'
import { FilesSection } from './FilesSection'
import { InlineFilesSection } from './InlineFilesSection'
import { TooltipDiv } from './TooltipDiv'
import {
  Designation,
  generateAttachmentsTitles,
  namesWithDesignationMap,
} from './util'

export type Upload = (
  file: File,
  designation: string
) => Promise<boolean | SubmissionAttachment | undefined>

export type Replace = (
  attachmentId: string,
  name: string,
  file: File,
  typeId: string
) => Promise<boolean | SubmissionAttachment | undefined>

export type ChangeDesignation = (
  attachmentId: string,
  typeId: string,
  name: string
) => Promise<boolean>

export interface FileManagement {
  getAttachments: () => SubmissionAttachment[]
  upload: Upload
  replace: Replace
  changeDesignation: ChangeDesignation
}

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
  fileManagement: FileManagement
  modelMap: Map<string, Model>
  saveModel: <T extends Model>(model: T | Build<T> | Partial<T>) => Promise<T>
  enableDragAndDrop: boolean
  can: Capabilities
  addAttachmentToState?: (a: SubmissionAttachment) => void
}> = ({
  modelMap,
  saveModel,
  enableDragAndDrop,
  can,
  fileManagement: { getAttachments, changeDesignation, replace, upload },
  addAttachmentToState,
}) => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const handleReplaceFile = useCallback(
    async (attachmentId, name, file, typeId) => {
      dispatch(actions.HANDLE_UPLOAD_ACTION())
      dispatch(
        actions.SELECT_DESIGNATION(
          namesWithDesignationMap.get(typeId) || Designation.Document
        )
      )
      const res = await replace(attachmentId, name, file, typeId)
      dispatch(actions.HANDLE_FINISH_UPLOAD())
      if (res) {
        dispatch(actions.HANDLE_SUCCESS_MESSAGE('File uploaded successfully.'))
      }
      return res
    },
    [replace]
  )

  const handleUploadFile = useCallback(
    async (file, designation) => {
      dispatch(actions.HANDLE_UPLOAD_ACTION())
      if (
        namesWithDesignationMap.get(designation) == Designation.Supplementary
      ) {
        dispatch(actions.SELECT_DESIGNATION(Designation.Supplementary))
      }
      const res = await upload(file, designation)
      dispatch(actions.HANDLE_FINISH_UPLOAD())
      if (res) {
        dispatch(
          actions.HANDLE_SUCCESS_MESSAGE(
            'File uploaded successfully.',
            FileSectionType.OtherFile
          )
        )
      }
      return res
    },
    [upload]
  )

  const handleUploadFileWithSupplement = useCallback(
    async (file, designation) => {
      const response = await upload(file, designation)
      if (typeof response === 'object') {
        const { id, name } = response
        await saveModel(buildSupplementaryMaterial(name, `attachment:${id}`))
      }

      dispatch(actions.HANDLE_FINISH_UPLOAD())
      if (response) {
        dispatch(
          actions.HANDLE_SUCCESS_MESSAGE(
            'File uploaded successfully.',
            FileSectionType.Supplements
          )
        )
      }

      return response
    },
    [upload, saveModel]
  )

  const handleSupplementReplace = useCallback(
    async (attachment: SubmissionAttachment) => {
      const model = getModelsByType<Supplement>(
        modelMap,
        ObjectTypes.Supplement
      ).find(({ href }) => href?.replace('attachment:', '') === attachment.id)

      await saveModel<Supplement>({
        ...model,
        title: attachment.name,
        href: `attachment:${attachment.id}`,
      })
    },
    [modelMap, saveModel]
  )

  const handleChangeDesignationFile = useCallback(
    async (attachmentId, typeId, name) => {
      const res = await changeDesignation(attachmentId, typeId, name)
      if (res) {
        dispatch(actions.HANDLE_SUCCESS_MESSAGE(''))
      }
      return res
    },
    [changeDesignation]
  )
  const handleDownload = useCallback((url: string) => {
    window.location.assign(url)
  }, [])

  const handleUpdateInline = useCallback(
    async (modelId: string, attachment: SubmissionAttachment) => {
      const figureModel = modelMap.get(modelId) as Figure
      figureModel.src = `attachment:${attachment.id}`

      if (addAttachmentToState) {
        addAttachmentToState({
          ...attachment,
        })
      }
      await saveModel(figureModel)
    },
    [modelMap, saveModel, addAttachmentToState]
  )

  const attachments = getAttachments()

  const { otherFiles, supplementFiles, inlineFiles } = useFiles(
    modelMap,
    attachments
  )

  const handleDetachFile = (attachmentId: string, modelId: string) => {
    const model = modelMap.get(modelId) as Figure
    if (model) {
      saveModel({
        ...model,
        src: '',
      })
    }
  }

  const getFileSectionExternalFile = (
    fileSection: FileSectionType
  ): JSX.Element[] => {
    const isSupplementOrOtherFilesTab =
      fileSection === FileSectionType.Supplements ||
      fileSection === FileSectionType.OtherFile
    const isOtherFilesTab = fileSection === FileSectionType.OtherFile

    const itemsData =
      (fileSection === FileSectionType.Supplements && supplementFiles) ||
      otherFiles

    // Generating a title for the external files and sorting the external files based on the generated title
    const itemsDataWithTitle = generateAttachmentsTitles(itemsData, fileSection)

    const filesItems = itemsDataWithTitle.map((element) => {
      const itemProps: FileSectionItemProps = {
        fileSection,
        externalFile: element.externalFile,
        title: element.title,
        showAttachmentName: isSupplementOrOtherFilesTab,
        showDesignationActions: isSupplementOrOtherFilesTab,
        showReplaceAction: !isOtherFilesTab,
        handleDownload,
        handleReplace: handleReplaceFile,
        handleSupplementReplace,
        handleChangeDesignation: handleChangeDesignationFile,
        dispatch: dispatch,
      }

      if (enableDragAndDrop && isSupplementOrOtherFilesTab) {
        return (
          <DraggableFileSectionItem
            {...itemProps}
            key={element.externalFile.id}
          />
        )
      } else {
        return (
          <FileSectionItem
            {...itemProps}
            key={element.externalFile.id}
            isEditor={enableDragAndDrop}
          />
        )
      }
    })
    return filesItems
  }

  return (
    <>
      <DragLayer />
      <PermissionsContext.Provider value={can}>
        <InspectorSection title={'Files'} contentStyles={{ margin: '24px' }}>
          <InspectorTabs defaultIndex={0} style={{ overflow: 'visible' }}>
            <InspectorTabList>
              <InspectorTab data-for="inline" data-tip={true}>
                Inline files
              </InspectorTab>
              <TooltipDiv>
                <ReactTooltip
                  id="inline"
                  place="bottom"
                  offset={{ bottom: -11 }}
                  effect="solid"
                  className="tooltip"
                >
                  <div>
                    Files that can be found inline <br /> in the manuscript.
                  </div>
                </ReactTooltip>
              </TooltipDiv>
              <InspectorTab data-for="supplements" data-tip={true}>
                Supplements
              </InspectorTab>
              <TooltipDiv>
                <ReactTooltip
                  id="supplements"
                  place="bottom"
                  offset={{ bottom: -11 }}
                  effect="solid"
                  className="tooltip"
                >
                  <div>Files that were marked as supplementaries.</div>
                </ReactTooltip>
              </TooltipDiv>
              <InspectorTab data-for="other" data-tip={true}>
                Other files
              </InspectorTab>
              <TooltipDiv>
                <ReactTooltip
                  id="other"
                  place="bottom"
                  offset={{ bottom: -11 }}
                  effect="solid"
                  className="tooltip"
                >
                  <div>Files excluded from the final submission.</div>
                </ReactTooltip>
              </TooltipDiv>
            </InspectorTabList>
            <InspectorTabPanels
              style={{ overflowY: 'visible', position: 'relative' }}
            >
              <InspectorTabPanel>
                <InlineFilesSection
                  inlineFiles={inlineFiles}
                  handleReplace={replace}
                  handleDownload={handleDownload}
                  handleUpdateInline={handleUpdateInline}
                  handleDetachFile={handleDetachFile}
                  isEditor={enableDragAndDrop}
                  dispatch={dispatch}
                />
              </InspectorTabPanel>
              <InspectorTabPanel>
                <FilesSection
                  enableDragAndDrop={enableDragAndDrop}
                  handleUpload={handleUploadFileWithSupplement}
                  fileSection={FileSectionType.Supplements}
                  filesItem={getFileSectionExternalFile(
                    FileSectionType.Supplements
                  )}
                  state={state}
                  dispatch={dispatch}
                />
              </InspectorTabPanel>
              <InspectorTabPanel>
                <FilesSection
                  enableDragAndDrop={enableDragAndDrop}
                  handleUpload={handleUploadFile}
                  fileSection={FileSectionType.OtherFile}
                  filesItem={getFileSectionExternalFile(
                    FileSectionType.OtherFile
                  )}
                  state={state}
                  dispatch={dispatch}
                />
              </InspectorTabPanel>
            </InspectorTabPanels>
          </InspectorTabs>
        </InspectorSection>
      </PermissionsContext.Provider>
    </>
  )
}
