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

import { BibliographyItem } from '@manuscripts/json-schema'
import * as fuzzysort from 'fuzzysort'

export interface BibliographyItemSource {
  id: string
  label: string
  search: (query: string, limit: number) => Job<BibliographyItemSearchResponse>
  find?: () => Job<BibliographyItem>
}

export type Job<T> = {
  response: Promise<T>
  cancel?: () => void
  isCancelled?: boolean
}

export type BibliographyItemSearchResponse = {
  items: BibliographyItem[]
  total: number
}

const newestFirst = (a: BibliographyItem, b: BibliographyItem) => {
  if (a.createdAt === b.createdAt) {
    return 0
  }
  if (!a.createdAt) {
    return -1
  }
  if (!b.createdAt) {
    return 1
  }
  return b.createdAt - a.createdAt
}

export class DocumentReferenceSource implements BibliographyItemSource {
  public id = 'document'
  public label = 'Document'
  private items: BibliographyItem[]

  constructor(items: BibliographyItem[]) {
    this.items = items
  }

  search(query: string, limit: number): Job<BibliographyItemSearchResponse> {
    if (!query) {
      return {
        response: Promise.resolve({
          items: [...this.items].sort(newestFirst).slice(0, limit),
          total: this.items.length,
        }),
      }
    }

    const index = [...this.items].sort(newestFirst).map((i) => {
      return {
        item: i,
        title: i.title,
        authors: i.author?.map((a) => `${a.given} ${a.family}`).join(', '),
      }
    })

    const results = fuzzysort.go(query, index, {
      keys: ['title', 'authors'],
      limit: limit,
      threshold: -1000,
    })

    return {
      response: Promise.resolve({
        items: results.map((r) => r.obj.item),
        total: results.total,
      }),
    }
  }
}
