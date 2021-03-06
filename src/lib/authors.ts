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

import {
  Affiliation,
  Contributor,
  Model,
  ObjectTypes,
  UserProfileAffiliation,
} from '@manuscripts/manuscripts-json-schema'

import {
  AffiliationGeneric,
  AffiliationMap,
  AffiliationOption,
  AuthorAffiliation,
} from '../types'

const getModelsByType = <T extends Model>(
  modelMap: Map<string, Model>,
  objectType: string
): T[] => {
  const output: T[] = []

  for (const model of modelMap.values()) {
    if (model.objectType === objectType) {
      output.push(model as T)
    }
  }

  return output
}

export const buildSortedAuthors = (modelMap: Map<string, Model>) => {
  return getModelsByType<Contributor>(modelMap, ObjectTypes.Contributor)
    .filter((item) => item.role === 'author')
    .sort((a, b) => Number(a.priority) - Number(b.priority))
}

export const buildAuthorPriority = (authors: Contributor[]) => {
  if (!authors.length) {
    return 0
  }

  const priorities = authors.map((author) => Number(author.priority))

  return Math.max(...priorities) + 1
}

export const buildAffiliationIDs = (authors: Contributor[]): string[] => {
  const ids: string[] = []

  authors.forEach((author) => {
    if (author.affiliations) {
      author.affiliations.forEach((id) => {
        ids.push(id)
      })
    }
  })

  return ids.filter((value, index) => ids.indexOf(value) === index)
}

export const buildAuthorAffiliations = (
  authors: Contributor[],
  affiliations: AffiliationMap,
  uniqueAffiliationIDs: string[]
) => {
  const items = new Map()

  authors.forEach((author) => {
    items.set(
      author._id,
      (author.affiliations || []).map((id) => {
        return {
          ordinal: uniqueAffiliationIDs.indexOf(id) + 1,
          data: affiliations.get(id) as Affiliation,
        }
      })
    )
  })

  return items
}

export const buildAffiliationsMap = (
  affiliationIDs: string[],
  modelMap: Map<string, Model>
): AffiliationMap =>
  new Map(
    affiliationIDs.map((id: string): [string, Affiliation] => [
      id,
      modelMap.get(id) as Affiliation,
    ])
  )

export const buildAuthorsAndAffiliations = (modelMap: Map<string, Model>) => {
  const authors = buildSortedAuthors(modelMap)
  const affiliationIDs = buildAffiliationIDs(authors)
  const affiliations = buildAffiliationsMap(affiliationIDs, modelMap)

  const authorAffiliations = buildAuthorAffiliations(
    authors,
    affiliations,
    affiliationIDs
  )

  return {
    affiliations,
    authors,
    authorAffiliations,
  }
}

export const isJointFirstAuthor = (authors: Contributor[], index: number) => {
  const author = index === 0 ? authors[index] : authors[index - 1]

  return Boolean(author.isJointContributor)
}

export const affiliationLabel = (
  affiliation: Affiliation | AffiliationGeneric | UserProfileAffiliation
) => {
  const { department, institution = '' } = affiliation
  if (!institution) {
    return '(unknown institution)'
  }
  return department ? `${institution} (${department})`.trim() : institution
}

export const affiliationsOptions = (
  affiliations: Map<string, AffiliationGeneric>,
  authorAffiliations?: AuthorAffiliation[] | null
): AffiliationOption[] => {
  if (!authorAffiliations) {
    return affiliationsOptions(affiliations, [])
  }

  const authorAffiliationsIds = new Set(
    authorAffiliations.map((authorAffiliation) => authorAffiliation.data._id)
  )
  return Array.from(affiliations.values())
    .filter((affiliation) => !authorAffiliationsIds.has(affiliation._id))
    .map((affiliation) => ({
      value: affiliation._id,
      label: affiliationLabel(affiliation) || '',
    }))
}
