/*!
 * © 2024 Atypon Systems LLC
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

import {
  FileAudioIcon,
  FileCodeIcon,
  FileCompressedIcon,
  FileDocumentIcon,
  FileFigureIcon,
  FileGraphicalAbstractIcon,
  FileImageIcon,
  FileLatexIcon,
  FilePdfIcon,
  FileTableIcon,
  FileUnknownIcon,
  FileVideoIcon,
} from '../components/icons'

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

const extension2type = new Map<string, FileType>([
  ['png', FileType.Image],
  ['jpg', FileType.Image],
  ['jpeg', FileType.Image],
  ['jfif', FileType.Image],
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

const type2icon = new Map<FileType | undefined, JSX.Element>([
  [
    FileType.Audio,
    <FileAudioIcon key={FileType.Audio} className="file-icon" />,
  ],
  [
    FileType.Video,
    <FileVideoIcon key={FileType.Video} className="file-icon" />,
  ],
  [
    FileType.PlainDocument,
    <FileDocumentIcon
      key={FileType.PlainDocument}
      color="#1A9BC7"
      className="file-icon"
    />,
  ],
  [
    FileType.SheetsWorkbooks,
    <FileTableIcon key={FileType.SheetsWorkbooks} className="file-icon" />,
  ],
  [
    FileType.Latex,
    <FileLatexIcon
      key={FileType.Latex}
      color="#1A9BC7"
      className="file-icon"
    />,
  ],
  [
    FileType.CodeFile,
    <FileCodeIcon key={FileType.CodeFile} className="file-icon" />,
  ],
  [
    FileType.PdfFile,
    <FilePdfIcon key={FileType.PdfFile} className="file-icon" />,
  ],
  [
    FileType.CompressedFile,
    <FileCompressedIcon key={FileType.CompressedFile} className="file-icon" />,
  ],
  [
    FileType.PlainText,
    <FileDocumentIcon
      key={FileType.PlainText}
      color="#FFBD26"
      className="file-icon"
    />,
  ],
  [
    FileType.Image,
    <FileImageIcon key={FileType.Image} className="file-icon" />,
  ],
  [
    FileType.Figure,
    <FileFigureIcon key={FileType.Figure} className="file-icon" />,
  ],
  [
    FileType.GraphicalAbstract,
    <FileGraphicalAbstractIcon
      key={FileType.GraphicalAbstract}
      className="file-icon"
    />,
  ],
  [undefined, <FileUnknownIcon key={undefined} className="file-icon" />],
])

export const getFileType = (name: string) => {
  const extension = getExtension(name)
  return extension2type.get(extension.toLowerCase())
}

export const getFileIcon = (name: string) => {
  const type = getFileType(name)
  return type2icon.get(type)
}

export const getFileTypeIcon = (type: FileType) => {
  return type2icon.get(type)
}

export const isImageFile = (name: string) => {
  return getFileType(name) === FileType.Image
}

const getExtension = (name: string) => {
  return name.toLowerCase().split('.').pop() || ''
}
