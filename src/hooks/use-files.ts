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
import { Model } from '@manuscripts/json-schema'

import {
  ElementFiles,
  getInlineFiles,
  getSupplements,
  ManuscriptFile,
  ModelFile,
} from '../lib/files'
import { useDeepCompareMemo } from './use-deep-compare'

type FileFilter = (file: ManuscriptFile) => boolean

/**
 * return files that are not inlineFiles or SupplementFiles
 */
const getOtherFiles = (
  inlineFiles: ElementFiles[],
  supplements: ModelFile[],
  files: ManuscriptFile[],
  filter?: FileFilter
) => {
  const excluded = new Set()
  inlineFiles.flatMap((f) => f.files).forEach((f) => excluded.add(f.id))
  supplements.forEach((s) => excluded.add(s.id))
  return files.filter((f) => !excluded.has(f.id) && (!filter || filter(f)))
}

export const useFiles = (
  modelMap: Map<string, Model>,
  files: ManuscriptFile[],
  filter?: FileFilter
) =>
  useDeepCompareMemo(() => {
    const inlineFiles = getInlineFiles(modelMap, files)
    const supplements = getSupplements(modelMap, files)
    const otherFiles = getOtherFiles(inlineFiles, supplements, files, filter)

    return {
      inlineFiles,
      supplements,
      otherFiles,
    }
  }, [...Array.from(modelMap.values()), ...files])

export default useFiles
