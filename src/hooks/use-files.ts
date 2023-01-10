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
import { Model, ObjectTypes, Supplement } from '@manuscripts/json-schema'
import { getModelsByType } from '@manuscripts/transform'

import { SubmissionAttachment } from '../components/FileManager/FileSectionItem/FileSectionItem'
import getInlineFiles, { InlineFile } from '../lib/inlineFiles'
import { useDeepCompareMemo } from './use-deep-compare'

type FilePredicate = (fileName: string) => boolean

/**
 * return attachments that are in the modelMap as MPSupplement
 */
const getSupplementFiles = (
  modelMap: Map<string, Model>,
  attachments: SubmissionAttachment[],
  filePredicate?: FilePredicate
) => {
  const supplements = new Map(
    getModelsByType<Supplement>(modelMap, ObjectTypes.Supplement).map(
      (supplement) => [supplement.href?.replace('attachment:', ''), supplement]
    )
  )

  return attachments.filter((attachment) => {
    if (supplements.has(attachment.id) && filePredicate) {
      return filePredicate(attachment.name)
    } else {
      return supplements.has(attachment.id)
    }
  })
}

/**
 * return files that are not inlineFiles or SupplementFiles
 */
const getOtherFiles = (
  inlineFiles: InlineFile[],
  supplementFiles: SubmissionAttachment[],
  attachments: SubmissionAttachment[],
  filePredicate?: FilePredicate
) => {
  const inlineFilesAttachmentIds = inlineFiles
    .map(({ attachments }) => attachments?.map(({ id }) => ({ id })) || [])
    .flat()

  const excludedAttachmentsIds = new Set(
    [...inlineFilesAttachmentIds, ...supplementFiles].map(({ id }) => id)
  )

  return attachments.filter(({ id, name }) => {
    if (!excludedAttachmentsIds.has(id) && filePredicate) {
      return filePredicate(name)
    } else {
      return !excludedAttachmentsIds.has(id)
    }
  })
}

export const useFiles = (
  modelMap: Map<string, Model>,
  attachments: SubmissionAttachment[],
  filePredicate?: FilePredicate
) =>
  useDeepCompareMemo(() => {
    const inlineFiles = getInlineFiles(modelMap, attachments)
    const supplementFiles = getSupplementFiles(
      modelMap,
      attachments,
      filePredicate
    )
    const otherFiles = getOtherFiles(
      inlineFiles,
      supplementFiles,
      attachments,
      filePredicate
    )

    return {
      otherFiles,
      supplementFiles,
      inlineFiles,
    }
  }, [...Array.from(modelMap.values()), ...attachments])

export default useFiles
