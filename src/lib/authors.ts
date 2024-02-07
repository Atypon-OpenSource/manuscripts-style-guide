/*!
 * © 2019 Atypon Systems LLC
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

import { Affiliation, Contributor } from '@manuscripts/json-schema'

import { initials } from './name'

export const affiliationLabel = (affiliation: Affiliation) => {
  const institution = affiliation.institution
  if (!institution) {
    return '(unknown institution)'
  }
  const department = affiliation.department
  return department ? `${institution} (${department})`.trim() : institution
}

export const authorLabel = (author: Contributor) => {
  const name = author.bibliographicName
  return [initials(name), name.family, name.suffix].filter(Boolean).join(' ')
}
