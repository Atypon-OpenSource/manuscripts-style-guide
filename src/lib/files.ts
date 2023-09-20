/*!
 * © 2022 Atypon Systems LLC
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
import { getModelsByType } from '@manuscripts/transform'

import { FileType } from '../components/FileManager/util'

export type FileDesignation = {
  id: string
  label?: string
}

export type FileAttachment = {
  id: string
  name: string
  type: FileDesignation
  createdDate?: Date
  [key: string]: unknown
}

export type ModelFile = FileAttachment & {
  modelId: string
}

export type ElementFiles = {
  modelId: string
  label: string
  type: FileType
  files: ModelFile[]
}

const MISSING_FILE = {
  id: '',
  name: 'Missing file',
  type: {
    id: 'missing',
  },
}

const getFile = (files: FileAttachment[], id: string) => {
  id = id.substring(11)
  return files.filter((f) => f.id === id)[0] || MISSING_FILE
}

const getFigureFiles = (
  element: FigureElement,
  modelMap: Map<string, Model>,
  files: FileAttachment[]
): ModelFile[] => {
  const figureFiles: ModelFile[] = []
  element.containedObjectIDs.map((id) => {
    const model = modelMap.get(id)
    if (model && model.objectType === ObjectTypes.Figure) {
      const figure = model as Figure

      if (figure.src) {
        figureFiles.push({
          ...getFile(files, figure.src),
          modelId: figure._id,
        })
      }
    }
  })

  return figureFiles
}

const getSupplementFiles = (
  supplement: Supplement,
  files: FileAttachment[]
): ModelFile[] => {
  if (supplement.href) {
    const href = supplement.href
    if (href) {
      return [
        {
          ...getFile(files, href),
          modelId: supplement._id,
        },
      ]
    }
  }
  return []
}

/**
 *  return list of inline files with their attachments.
 *  order of the list will be:
 *  1. graphical abstract figure
 *  2. figure elements order based on their position in the editor
 *  3. table elements order based on their position in the editor
 *  (and if the table not embedded with external file will not added to this list)
 */
export const getInlineFiles = (
  modelMap: Map<string, Model>,
  files: FileAttachment[]
): ElementFiles[] => {
  const elements: ElementFiles[] = []

  const orders = getOrderByType(modelMap)

  const sections = getModelsByType<Section>(modelMap, ObjectTypes.Section)
  const graphicalAbstractElementIds = sections.filter(
    (s) => s.category === 'MPSectionCategory:abstract-graphical'
  )[0]?.elementIDs

  graphicalAbstractElementIds?.map((id) => {
    const figure = modelMap.get(id) as FigureElement
    if (figure) {
      elements.push({
        modelId: id,
        type: FileType.GraphicalAbstract,
        label: 'Graphical Abstract',
        files: getFigureFiles(figure, modelMap, files),
      })
    }
  })

  const figures = getModelsByType<FigureElement>(
    modelMap,
    ObjectTypes.FigureElement
  )
  const figureOrder = orders.get(ObjectTypes.FigureElement)
  if (figureOrder) {
    // sort(figures, figureOrder)
  }
  figures
    ?.filter((f) => !graphicalAbstractElementIds?.includes(f._id))
    .map((figure, index) => ({
      modelId: figure._id,
      type: FileType.Figure,
      label: `Figure ${index + 1}`,
      files: getFigureFiles(figure, modelMap, files),
    }))
    .forEach((e) => elements.push(e))

  return elements
}

export const getSupplements = (
  modelMap: Map<string, Model>,
  files: FileAttachment[]
): ModelFile[] => {
  const supplements = getModelsByType<Supplement>(
    modelMap,
    ObjectTypes.Supplement
  )
  return supplements.flatMap((s) => getSupplementFiles(s, files))
}

const getOrderByType = (modelMap: Map<string, Model>) => {
  const groups = new Map<ObjectTypes, ElementsOrder>()
  const orders = getModelsByType<ElementsOrder>(
    modelMap,
    ObjectTypes.ElementsOrder
  )
  orders.forEach((o) => groups.set(o.elementType as ObjectTypes, o))
  return groups
}
