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

import { FileAttachment } from '../../lib/files'
import CorruptedFileIcon from '../icons/file-corrupted'
import MainDocumentIcon from '../icons/file-main-document'
import FileUnknown from '../icons/file-unknown'
import { getFileIcon } from './util'

/**
 * Each file item has an icon to represent besides the file info based on the file extension,
 * in case the file type is an image or video then the icon should be the preview image or video thumbnail.
 */
export const FileTypeIcon: React.FC<{
  file: FileAttachment
}> = ({ file }) => {
  if (file.type.id === 'missing') {
    return <CorruptedFileIcon className="file-icon" />
  }
  if (file.type.id === 'main-manuscript') {
    return <MainDocumentIcon className="file-icon" />
  }

  const icon = getFileIcon(file)

  return icon || <FileUnknown className="file-icon" />
}
