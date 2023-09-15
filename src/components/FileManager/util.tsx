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

export enum FileSectionType {
  Inline = 'Inline files',
  Supplements = 'Supplements',
  OtherFile = 'Other files',
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

export const extensionsWithFileTypesMap = new Map<string, FileType>([
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
  [FileType.Audio, <AudioIcon key={FileType.Audio} className="file-icon" />],
  [FileType.Video, <VideoIcon key={FileType.Video} className="file-icon" />],
  [
    FileType.PlainDocument,
    <DocumentIcon key={FileType.PlainDocument} color="#1A9BC7" className="file-icon" />,
  ],
  [FileType.SheetsWorkbooks, <TableIcon key={FileType.SheetsWorkbooks} className="file-icon" />],
  [FileType.Latex, <LatexIcon key={FileType.Latex} color="#1A9BC7" className="file-icon" />],
  [FileType.CodeFile, <CodeFileIcon key={FileType.CodeFile}  className="file-icon"  />],
  [FileType.PdfFile, <PdfFileIcon key={FileType.PdfFile}  className="file-icon"  />],
  [
    FileType.CompressedFile,
    <CompressedFileIcon key={FileType.CompressedFile} className="file-icon"  />,
  ],
  [
    FileType.PlainText,
    <DocumentIcon key={FileType.PlainText} color="#FFBD26" className="file-icon"  />,
  ],
  [FileType.Image, <ImageIcon key={FileType.Image} className="file-icon"  />],
  [FileType.Figure, <FigureIcon key={FileType.Figure}  className="file-icon" />],
  [
    FileType.GraphicalAbstract,
    <GraphicalAbstractIcon key={FileType.GraphicalAbstract}  className="file-icon" />,
  ],
  [undefined, <UnknownFormatFileIcon key={undefined}  className="file-icon" />],
])

export const droppableSections = [
  FileSectionType.Supplements,
  FileSectionType.OtherFile,
]
