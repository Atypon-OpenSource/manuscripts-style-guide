/*!
 * © 2023 Atypon Systems LLC
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

import { BibliographyItem } from '@manuscripts/transform'

let count = 0
const newBibliographyItem = (): BibliographyItem => {
  const index = count++
  return {
    _id: `MPBibliographyItem:${index}`,
    objectType: 'MPBibliographyItem',
    type: 'article-journal',
    title: `Bibliography Item ${index}`,
    manuscriptID: 'MPManuscript:1',
    containerID: 'MPProject:1',
    createdAt: 0,
    updatedAt: 0,
    'container-title': 'Test journal',
    volume: 10,
    issue: 3,
  }
}

export const bibliographyItems: BibliographyItem[] = [
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
  newBibliographyItem(),
]
