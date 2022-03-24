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
import { BrowserRouter } from 'react-router-dom'

import { FileManager, getAllPermitted } from '../src'
import { attachments } from './data/attachments'
const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
const handleUpload = async (
  submissionId: string,
  file: File,
  designation: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  await sleep(5000) //test the upload file item in storybook
  console.log('submissionId --> ' + submissionId)
  console.log('file --> ' + file.name)
  console.log('designation --> ' + designation)
  return true
}

const handleDownload = (url: string): void => {
  console.log('url --> ' + url)
}

const handleReplace = async (
  submissionId: string,
  attachmentId: string,
  name: string,
  file: File
): Promise<boolean> => {
  console.log('submissionId --> ' + submissionId)
  console.log('file --> ' + file.name)
  console.log('name --> ' + name)
  return true
}

const handleChangeDesignation = async (
  submissionId: string,
  attachmentId: string,
  designation: string | undefined,
  name: string
): Promise<boolean> => {
  console.log('submissionId --> ' + submissionId)
  console.log('name --> ' + name)
  console.log('designation --> ' + designation)
  return true
}

const capabilities = getAllPermitted()
import { encode, schema } from '@manuscripts/manuscript-transform'

import article from './data/article-doc.json'

storiesOf('FileManager', module).add('FileManager', () => (
  <BrowserRouter>
    <FileManager
      submissionId={'MPManuscript:valid-manuscript-id-1'}
      can={capabilities}
      attachments={attachments}
      modelMap={encode(schema.nodeFromJSON(article))}
      enableDragAndDrop={true}
      handleUpload={handleUpload}
      handleDownload={handleDownload}
      handleReplace={handleReplace}
      handleChangeDesignation={handleChangeDesignation}
    />
  </BrowserRouter>
))
