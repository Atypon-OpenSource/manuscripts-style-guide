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
import React from 'react'

import { Capabilities } from '../../lib/capabilities'
import AudioIcon from '../icons/audio-icon'
import CodeFileIcon from '../icons/code-file-icon'
import CompressedFileIcon from '../icons/compressed-file-icon'
import DocumentIcon from '../icons/document-icon'
import FigureIcon from '../icons/figure-icon'
import GraphicalAbstractIcon from '../icons/graphical_abstract_icon'
import ImageIcon from '../icons/image-icon'
import LatexIcon from '../icons/latex-icon'
import PdfFileIcon from '../icons/pdf-file-icon'
import TableIcon from '../icons/table-icon'
import UnknownFormatFileIcon from '../icons/unknown-format-file-icon'
import VideoIcon from '../icons/video-icon'
import { Maybe } from '../SubmissionInspector/types'
import { SubmissionAttachment } from './FileSectionItem/FileSectionItem'

export enum FileSectionType {
  Inline,
  Supplements,
  OtherFile,
}

export enum FileType {
  Image,
  Audio,
  Video,
  PlainDocument,
  SheetsWorkbooks,
  Latex,
  CodeFile,
  PdfFile,
  CompressedFile,
  PlainText,
  Figure,
  GraphicalAbstract,
}

export enum Designation {
  Figure,
  Table,
  Supplementary,
  ConflictOfInterest,
  Document,
  GraphicalAbstract,
  GraphicalAbstractImage,
  GraphicalAbstractText,
  Metadata,
  SubmissionFile,
  SubmissionPdf,
  TitlePage,
  Dataset,
  MainManuscript,
}

export const designationWithFileSectionsMap = new Map<
  Designation,
  FileSectionType
>([
  [Designation.Figure, FileSectionType.OtherFile],
  [Designation.Table, FileSectionType.OtherFile],

  [Designation.Supplementary, FileSectionType.Supplements],

  [Designation.ConflictOfInterest, FileSectionType.OtherFile],
  [Designation.Document, FileSectionType.OtherFile],
  [Designation.GraphicalAbstract, FileSectionType.OtherFile],
  [Designation.GraphicalAbstractImage, FileSectionType.OtherFile],
  [Designation.GraphicalAbstractText, FileSectionType.OtherFile],
  [Designation.Metadata, FileSectionType.OtherFile],
  [Designation.SubmissionFile, FileSectionType.OtherFile],
  [Designation.SubmissionPdf, FileSectionType.OtherFile],
  [Designation.TitlePage, FileSectionType.OtherFile],
  [Designation.Dataset, FileSectionType.OtherFile],
  [Designation.MainManuscript, FileSectionType.OtherFile],
])

export const namesWithDesignationMap = new Map<
  Maybe<string> | undefined,
  Designation
>([
  ['figure', Designation.Figure],
  ['table', Designation.Table],

  ['supplementary', Designation.Supplementary],

  ['conflict-of-interest', Designation.ConflictOfInterest],
  ['document', Designation.Document],
  ['graphical-abstract', Designation.GraphicalAbstract],
  ['graphical-abstract-image', Designation.GraphicalAbstractImage],
  ['graphical-abstract-text', Designation.GraphicalAbstractText],
  ['metadata', Designation.Metadata],
  ['submission-file', Designation.SubmissionFile],
  ['submission-pdf', Designation.SubmissionPdf],
  ['title-page', Designation.TitlePage],
  ['dataset', Designation.Dataset],
  ['main-manuscript', Designation.MainManuscript],
])

export const designationWithReadableNamesMap = new Map<Designation, string>([
  [Designation.Figure, 'Figure'],
  [Designation.Table, 'Table'],

  [Designation.Supplementary, 'Supplementary'],

  [Designation.ConflictOfInterest, 'Conflict Of Interest'],
  [Designation.Document, 'Document'],
  [Designation.GraphicalAbstract, 'Graphical Abstract'],
  [Designation.GraphicalAbstractImage, 'Graphical Abstract Image'],
  [Designation.GraphicalAbstractText, 'Graphical Abstract Text'],
  [Designation.Metadata, 'Metadata'],
  [Designation.SubmissionFile, 'Submission File'],
  [Designation.SubmissionPdf, 'Submission PDF'],
  [Designation.TitlePage, 'Title Page'],
  [Designation.Dataset, 'Dataset'],
  [Designation.MainManuscript, 'Main Manuscript'],
])

export const designationWithAllowedMediaTypesMap = new Map<
  Designation,
  Array<string>
>([
  [Designation.Figure, ['jpeg', 'png', 'tiff', 'pdf', 'svg', 'ai']],
  [
    Designation.Table,
    ['xls', 'csv', 'tsv', 'tex', 'html', 'jpeg', 'jpg', 'png', 'gif', 'tiff'],
  ],

  [Designation.Supplementary, []],

  [Designation.ConflictOfInterest, ['doc', 'docx', 'pdf', 'tex', 'txt']],
  [Designation.Document, ['doc', 'docx', 'pdf', 'tex']],
  [Designation.GraphicalAbstract, ['doc', 'docx', 'pdf', 'tex', 'txt']],
  [
    Designation.GraphicalAbstractImage,
    ['jpeg', 'png', 'tiff', 'gif', 'pdf', 'eps'],
  ],
  [Designation.GraphicalAbstractText, ['doc', 'docx', 'pdf', 'tex', 'txt']],
  [Designation.Metadata, ['xml']],
  [Designation.SubmissionFile, []],
  [Designation.SubmissionPdf, ['pdf']],
  [Designation.TitlePage, ['doc', 'docx', 'pdf', 'tex', 'txt']],
  [Designation.Dataset, []],
  [Designation.MainManuscript, ['manuproj', 'docx']],
])

export const designationWithAllowedDesignationsToTransitionMap = new Map<
  Designation,
  Array<Designation>
>([
  [
    Designation.Figure,
    [
      Designation.SubmissionFile,
      Designation.Supplementary,
      Designation.GraphicalAbstractImage,
      Designation.Dataset,
    ],
  ],
  [
    Designation.Table,
    [
      Designation.Supplementary,
      Designation.SubmissionFile,
      Designation.Dataset,
    ],
  ],

  [
    Designation.Supplementary,
    [
      Designation.Supplementary,
      Designation.SubmissionFile,
      Designation.Document,
      Designation.Figure,
      Designation.GraphicalAbstractImage,
      Designation.ConflictOfInterest,
      Designation.SubmissionPdf,
      Designation.Metadata,
      Designation.GraphicalAbstractText,
      Designation.GraphicalAbstract,
      Designation.TitlePage,
      Designation.Table,
      Designation.Dataset,
    ],
  ],

  [
    Designation.ConflictOfInterest,
    [
      Designation.ConflictOfInterest,
      Designation.Document,
      Designation.GraphicalAbstract,
      Designation.GraphicalAbstractImage,
      Designation.GraphicalAbstractText,
      Designation.Metadata,
      Designation.SubmissionFile,
      Designation.SubmissionPdf,
      Designation.Dataset,
    ],
  ],
  [
    Designation.Document,
    [
      Designation.ConflictOfInterest,
      Designation.Document,
      Designation.GraphicalAbstract,
      Designation.GraphicalAbstractImage,
      Designation.GraphicalAbstractText,
      Designation.Metadata,
      Designation.SubmissionFile,
      Designation.SubmissionPdf,
      Designation.MainManuscript,
      Designation.Dataset,
    ],
  ],
  [
    Designation.GraphicalAbstract,
    [
      Designation.Document,
      Designation.SubmissionFile,
      Designation.Supplementary,
      Designation.Dataset,
    ],
  ],
  [
    Designation.GraphicalAbstractImage,
    [
      Designation.Figure,
      Designation.SubmissionFile,
      Designation.Supplementary,
      Designation.Dataset,
    ],
  ],
  [
    Designation.GraphicalAbstractText,
    [
      Designation.Document,
      Designation.SubmissionFile,
      Designation.Supplementary,
      Designation.Dataset,
    ],
  ],
  [Designation.Metadata, [Designation.SubmissionFile, Designation.Dataset]],
  [
    Designation.SubmissionFile,
    [
      Designation.Supplementary,
      Designation.SubmissionFile,
      Designation.Document,
      Designation.Figure,
      Designation.GraphicalAbstractImage,
      Designation.ConflictOfInterest,
      Designation.SubmissionPdf,
      Designation.Metadata,
      Designation.GraphicalAbstractText,
      Designation.GraphicalAbstract,
      Designation.TitlePage,
      Designation.Table,
      Designation.Dataset,
    ],
  ],
  [
    Designation.SubmissionPdf,
    [
      Designation.ConflictOfInterest,
      Designation.Document,
      Designation.GraphicalAbstract,
      Designation.GraphicalAbstractImage,
      Designation.GraphicalAbstractText,
      Designation.Metadata,
      Designation.SubmissionFile,
      Designation.SubmissionPdf,
      Designation.Dataset,
    ],
  ],
  [
    Designation.TitlePage,
    [
      Designation.Document,
      Designation.SubmissionFile,
      Designation.Supplementary,
      Designation.Dataset,
    ],
  ],
  [
    Designation.Dataset,
    [
      Designation.Supplementary,
      Designation.SubmissionFile,
      Designation.Document,
      Designation.Figure,
      Designation.GraphicalAbstractImage,
      Designation.ConflictOfInterest,
      Designation.SubmissionPdf,
      Designation.Metadata,
      Designation.GraphicalAbstractText,
      Designation.GraphicalAbstract,
      Designation.TitlePage,
      Designation.Table,
    ],
  ],
])

export const extensionsWithFileTypesMap = new Map<string, FileType>([
  ['png', FileType.Image],
  ['jpg', FileType.Image],
  ['jpeg', FileType.Image],
  ['gif', FileType.Image],
  ['svg', FileType.Image],
  ['tif', FileType.Image],
  ['tiff', FileType.Image],

  ['mp3', FileType.Audio],
  ['wav', FileType.Audio],
  ['wma', FileType.Audio],
  ['flac', FileType.Audio],

  ['avi', FileType.Video],
  ['mp4', FileType.Video],
  ['mov', FileType.Video],
  ['wmv', FileType.Video],

  ['doc', FileType.PlainDocument],
  ['docx', FileType.PlainDocument],
  ['rtf', FileType.PlainDocument],

  ['xls', FileType.SheetsWorkbooks],
  ['xlsx', FileType.SheetsWorkbooks],
  ['xml', FileType.SheetsWorkbooks],

  ['tex', FileType.Latex],

  ['js', FileType.CodeFile],
  ['py', FileType.CodeFile],
  ['tsx', FileType.CodeFile],
  ['html', FileType.CodeFile],

  ['pdf', FileType.PdfFile],

  ['zip', FileType.CompressedFile],
  ['rar', FileType.CompressedFile],
  ['arj', FileType.CompressedFile],
  ['tar.gz', FileType.CompressedFile],
  ['tgz', FileType.CompressedFile],

  ['txt', FileType.PlainText],
])

export const fileTypesWithTitlesMap = new Map<FileType | undefined, string>([
  [FileType.Image, 'Image'],
  [FileType.Audio, 'Audio'],
  [FileType.Video, 'Video'],
  [FileType.PlainDocument, 'Doc'],
  [FileType.SheetsWorkbooks, 'Table'],
  [FileType.Latex, 'Doc'],
  [FileType.CodeFile, 'Code File'],
  [FileType.PdfFile, 'Doc'],
  [FileType.CompressedFile, 'Compressed File'],
  [FileType.PlainText, 'Plain Text'],
  [undefined, 'Unknown'],
])

export const fileTypesWithIconMap = new Map<FileType | undefined, JSX.Element>([
  [FileType.Audio, <AudioIcon key={FileType.Audio} />],
  [FileType.Video, <VideoIcon key={FileType.Video} />],
  [
    FileType.PlainDocument,
    <DocumentIcon key={FileType.PlainDocument} color="#1A9BC7" />,
  ],
  [FileType.SheetsWorkbooks, <TableIcon key={FileType.SheetsWorkbooks} />],
  [FileType.Latex, <LatexIcon key={FileType.Latex} color="#1A9BC7" />],
  [FileType.CodeFile, <CodeFileIcon key={FileType.CodeFile} />],
  [FileType.PdfFile, <PdfFileIcon key={FileType.PdfFile} />],
  [
    FileType.CompressedFile,
    <CompressedFileIcon key={FileType.CompressedFile} />,
  ],
  [
    FileType.PlainText,
    <DocumentIcon key={FileType.PlainText} color="#FFBD26" />,
  ],
  [FileType.Image, <ImageIcon key={FileType.Image} />],
  [FileType.Figure, <FigureIcon key={FileType.Figure} />],
  [
    FileType.GraphicalAbstract,
    <GraphicalAbstractIcon key={FileType.GraphicalAbstract} />,
  ],
  [undefined, <UnknownFormatFileIcon key={undefined} />],
])

/**
 * In this method we generate the item title based on file type with counter.
 */
export const generateAttachmentsTitles = (
  externalFiles: SubmissionAttachment[],
  fileSectionType: FileSectionType
): Array<{ title: string; externalFile: SubmissionAttachment }> => {
  const titleCountersMap: Map<string, number> = new Map<string, number>()

  const externalFilesWithTitlesMap: Map<string, SubmissionAttachment> = new Map<
    string,
    SubmissionAttachment
  >()

  externalFiles.forEach((element) => {
    const fileExtension = element.name.substring(
      element.name.lastIndexOf('.') + 1
    )

    const fileType = extensionsWithFileTypesMap.get(fileExtension.toLowerCase())

    const fileTitle = fileTypesWithTitlesMap.get(fileType)
    if (fileSectionType === FileSectionType.Inline) {
      externalFilesWithTitlesMap.set(element.name, element)
    } else {
      if (fileTitle !== undefined) {
        const oldCount = titleCountersMap.get(fileTitle)
        if (oldCount) {
          const newCount = oldCount + 1
          titleCountersMap.set(fileTitle, newCount)
          externalFilesWithTitlesMap.set(`${fileTitle} ${newCount}`, element)
        } else {
          titleCountersMap.set(fileTitle, 1)
          externalFilesWithTitlesMap.set(`${fileTitle} 1`, element)
        }
      }
    }
  })

  const result = Array.from(externalFilesWithTitlesMap, ([key, value]) => ({
    title: key,
    externalFile: value,
  }))

  return result
}

export const getDesignationActionsList = (
  designation: Designation,
  fileExtension: string
): Array<Designation> => {
  const allowedDesignationsToTransition =
    designationWithAllowedDesignationsToTransitionMap.get(designation)

  if (allowedDesignationsToTransition) {
    if (
      designation === Designation.Supplementary ||
      designation === Designation.SubmissionFile
    ) {
      return allowedDesignationsToTransition
    } else {
      allowedDesignationsToTransition.filter((value) => {
        const allowedMediaTypes = designationWithAllowedMediaTypesMap.get(value)
        if (allowedMediaTypes) {
          return allowedMediaTypes.indexOf(fileExtension) !== -1
        } else {
          return false
        }
      })
      return allowedDesignationsToTransition
    }
  } else {
    return []
  }
}
export const getDesignationName = (designation: Designation): string => {
  let result = undefined
  namesWithDesignationMap.forEach((value, key, map) => {
    if (value === designation) {
      result = key
    }
  })
  if (result == undefined) {
    result = ''
  }
  return result
}
export const getDesignationByFileSection = (
  fileSectionType: FileSectionType
): Array<Designation> => {
  const result = new Array<Designation>()
  designationWithFileSectionsMap.forEach((value, key, map) => {
    if (value === fileSectionType) {
      result.push(key)
    }
  })
  return result
}

export const getUploadFileDesignationList = (
  fileExtension: string,
  fileSectionType: FileSectionType | Designation[],
  can: Capabilities | null
): Array<{ value: number; label: string }> => {
  const result = new Array<{ value: number; label: string }>()

  const checkDesignation = (value: Designation) => {
    if (value === Designation.MainManuscript && !can?.setMainManuscript) {
      return
    }
    const allowedExtension = designationWithAllowedMediaTypesMap.get(value)
    const isAllowed = allowedExtension?.includes(fileExtension)
    if (
      isAllowed ||
      value === Designation.Supplementary ||
      value === Designation.SubmissionFile ||
      value === Designation.Dataset
    ) {
      const label = designationWithReadableNamesMap.get(value)
      if (label) {
        result.push({
          value: value,
          label: label,
        })
      }
    }
  }
  if (typeof fileSectionType === 'number') {
    const allowedDesignationByFileSection =
      getDesignationByFileSection(fileSectionType)
    allowedDesignationByFileSection.forEach(checkDesignation)
  } else if (Array.isArray(fileSectionType)) {
    designationWithFileSectionsMap.forEach((value, key) => {
      if (fileSectionType.includes(key)) {
        checkDesignation(key)
      }
    })
  }

  return result
}

export const droppableSections = [
  FileSectionType.Supplements,
  FileSectionType.OtherFile,
]
