/*!
 * © 2020 Atypon Systems LLC
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

import projectDump from '@manuscripts/examples/data/project-dump-2.json'
import { Model } from '@manuscripts/json-schema'
import { Decoder } from '@manuscripts/transform'

export const modelMap = new Map()

// @ts-ignore
projectDump.data.forEach((model: Model) => {
  modelMap.set(model._id, model)
})

const decoder = new Decoder(modelMap)

export const manuscriptID = 'MPManuscript:561C1FB2-3A94-4460-AB75-426F80BC7071'

export const doc = decoder.createArticleNode(manuscriptID)
