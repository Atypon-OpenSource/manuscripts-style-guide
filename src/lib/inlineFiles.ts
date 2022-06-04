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
  getModelsByType,
  hasObjectType,
} from '@manuscripts/manuscript-transform'
import {
  ElementsOrder,
  Figure,
  FigureElement,
  Model,
  ObjectTypes,
  Section,
  Supplement,
  Table,
  TableElement,
} from '@manuscripts/manuscripts-json-schema'

import { SubmissionAttachment } from '../components/FileManager/FileSectionItem/FileSectionItem'
import { ExternalFileRef } from '../components/FileManager/InlineFilesSection'
import { FileType } from '../components/FileManager/util'

const getCaptionText = (caption?: string) =>
  caption &&
  new DOMParser().parseFromString(caption, 'text/html').documentElement
    .innerText

const getAttachment = (
  externalFileRef: ExternalFileRef | undefined,
  attachmentsMap: Map<string, SubmissionAttachment>
) => {
  // in the new implementation ExternalFileRef url will be attachment id LEAN-988
  if (!externalFileRef?.url.includes('https://')) {
    const attachmentId = externalFileRef?.url.replace('attachment:', '')
    return attachmentId ? attachmentsMap.get(attachmentId) : undefined
  } else {
    return [...attachmentsMap.values()].find(
      (attachment) => attachment.link === externalFileRef.url
    )
  }
}

const getFigureData = (
  element: FigureElement,
  modelMap: Map<string, Model>,
  attachmentsMap: Map<string, SubmissionAttachment>
) => {
  const attachments: SubmissionAttachment[] = []
  element.containedObjectIDs.map((e) => {
    const object = modelMap.get(e)
    if (object && object.objectType === ObjectTypes.Figure) {
      const externalFileRef = (object as Figure).externalFileReferences?.find(
        // TODO:: add interactiveRepresentation image when media alternatives enabled
        (figure) => figure.kind === 'imageRepresentation'
      )

      const attachment = getAttachment(externalFileRef, attachmentsMap)

      if (attachment) {
        attachments.push(attachment)
      }
    }
  })

  return {
    id: element._id,
    attachments,
    caption: getCaptionText(element.caption),
  }
}

/**
 *  return list of inline files with their attachments.
 *  order of the list will be:
 *  1. graphical abstract figure
 *  2. figure elements order based on their position in the editor
 *  3. table elements order based on their position in the editor
 *  (and if the table not embedded with external file will not added to this list)
 */
export default (
  modelMap: Map<string, Model>,
  attachments: SubmissionAttachment[]
) => {
  const files: {
    id: string
    label: string
    type: FileType
    caption?: string
    attachments?: SubmissionAttachment[]
  }[] = []

  const attachmentsMap = new Map(
    attachments.map((attachment) => [attachment.id, attachment])
  )

  const { graphicalAbstractFigureId, figureElement, tableElement } =
    getAuxiliaryObjects(modelMap)

  if (graphicalAbstractFigureId) {
    const element = modelMap.get(graphicalAbstractFigureId)
    files.unshift({
      ...getFigureData(element as FigureElement, modelMap, attachmentsMap),
      label: `Graphical Abstract`,
      type: FileType.GraphicalAbstract,
    })
  }

  figureElement.map((id, index) => {
    const element = modelMap.get(id)
    files.push({
      ...getFigureData(element as FigureElement, modelMap, attachmentsMap),
      label: `Figure ${index + 1}`,
      type: FileType.Figure,
    })
  })

  tableElement.map((id) => {
    const tableElement = modelMap.get(id) as TableElement
    const table = modelMap.get(tableElement.containedObjectID) as Table
    const externalFileReference = table?.externalFileReferences?.find(
      (file) => file.kind === 'dataset' && file.ref
    )
    const attachment = getAttachment(externalFileReference, attachmentsMap)

    if (attachment) {
      files.push({
        id: tableElement._id,
        label: `Table`,
        type: FileType.SheetsWorkbooks,
        attachments: [attachment],
        caption: getCaptionText(tableElement.caption),
      })
    }
  })

  return files
}

/**
 *   return id of figure_element in the `graphical abstract` section,
 *   and ordered list of figure_elements ids and table_elements ids
 */
const getAuxiliaryObjects = (modelMap: Map<string, Model>) => {
  let graphicalAbstractFigureId: string | undefined,
    figureElementIds: string[] = []
  const tableElementIds: string[] = [],
    orderObjects: Record<string, ElementsOrder> = {}

  for (const model of modelMap.values()) {
    switch (model.objectType) {
      case ObjectTypes.Section: {
        const section = model as Section
        if (section.category === 'MPSectionCategory:abstract-graphical') {
          graphicalAbstractFigureId = section.elementIDs?.find((id) => {
            const obj = modelMap.get(id)
            return obj && hasObjectType(ObjectTypes.FigureElement)(obj)
          })
        } else {
          section.elementIDs?.map((elementId) => {
            const element = modelMap.get(elementId)
            if (!element) {
              return
            }
            switch (element.objectType) {
              case ObjectTypes.FigureElement:
              case ObjectTypes.MultiGraphicFigureElement:
                figureElementIds.push(element._id)
                break
              case ObjectTypes.TableElement:
                tableElementIds.push(element._id)
                break
            }
          })
        }
        break
      }
      case ObjectTypes.ElementsOrder: {
        const elementsOrder = model as ElementsOrder
        orderObjects[elementsOrder.elementType] = elementsOrder
      }
    }
  }

  if (graphicalAbstractFigureId) {
    figureElementIds = figureElementIds.filter(
      (id) => id != graphicalAbstractFigureId
    )
  }

  return {
    graphicalAbstractFigureId,
    figureElement: orderObjects[ObjectTypes.FigureElement]
      ? sortAuxiliaryObject(
          orderObjects[ObjectTypes.FigureElement],
          figureElementIds
        )
      : figureElementIds,
    tableElement: orderObjects[ObjectTypes.TableElement]
      ? sortAuxiliaryObject(
          orderObjects[ObjectTypes.TableElement],
          tableElementIds
        )
      : tableElementIds,
  }
}

const sortAuxiliaryObject = (
  orderObject: ElementsOrder,
  auxiliaryObjectIds: string[]
) => {
  return auxiliaryObjectIds.sort(
    (a, b) => orderObject.elements.indexOf(a) - orderObject.elements.indexOf(b)
  )
}

/**
 * return attachments that are in the modelMap as MPSupplement,
 */
export const getSupplementFiles = (
  modelMap: Map<string, Model>,
  attachments: SubmissionAttachment[]
) => {
  const supplements = new Map(
    getModelsByType<Supplement>(modelMap, ObjectTypes.Supplement).map(
      (supplement) => [supplement.href?.replace('attachment:', ''), supplement]
    )
  )
  return attachments.filter((attachment) => supplements.has(attachment.id))
}
