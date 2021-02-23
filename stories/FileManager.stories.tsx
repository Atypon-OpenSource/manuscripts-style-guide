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
import { storiesOf } from '@storybook/react'
import React from 'react'

import { FileManager } from '../src'
import { externalFiles } from './data/externalFiles'

const handleUpload = (
  submissionId: string,
  file: File,
  designation: string
): void => {
  console.log('submissionId --> ' + submissionId)
  console.log('file --> ' + file)
  console.log('designation --> ' + designation)
}

const handleDownload = (url: string): void => {
  console.log('url --> ' + url)
}

const handleReplace = (
  submissionId: string,
  file: File,
  name: string
): void => {
  console.log('submissionId --> ' + submissionId)
  console.log('file --> ' + file)
  console.log('name --> ' + name)
}

const changeDesignationHandler = (
  submissionId: string,
  file: File,
  designation: string | undefined
): void => {
  console.log('submissionId --> ' + submissionId)
  console.log('file --> ' + file)
  console.log('designation --> ' + designation)
}

storiesOf('FileManager', module).add('FileManager', () => (
  <FileManager
    externalFiles={externalFiles}
    enableDragAndDrop={true}
    handleUpload={handleUpload}
    handleDownload={handleDownload}
    handleReplace={handleReplace}
    changeDesignationHandler={changeDesignationHandler}
  />
))
