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
import React from 'react'
import ReactTooltip from 'react-tooltip'

import {
  InspectorTab,
  InspectorTabList,
  InspectorTabPanel,
  InspectorTabPanels,
  InspectorTabs,
} from '../Inspector'
import { InspectorSection } from '../InspectorSection'
import { DragLayer } from './FileSectionItem/DragLayer'
import { FilesSection } from './FilesSection'
import { TooltipDiv } from './TooltipDiv'
import { FileSectionType } from './util'
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
  handleUpload: (submissionId: string, file: File, designation: string) => void
  handleDownload: (url: string) => void
  handleReplace: (
    submissionId: string,
    name: string,
    file: File,
    typeId: string
  ) => void
  changeDesignationHandler: (
    submissionId: string,
    typeId: string,
    name: string
  ) => void
}> = ({
  submissionId,
  externalFiles,
  enableDragAndDrop,
  handleUpload,
  handleDownload,
  handleReplace,
  changeDesignationHandler,
}) => {
  return (
    <>
      <DragLayer />
      <InspectorSection title={'Files'}>
        <InspectorTabs defaultIndex={0}>
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
          <InspectorTabPanels>
            <InspectorTabPanel>
              <FilesSection
                submissionId={submissionId}
                externalFiles={externalFiles}
                enableDragAndDrop={false}
                handleUpload={handleUpload}
                handleDownload={handleDownload}
                handleReplace={handleReplace}
                changeDesignationHandler={changeDesignationHandler}
                fileSection={FileSectionType.Inline}
              />
            </InspectorTabPanel>
            <InspectorTabPanel>
              <FilesSection
                submissionId={submissionId}
                externalFiles={externalFiles}
                enableDragAndDrop={enableDragAndDrop}
                handleUpload={handleUpload}
                handleDownload={handleDownload}
                handleReplace={handleReplace}
                changeDesignationHandler={changeDesignationHandler}
                fileSection={FileSectionType.Supplements}
              />
            </InspectorTabPanel>
            <InspectorTabPanel>
              <FilesSection
                submissionId={submissionId}
                externalFiles={externalFiles}
                enableDragAndDrop={enableDragAndDrop}
                handleUpload={handleUpload}
                handleDownload={handleDownload}
                handleReplace={handleReplace}
                changeDesignationHandler={changeDesignationHandler}
                fileSection={FileSectionType.OtherFile}
              />
            </InspectorTabPanel>
          </InspectorTabPanels>
        </InspectorTabs>
      </InspectorSection>
    </>
  )
}
