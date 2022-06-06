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
  Build,
  buildSupplementaryMaterial,
} from '@manuscripts/manuscript-transform'
import { Model, Supplement } from '@manuscripts/manuscripts-json-schema'
import React, { createContext, useCallback, useMemo, useReducer } from 'react'
import ReactTooltip from 'react-tooltip'

import { Capabilities } from '../../lib/capabilities'
import getInlineFiles, { getSupplementFiles } from '../../lib/inlineFiles'
import { AlertMessage, AlertMessageType } from '../AlertMessage'
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
  designationWithFileSectionsMap,
  FileSectionType,
  generateAttachmentsTitles,
  namesWithDesignationMap,
} from './util'

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
  submissionId: string
  attachments: SubmissionAttachment[]
  modelMap: Map<string, Model>
  saveModel: (model: Build<Supplement>) => Promise<Build<Supplement>>
  enableDragAndDrop: boolean
  can: Capabilities
  handleUpload: (
    submissionId: string,
    file: File,
    designation: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>
  handleDownload: (url: string) => void
  handleReplace: (
    submissionId: string,
    attachmentId: string,
    name: string,
    file: File,
    typeId: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>
  handleChangeDesignation: (
    submissionId: string,
    attachmentId: string,
    typeId: string,
    name: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>
  handleUpdateInline?: (
    modelId: string,
    attachment: SubmissionAttachment
  ) => void
}> = ({
  submissionId,
  attachments,
  modelMap,
  saveModel,
  enableDragAndDrop,
  can,
  handleUpload,
  handleDownload,
  handleReplace,
  handleChangeDesignation,
  handleUpdateInline,
}) => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const handleReplaceFile = useCallback(
    async (submissionId, attachmentId, name, file, typeId) => {
      dispatch(actions.HANDLE_UPLOAD_ACTION())
      dispatch(
        actions.SELECT_DESIGNATION(
          namesWithDesignationMap.get(typeId) || Designation.Document
        )
      )
      const res = await handleReplace(
        submissionId,
        attachmentId,
        name,
        file,
        typeId
      )
      dispatch(actions.HANDLE_FINISH_UPLOAD())
      return res
    },
    [handleReplace]
  )
  const handleUploadFile = useCallback(
    async (submissionId, file, designation) => {
      dispatch(actions.HANDLE_UPLOAD_ACTION())
      if (
        namesWithDesignationMap.get(designation) == Designation.Supplementary
      ) {
        dispatch(actions.SELECT_DESIGNATION(Designation.Supplementary))
      }
      const res = await handleUpload(submissionId, file, designation)
      dispatch(actions.HANDLE_FINISH_UPLOAD())
      return res
    },
    [handleUpload]
  )

  const handleUploadFileWithSupplement = useCallback(
    async (submissionId, file, designation) => {
      const res = (await handleUploadFile(submissionId, file, designation)) as {
        data: { uploadAttachment: SubmissionAttachment }
      }
      if (res && res.data) {
        const { id, name } = res.data.uploadAttachment
        await saveModel(buildSupplementaryMaterial(name, `attachment:${id}`))
      }
      return res
    },
    [handleUploadFile, saveModel]
  )

  const handleChangeDesignationFile = useCallback(
    async (submissionId, attachmentId, typeId, name) => {
      const res = await handleChangeDesignation(
        submissionId,
        attachmentId,
        typeId,
        name
      )
      if (res) {
        dispatch(actions.HANDLE_SUCCESS_MESSAGE())
      }
      return res
    },
    [handleChangeDesignation]
  )
  const handleDownloadFile = useCallback(
    (publicUrl) => {
      return handleDownload(publicUrl)
    },
    [handleDownload]
  )

  const inlineFiles = useMemo(
    () => getInlineFiles(modelMap, attachments),
    // eslint-disable-next-line
    [modelMap.values(), attachments]
  )

  const supplementFiles = useMemo(
    () => getSupplementFiles(modelMap, attachments),
    // eslint-disable-next-line
  [attachments, modelMap.size])

  /**
   * This Set of AttachmentsIds for both inlineFiles and supplement
   * that will not be shown in other files
   */
  const excludedAttachmentsIds = useMemo(() => {
    const attachmentsIDs = new Set<string>()
    inlineFiles.map(({ attachments }) => {
      if (attachments) {
        attachments.map((attachment) => attachmentsIDs.add(attachment.id))
      }
    })
    supplementFiles.map(({ id }) => attachmentsIDs.add(id))
    return attachmentsIDs
  }, [inlineFiles, supplementFiles])

  const getFileSectionExternalFile = (
    fileSection: FileSectionType
  ): JSX.Element[] => {
    const isSupplementOrOtherFilesTab =
      fileSection === FileSectionType.Supplements ||
      fileSection === FileSectionType.OtherFile
    // Here we are filtering the external files to extract the other-files based on the designation.
    const itemsData =
      (fileSection === FileSectionType.Supplements && supplementFiles) ||
      attachments.filter((element) => {
        const designation: Designation | undefined =
          namesWithDesignationMap.get(element.type.label)
        return (
          designation !== undefined &&
          designationWithFileSectionsMap.get(designation) === fileSection &&
          !excludedAttachmentsIds.has(element.id)
        )
      })

    // Generating a title for the external files and sorting the external files based on the generated title
    const itemsDataWithTitle = generateAttachmentsTitles(itemsData, fileSection)

    const filesItems = itemsDataWithTitle.map((element) => {
      const itemProps: FileSectionItemProps = {
        submissionId: submissionId,
        externalFile: element.externalFile,
        title: element.title,
        showAttachmentName: isSupplementOrOtherFilesTab,
        showDesignationActions: isSupplementOrOtherFilesTab,
        handleDownload: handleDownloadFile,
        handleReplace: handleReplaceFile,
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
  const handleSuccessMessage = () => {
    return (
      <AlertMessage type={AlertMessageType.info} hideCloseButton={false}>
        {state.successMessage}
      </AlertMessage>
    )
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
                  submissionId={submissionId}
                  handleReplace={handleReplace}
                  handleDownload={handleDownload}
                  handleUpdateInline={handleUpdateInline}
                  isEditor={enableDragAndDrop}
                  dispatch={dispatch}
                />
              </InspectorTabPanel>
              <InspectorTabPanel>
                <FilesSection
                  submissionId={submissionId}
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
                  submissionId={submissionId}
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
      {state.isShowSuccessMessage &&
        state.successMessage !== '' &&
        handleSuccessMessage()}
    </>
  )
}
