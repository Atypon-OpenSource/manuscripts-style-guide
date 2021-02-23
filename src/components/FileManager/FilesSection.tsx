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

import { DragItemArea } from './DragItemArea'
import { DraggableFileSectionItem } from './FileSectionItem/DraggableFileSectionItem'
import {
  FileSectionItem,
  FileSectionItemProps,
} from './FileSectionItem/FileSectionItem'
import { UploadFileArea } from './UploadFileArea'
import {
  Designation,
  designationWithFileSectionsMap,
  FileSectionType,
  generateExternalFilesTitles,
  namesWithDesignationMap,
  sortExternalFiles,
} from './util'

/**
 *  This component represents the other files in the file section.
 */
export const FilesSection: React.FC<{
  externalFiles: ExternalFile[]
  enableDragAndDrop: boolean
  handleUpload: (submissionId: string, file: File, designation: string) => void
  handleDownload: (url: string) => void
  handleReplace: (submissionId: string, file: File, name: string) => void
  changeDesignationHandler: (
    submissionId: string,
    file: File,
    designation: string | undefined
  ) => void
  fileSectionDesignation: FileSectionType
}> = ({
  externalFiles,
  enableDragAndDrop,
  handleUpload,
  handleDownload,
  handleReplace,
  changeDesignationHandler,
  fileSectionDesignation,
}) => {
  const isInlineFilesTab = fileSectionDesignation === FileSectionType.Inline

  const isSupplementFilesTab =
    fileSectionDesignation === FileSectionType.Supplements

  const isOtherFileTab = fileSectionDesignation === FileSectionType.OtherFile

  const showAttachmentNameAndDesignationActions =
    isSupplementFilesTab || isOtherFileTab

  // Here we are filtering the external files to extract the other-files based on the designation.
  const itemsData = externalFiles.filter((element) => {
    const designation: Designation | undefined = namesWithDesignationMap.get(
      element.designation
    )
    return (
      designation !== undefined &&
      designationWithFileSectionsMap.get(designation) === fileSectionDesignation
    )
  })

  // Generating a title for the external files and sorting the external files based on the generated title
  const itemsDataWithTitle = sortExternalFiles(
    generateExternalFilesTitles(itemsData)
  )

  const filesItems = itemsDataWithTitle.map((element) => {
    const itemProps: FileSectionItemProps = {
      externalFile: element.externalFile,
      title: element.title,
      showAttachmentName: showAttachmentNameAndDesignationActions,
      showDesignationActions: showAttachmentNameAndDesignationActions,
      handleDownload: handleDownload,
      handleReplace: handleReplace,
      changeDesignationHandler: changeDesignationHandler,
    }

    if (enableDragAndDrop && (isSupplementFilesTab || isOtherFileTab)) {
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

  return (
    <div>
      <UploadFileArea uploadFileHandler={handleUpload} />
      {filesItems}
      {enableDragAndDrop && (isSupplementFilesTab || isOtherFileTab) && (
        <DragItemArea
          text={
            isSupplementFilesTab
              ? 'Drag the items to place them in the text'
              : 'Drag the items to place in the Supplements section or in the text'
          }
        />
      )}
    </div>
  )
}
