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
import { ExternalFile } from '@manuscripts/manuscripts-json-schema'
import React, { useCallback, useReducer } from 'react'
import ReactTooltip from 'react-tooltip'

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
} from './FileSectionItem/FileSectionItem'
import { actions, getInitialState, reducer } from './FileSectionState'
import { FilesSection } from './FilesSection'
import { TooltipDiv } from './TooltipDiv'
import {
  Designation,
  designationWithFileSectionsMap,
  FileSectionType,
  generateExternalFilesTitles,
  namesWithDesignationMap,
  sortExternalFiles,
} from './util'

/**
 * This is the main component of the file handling
 * that should be called in the inspector,
 * and it expects to receive an array of external files
 * and use Drag-and-Drop technique for manuscript-frontend inspector.
 *
 * File section component consist of three types of files which is:
 * 1- Inline files.
 * 2- Supplemental files.
 * 3- Other files.
 */
export const FileManager: React.FC<{
  submissionId: string
  externalFiles: ExternalFile[]
  enableDragAndDrop: boolean
  handleUpload: (
    submissionId: string,
    file: File,
    designation: string
  ) => Promise<boolean>
  handleDownload: (url: string) => void
  handleReplace: (
    submissionId: string,
    name: string,
    file: File,
    typeId: string
  ) => Promise<boolean>
  handleChangeDesignation: (
    submissionId: string,
    typeId: string,
    name: string
  ) => Promise<boolean>
}> = ({
  submissionId,
  externalFiles,
  enableDragAndDrop,
  handleUpload,
  handleDownload,
  handleReplace,
  handleChangeDesignation,
}) => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const handleReplaceFile = useCallback(
    (submissionId, name, file, typeId) => {
      return handleReplace(submissionId, name, file, typeId)
    },
    [handleReplace]
  )
  const handleUploadFile = useCallback(
    async (submissionId, file, designation) => {
      try {
        dispatch(actions.HANDLE_UPLOAD_ACTION())
        if (
          namesWithDesignationMap.get(designation) == Designation.Supplementary
        ) {
          dispatch(actions.SELECT_DESIGNATION(Designation.Supplementary))
        }
        const res = await handleUpload(submissionId, file, designation)
        dispatch(actions.HANDLE_FINISH_UPLOAD())
        return res
      } catch (e) {
        console.error(e)
        return false
      }
    },
    [handleUpload]
  )
  const handleChangeDesignationFile = useCallback(
    async (submissionId, typeId, name) => {
      try {
        const res = await handleChangeDesignation(submissionId, typeId, name)
        if (res) {
          dispatch(actions.HANDLE_SUCCESS_MESSAGE())
        }
        return res
      } catch (e) {
        console.log(e)
        return false
      }
    },
    [handleChangeDesignation]
  )
  const handleDownloadFile = useCallback(
    (publicUrl) => {
      return handleDownload(publicUrl)
    },
    [handleDownload]
  )

  const getFileSectionExternalFile = (
    fileSection: FileSectionType
  ): JSX.Element[] => {
    const isSupplementOrOtherFilesTab =
      fileSection === FileSectionType.Supplements ||
      fileSection === FileSectionType.OtherFile
    // Here we are filtering the external files to extract the other-files based on the designation.
    const itemsData = externalFiles.filter((element) => {
      const designation: Designation | undefined = namesWithDesignationMap.get(
        element.designation
      )
      return (
        designation !== undefined &&
        designationWithFileSectionsMap.get(designation) === fileSection
      )
    })

    // Generating a title for the external files and sorting the external files based on the generated title
    const itemsDataWithTitle = sortExternalFiles(
      generateExternalFilesTitles(itemsData, fileSection)
    )

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
            key={element.externalFile._id}
          />
        )
      } else {
        return <FileSectionItem {...itemProps} key={element.externalFile._id} />
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
      <InspectorSection title={'Files'}>
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
              <FilesSection
                submissionId={submissionId}
                enableDragAndDrop={false}
                handleUpload={handleUploadFile}
                fileSection={FileSectionType.Inline}
                filesItem={getFileSectionExternalFile(FileSectionType.Inline)}
                state={state}
                dispatch={dispatch}
              />
            </InspectorTabPanel>
            <InspectorTabPanel>
              <FilesSection
                submissionId={submissionId}
                enableDragAndDrop={enableDragAndDrop}
                handleUpload={handleUploadFile}
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
      {state.isShowSuccessMessage &&
        state.successMessage !== '' &&
        handleSuccessMessage()}
    </>
  )
}
