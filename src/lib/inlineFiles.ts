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
  Figure,
  FigureElement,
  Model,
  ObjectTypes,
  Section,
  Table,
  TableElement,
} from '@manuscripts/manuscripts-json-schema'

import { ExternalFileRef } from '../components/FileManager/InlineFilesSection'
import { FileType } from '../components/FileManager/util'

const getCaptionText = (caption?: string) =>
  caption &&
  new DOMParser().parseFromString(caption, 'text/html').documentElement
    .innerText

const getFigureData = (
  element: FigureElement,
  modelMap: Map<string, Model>
) => {
  const figureId = element.containedObjectIDs.find((e) => {
    const model = modelMap.get(e)
    return model && hasObjectType(ObjectTypes.Figure)(model)
  })
  const { externalFileReferences } = (figureId &&
    (modelMap.get(figureId) as Figure)) || {
    externalFileReferences: undefined,
  }

  return {
    id: element._id,
    externalFileReferences,
    caption: getCaptionText(element.caption),
  }
}

export default (modelMap: Map<string, Model>) => {
  const files: {
    id: string
    label: string
    type: FileType
    caption?: string
    externalFileReferences?: ExternalFileRef[]
  }[] = []

  getModelsByType<Section>(modelMap, ObjectTypes.Section).map((section) => {
    if (section.category === 'MPSectionCategory:abstract-graphical') {
      section.elementIDs?.some((elementId) => {
        const element = modelMap.get(elementId)
        if (element && hasObjectType(ObjectTypes.FigureElement)(element)) {
          files.unshift({
            ...getFigureData(element as FigureElement, modelMap),
            label: `Graphical Abstract`,
            type: FileType.GraphicalAbstract,
          })
          return true
        }
      })
    } else {
      section.elementIDs?.map((elementId) => {
        const element = modelMap.get(elementId)
        if (!element) {
          return
        }
        switch (element.objectType) {
          case ObjectTypes.FigureElement: {
            files.push({
              ...getFigureData(element as FigureElement, modelMap),
              label: `Figure`,
              type: FileType.Figure,
            })
            break
          }
          case ObjectTypes.TableElement: {
            const tableElement = element as TableElement
            const table = modelMap.get(tableElement.containedObjectID) as Table

            files.push({
              id: element._id,
              label: `Table`,
              type: FileType.SheetsWorkbooks,
              externalFileReferences: table.externalFileReferences,
              caption: getCaptionText(tableElement.caption),
            })
            break
          }
        }
      })
    }
  })

  return files
}
