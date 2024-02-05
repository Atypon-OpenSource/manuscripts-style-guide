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
import { ManuscriptNode, schema, SupplementNode } from '@manuscripts/transform'

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

export const isModelFile = (file: FileAttachment): file is ModelFile => {
  // @ts-ignore
  return file.modelId
}

const MISSING_FILE: FileAttachment = {
  id: '',
  name: 'Missing file',
  type: {
    id: 'missing',
  },
}

const getFile = (files: FileAttachment[], id: string) => {
  return files.filter((f) => f.id === id)[0] || MISSING_FILE
}

const getFigureFiles = (
  figureElement: ManuscriptNode,
  files: FileAttachment[]
): ModelFile[] => {
  const figureFiles: ModelFile[] = []
  figureElement.forEach((node) => {
    if (node.type === schema.nodes.figure) {
      figureFiles.push({
        ...getFile(files, node.attrs.src),
        modelId: figureElement.attrs.id,
      })
    }
  })

  return figureFiles
}

const getSupplementFiles = (
  supplement: SupplementNode,
  files: FileAttachment[]
): ModelFile[] => {
  if (supplement.attrs.href) {
    return [
      {
        ...getFile(files, supplement.attrs.href),
        modelId: supplement.attrs.id,
      },
    ]
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
  doc: ManuscriptNode,
  files: FileAttachment[]
): ElementFiles[] => {
  const elements: ElementFiles[] = []

  doc.descendants((node, _, parent) => {
    const isGraphicalAbstractFigure =
      parent?.type === schema.nodes.section &&
      parent?.attrs.category === 'MPSectionCategory:abstract-graphical'

    if (node.type === schema.nodes.figure_element) {
      elements.push({
        modelId: node.attrs.id,
        type:
          (isGraphicalAbstractFigure && FileType.GraphicalAbstract) ||
          FileType.Figure,
        label:
          (isGraphicalAbstractFigure && `Graphical Abstract`) ||
          node.attrs.label,
        files: getFigureFiles(node, files),
      })
      return false
    }
  })

  return elements
}

export const getSupplements = (
  doc: ManuscriptNode,
  files: FileAttachment[]
): ModelFile[] => {
  const supplements: ModelFile[] = []

  doc.descendants((node) => {
    if (node.type === schema.nodes.supplements) {
      node.forEach((child) => {
        if (child.type === schema.nodes.supplement) {
          supplements.push(
            ...getSupplementFiles(child as SupplementNode, files)
          )
        }
      })
      return false
    }
  })

  return supplements
}
