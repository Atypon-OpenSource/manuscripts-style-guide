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
import { ManuscriptNode } from '@manuscripts/transform'

import {
  ElementFiles,
  FileAttachment,
  getInlineFiles,
  getSupplements,
  ModelFile,
} from '../lib/files'
import { useDeepCompareMemo } from './use-deep-compare'

/**
 * return files that are not inlineFiles or SupplementFiles
 */
const getOtherFiles = (
  inlineFiles: ElementFiles[],
  supplements: ModelFile[],
  files: FileAttachment[]
) => {
  const excluded = new Set()
  inlineFiles.flatMap((f) => f.files).forEach((f) => excluded.add(f.id))
  supplements.forEach((s) => excluded.add(s.id))
  return files.filter((f) => !excluded.has(f.id))
}

export const useFiles = (doc: ManuscriptNode, files: FileAttachment[]) => {
  return useDeepCompareMemo(() => {
    const inlineFiles = getInlineFiles(doc, files)
    const supplements = getSupplements(doc, files)
    const otherFiles = getOtherFiles(inlineFiles, supplements, files)

    return {
      inlineFiles,
      supplements,
      otherFiles,
    }
  }, [doc, files])
}

export default useFiles
