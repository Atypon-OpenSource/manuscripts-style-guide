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
const upload = async (
  file: File,
  designation: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  await sleep(5000) //test the upload file item in storybook
  console.log('file --> ' + file.name)
  console.log('designation --> ' + designation)
  return {}
}

const replace = async (
  attachmentId: string,
  name: string,
  file: File
): Promise<boolean> => {
  console.log('file --> ' + file.name)
  console.log('name --> ' + name)
  return true
}

const changeDesignation = async (
  attachmentId: string,
  designation: string | undefined,
  name: string
): Promise<boolean> => {
  console.log('name --> ' + name)
  console.log('designation --> ' + designation)
  return true
}

const capabilities = getAllPermitted()
import { Supplement } from '@manuscripts/json-schema'
import {
  buildSupplementaryMaterial,
  encode,
  schema,
} from '@manuscripts/transform'
import { action } from '@storybook/addon-actions'

import article from './data/article-doc.json'

storiesOf('FileManager', module).add('FileManager', () => {
  const modelMap = encode(schema.nodeFromJSON(article))
  const supplementary1 = buildSupplementaryMaterial(
    'ContributorsArtwork@2x.png',
    'attachment:4131f16e-e075-41bb-8339-abea02df515d'
  )
  const supplementary2 = buildSupplementaryMaterial(
    'final manuscript-hum-huili-dbh-suicide-20200707_figures (9).docx',
    'attachment:7d9d686b-5488-44a5-a1c5-46351e7f9312'
  )

  modelMap.set(supplementary1._id, supplementary1 as Supplement)
  modelMap.set(supplementary2._id, supplementary2 as Supplement)

  return (
    <BrowserRouter>
      <FileManager
        can={capabilities}
        fileManagement={{
          getAttachments: () => attachments,
          upload,
          replace,
          changeDesignation,
        }}
        modelMap={modelMap}
        saveModel={async () => action('save model')}
        enableDragAndDrop={true}
      />
    </BrowserRouter>
  )
})
