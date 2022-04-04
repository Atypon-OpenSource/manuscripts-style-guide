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

  getModelsByType<Section>(modelMap, ObjectTypes.Section).map((section) => {
    if (section.category === 'MPSectionCategory:abstract-graphical') {
      section.elementIDs?.some((elementId) => {
        const element = modelMap.get(elementId)
        if (element && hasObjectType(ObjectTypes.FigureElement)(element)) {
          files.unshift({
            ...getFigureData(
              element as FigureElement,
              modelMap,
              attachmentsMap
            ),
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
          case ObjectTypes.FigureElement:
          case ObjectTypes.MultiGraphicFigureElement: {
            files.push({
              ...getFigureData(
                element as FigureElement,
                modelMap,
                attachmentsMap
              ),
              label: `Figure`,
              type: FileType.Figure,
            })
            break
          }
          case ObjectTypes.TableElement: {
            const tableElement = element as TableElement
            const table = modelMap.get(tableElement.containedObjectID) as Table
            const externalFileReference = table.externalFileReferences?.find(
              (file) => file.kind === 'dataset' && file.ref
            )
            const attachment = getAttachment(
              externalFileReference,
              attachmentsMap
            )

            if (attachment) {
              files.push({
                id: element._id,
                label: `Table`,
                type: FileType.SheetsWorkbooks,
                attachments: [attachment],
                caption: getCaptionText(tableElement.caption),
              })
            }
            break
          }
        }
      })
    }
  })

  return files
}
