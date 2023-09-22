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
import {
  ElementsOrder,
  Figure,
  FigureElement,
  Model,
  ObjectTypes,
  Section,
  Supplement,
} from '@manuscripts/json-schema'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { FileManager, getAllPermitted } from '../src'
import { FileAttachment } from '../src/lib/files'
import { FileAttachmentWithLink, files } from './data/files'

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

const upload = async (file: File): Promise<FileAttachment> => {
  console.log('starting upload')
  await sleep(5000) //test the upload file item in storybook
  console.log('finished upload')
  const id = Math.random().toString(36).slice(-5)
  const uploaded = {
    id,
    name: file.name,
    type: {
      id: 'user-uploaded-file',
    },
    link: '',
    createdDate: new Date(),
  }
  files.push(uploaded)
  return uploaded
}

const download = (file: FileAttachment): void => {
  console.log('file --> ' + file.name)
}

const previewLink = (file: FileAttachment): string => {
  return (file as FileAttachmentWithLink).link
}

const capabilities = getAllPermitted()

storiesOf('FileManager', module).add('FileManager', () => {
  const figure1 = {
    _id: 'MPFigure:figure1',
    objectType: ObjectTypes.Figure,
    src: '0be64499-6adb-4a6f-8f1e-5c411a37e100',
  }
  const figure2 = {
    _id: 'MPFigure:figure2',
    objectType: ObjectTypes.Figure,
    src: '0be64499-6adb-4a6f-8f1e-5c411a37e101',
  }
  const figure3 = {
    _id: 'MPFigure:figure3',
    objectType: ObjectTypes.Figure,
    src: '0be64499-6adb-4a6f-8f1e-5c411a37e102',
  }
  const figure4 = {
    _id: 'MPFigure:figure4',
    objectType: ObjectTypes.Figure,
    src: '0be64499-6adb-4a6f-8f1e-5c411a37e103',
  }
  const figure5 = {
    _id: 'MPFigure:figure5',
    objectType: ObjectTypes.Figure,
    src: 'missing-figure',
  }

  const element1 = {
    _id: 'MPFigureElement:element1',
    objectType: ObjectTypes.FigureElement,
    containedObjectIDs: [figure1._id],
  }
  const element2 = {
    _id: 'MPFigureElement:element2',
    objectType: ObjectTypes.FigureElement,
    containedObjectIDs: [figure2._id],
  }
  const element3 = {
    _id: 'MPFigureElement:element3',
    objectType: ObjectTypes.FigureElement,
    containedObjectIDs: [figure3._id, figure4._id],
  }
  const element4 = {
    _id: 'MPFigureElement:element4',
    objectType: ObjectTypes.FigureElement,
    containedObjectIDs: [figure5._id],
  }
  const graphicalAbstract = {
    _id: 'MPSection:section1',
    objectType: ObjectTypes.Section,
    category: 'MPSectionCategory:abstract-graphical',
    elementIDs: [element1._id],
  }
  const supplement1 = {
    _id: 'MPSupplement:supplement1',
    objectType: ObjectTypes.Supplement,
    href: '4131f16e-e075-41bb-8339-abea02df515d',
  }
  const supplement2 = {
    _id: 'MPSupplement:supplement2',
    objectType: ObjectTypes.Supplement,
    href: '7d9d686b-5488-44a5-a1c5-46351e7f9312',
  }
  const order = {
    _id: 'MPElementsOrder:figure-order',
    objectType: ObjectTypes.ElementsOrder,
    elementType: ObjectTypes.FigureElement,
    elements: [element3._id, element2._id],
  }

  const modelMap = new Map<string, Model>()
  modelMap.set(figure1._id, figure1 as Figure)
  modelMap.set(figure2._id, figure2 as Figure)
  modelMap.set(figure3._id, figure3 as Figure)
  modelMap.set(figure4._id, figure4 as Figure)
  modelMap.set(figure5._id, figure5 as Figure)
  modelMap.set(element1._id, element1 as FigureElement)
  modelMap.set(element2._id, element2 as FigureElement)
  modelMap.set(element3._id, element3 as FigureElement)
  modelMap.set(element4._id, element4 as FigureElement)
  modelMap.set(graphicalAbstract._id, graphicalAbstract as Section)
  modelMap.set(supplement1._id, supplement1 as Supplement)
  modelMap.set(supplement2._id, supplement2 as Supplement)
  modelMap.set(order._id, order as ElementsOrder)

  const saveModel = async (m: Model) => {
    modelMap.set(m._id, m)
    setModelMap(new Map(modelMap))
    await sleep(1000)
  }

  const deleteModel = async (modelId: string) => {
    modelMap.delete(modelId)
    setModelMap(new Map(modelMap))
    await sleep(1000)
    return modelId
  }

  const [smodelMap, setModelMap] = useState(modelMap)

  return (
    <BrowserRouter>
      <FileManager
        can={capabilities}
        fileManagement={{
          upload,
          download,
          previewLink,
        }}
        files={files}
        modelMap={smodelMap}
        // @ts-ignore
        saveModel={saveModel}
        deleteModel={deleteModel}
        enableDragAndDrop={true}
      />
    </BrowserRouter>
  )
})
