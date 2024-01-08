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
import { storiesOf } from '@storybook/react'
import React, { useCallback, useState } from 'react'

import { BibliographyItemSource } from '../src/components/References/BibliographyItemSource'
import { CitationEditor } from '../src/components/References/CitationEditor'
import { ReferencesModal } from '../src/components/References/ReferencesModal'
import { bibliographyItems } from './data/bibliography-items'

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

class MockExternalCitationSource implements BibliographyItemSource {
  public id
  public label
  private items: BibliographyItem[]

  constructor(id: string, label: string, items: BibliographyItem[]) {
    this.id = id
    this.label = label
    this.items = items
  }

  search(query: string, limit: number) {
    const promise = delay(3000).then(() => ({
      items: this.items.slice(0, limit),
      total: this.items.length,
    }))

    const job = {
      response: promise,
      isCancelled: false,
      cancel: () => {
        job.isCancelled = true
      },
    }
    return job
  }
}

storiesOf('References', module)
  .add('References Modal', () => {
    const [items, setItems] = useState<BibliographyItem[]>(bibliographyItems)
    const [item, setItem] = useState<BibliographyItem>()
    const [isOpen, setOpen] = useState(false)

    const handleSave = useCallback(
      (item: BibliographyItem) => {
        const copy = [...items]
        const index = items.findIndex((i) => i._id === item._id)
        copy[index] = item
        setItems(copy)
      },
      [items]
    )

    const handleDelete = useCallback(
      (item: BibliographyItem) => {
        setItems(items.filter((i) => i._id !== item._id))
      },
      [items]
    )

    const open = useCallback(
      (index?: number) => {
        if (index) {
          setItem(items[index])
        }
        setOpen(true)
      },
      [items]
    )

    const citationCounts = new Map()
    citationCounts.set(items[0]._id, 5)
    citationCounts.set(items[10]._id, 2)
    citationCounts.set(items[20]._id, 7)

    return (
      <>
        <button onClick={() => open()}>Open</button>
        <button onClick={() => open(10)}>Edit item 10</button>
        <button onClick={() => open(20)}>Edit item 20</button>
        <ReferencesModal
          isOpen={isOpen}
          handleCancel={() => setOpen(false)}
          items={items}
          citationCounts={citationCounts}
          item={item}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </>
    )
  })
  .add('Citation Editor', () => {
    const [isOpen, setOpen] = useState(false)
    const [items, setItems] = useState(bibliographyItems)
    const [active, setActive] = useState('cited1')
    const [rids1, setRids1] = useState([
      items[0]._id,
      items[10]._id,
      items[20]._id,
    ])
    const [rids2, setRids2] = useState<string[]>([])

    const sources = [
      new MockExternalCitationSource('external', 'External Sources', [
        items[2],
        items[3],
        items[4],
        items[5],
        items[6],
      ]),
    ]

    const handleCancel = () => {
      setOpen(false)
    }

    const handleSave = (item: BibliographyItem) => {
      const copy = [...items]
      const index = copy.findIndex((i) => i._id === item._id)
      if (index >= 0) {
        copy[index] = item
      } else {
        copy.push(item)
      }
      setItems(copy)
    }

    const handleDelete = (item: BibliographyItem) => {
      setItems(items.filter((i) => i._id !== item._id))
    }

    const handleCite = useCallback(
      (items: BibliographyItem[]) => {
        const rids = items.map((i) => i._id)
        if (active === 'cited1') {
          setRids1([...rids1, ...rids])
        } else if (active == 'cited2') {
          setRids2([...rids2, ...rids])
        }
      },
      [active, rids1, rids2]
    )

    const handleUncite = useCallback(
      (id: string) => {
        if (active === 'cited1') {
          setRids1(rids1.filter((i) => i !== id))
        } else if (active == 'cited2') {
          setRids2(rids2.filter((i) => i !== id))
        }
      },
      [active, rids1, rids2]
    )

    const handleComment = () => {
      console.log('comment')
    }

    const open = (name: string) => {
      setOpen(true)
      setActive(name)
    }

    const citationCounts = new Map()
    citationCounts.set(bibliographyItems[0]._id, 5)
    citationCounts.set(bibliographyItems[10]._id, 2)
    citationCounts.set(bibliographyItems[20]._id, 7)

    return (
      <>
        <button onClick={() => open('cited1')}>Open with citations</button>
        <button onClick={() => open('cited2')}>Open empty</button>
        {isOpen && (
          <CitationEditor
            rids={active === 'cited1' ? rids1 : rids2}
            items={items}
            citationCounts={citationCounts}
            handleCite={handleCite}
            handleUncite={handleUncite}
            sources={sources}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleComment={handleComment}
            handleCancel={handleCancel}
            canEdit={true}
          />
        )}
      </>
    )
  })
