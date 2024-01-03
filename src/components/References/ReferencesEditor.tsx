/*!
 * © 2024 Atypon Systems LLC
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
import React, { useState } from 'react'

import { ReferencesModal } from './ReferencesModal'

export interface ReferencesEditorProps {
  items: BibliographyItem[]
  item?: BibliographyItem
  citationCounts: Map<string, number>
  handleSave: (item: BibliographyItem) => void
  handleDelete: (item: BibliographyItem) => void
}

export const ReferencesEditor: React.FC<ReferencesEditorProps> = ({
  items,
  item,
  citationCounts,
  handleSave,
  handleDelete,
}) => {
  const [isOpen, setOpen] = useState(true)

  return (
    <ReferencesModal
      isOpen={isOpen}
      handleCancel={() => setOpen(false)}
      items={items}
      citationCounts={citationCounts}
      item={item}
      handleSave={handleSave}
      handleDelete={handleDelete}
    />
  )
}
