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
import {getModelsByType} from '@manuscripts/transform'

import {FileType} from '../components/FileManager/util'

export type FileDesignation = {
  id: string
  label?: string
}

export type ManuscriptFile = {
  id: string
  name: string
  type: FileDesignation
  link: string
  createdDate: Date
}

export type ModelFile = ManuscriptFile & {
  modelId: string
}

export type ElementFiles = {
  modelId: string
  label: string
  type: FileType
  files: ModelFile[]
}

const getFigureFiles = (
  element: FigureElement,
  modelMap: Map<string, Model>,
  files: ManuscriptFile[]
): ModelFile[] => {
  const figureFiles: ModelFile[] = []
  element.containedObjectIDs.map((id) => {
    const model = modelMap.get(id)
    if (model && model.objectType === ObjectTypes.Figure) {
      const figure = model as Figure

      if (figure.src) {
        //TODO
        const src = figure.src.substring(11)
        const file = files.filter((f) => f.id === src)[0]
        figureFiles.push({
          ...file,
          modelId: figure._id,
        })
      }
    }
  })

  return figureFiles
}

const getSupplementFiles = (
  supplement: Supplement,
  files: ManuscriptFile[]
): ModelFile[] => {
  if (supplement.href) {
    //TODO
    const href = supplement.href.substring(11)
    return files
      .filter((f) => f.id === href)
      .map((f) => ({
        ...f,
        modelId: supplement._id,
      }))
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
  files: ManuscriptFile[]
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
  files: ManuscriptFile[]
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
