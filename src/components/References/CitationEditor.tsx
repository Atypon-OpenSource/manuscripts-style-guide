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
import AnnotationEdit from '@manuscripts/assets/react/AnnotationEdit'
import CloseIconDark from '@manuscripts/assets/react/CloseIconDark'
import { BibliographyItem } from '@manuscripts/json-schema'
import { buildBibliographyItem } from '@manuscripts/transform'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import {
  ButtonGroup,
  IconButton,
  IconTextButton,
  PrimaryButton,
  SecondaryButton,
} from '../Button'
import { Category, Dialog } from '../Dialog'
import { AddComment } from '../icons'
import { BibliographyItemSource } from './BibliographyItemSource'
import { CitedItem, CitedItems } from './CitationViewer'
import { ReferenceLine } from './ReferenceLine'
import { ReferenceSearch } from './ReferenceSearch'
import { ReferencesModal } from './ReferencesModal'

const AddCommentButtonText = styled.div`
  display: contents;
  font-family: ${(props) => props.theme.font.family.sans};
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.small};
  line-height: ${(props) => props.theme.font.lineHeight.large};
  color: ${(props) => props.theme.colors.text.primary};
`

const CitedItemActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;

  svg.remove-icon {
    height: ${(props) => props.theme.grid.unit * 4}px;
    width: ${(props) => props.theme.grid.unit * 4}px;
  }
`

const ActionButton = styled(IconButton).attrs({
  size: 24,
})`
  :disabled {
    background-color: transparent !important;
    border-color: transparent !important;
    color: rgb(255, 255, 255);
    path,
    g {
      fill: ${(props) => props.theme.colors.background.tertiary} !important;
    }
  }
  :not(:disabled):focus,
  :not(:disabled):hover {
    path,
    g {
      fill: ${(props) => props.theme.colors.brand.medium} !important;
    }
  }
`

const EditReferenceButton = styled(ActionButton)`
  margin-right: ${(props) => props.theme.grid.unit * 3}px;
`

const Actions = styled.div`
  margin: ${(props) => props.theme.grid.unit * 4}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export interface CitationEditorProps {
  query?: string
  rids: string[]
  items: BibliographyItem[]
  citationCounts: Map<string, number>
  sources: BibliographyItemSource[]
  onCite: (items: BibliographyItem[]) => void
  onUncite: (id: string) => void
  onSave: (item: BibliographyItem) => void
  onDelete: (item: BibliographyItem) => void
  onComment: () => void
  onCancel: () => void
  canEdit: boolean
}

export const CitationEditor: React.FC<CitationEditorProps> = ({
  query,
  rids,
  items,
  citationCounts,
  sources,
  onCite,
  onUncite,
  onSave,
  onDelete,
  onComment,
  onCancel,
  canEdit,
}) => {
  const [deleteDialog, setDeleteDialog] = useState<{
    show: boolean
    id?: string
  }>({ show: false })

  const [editingForm, setEditingForm] = useState<{
    show: boolean
    item?: BibliographyItem
  }>({
    show: false,
  })

  const [searching, setSearching] = useState(false)

  const handleAdd = () => {
    setSearching(false)
    const item = buildBibliographyItem({}) as BibliographyItem
    onSave(item)
    onCite([item])
    setEditingForm({ show: true, item: item })
  }

  const cited = useMemo(() => {
    return rids.flatMap((rid) => items.filter((i) => i._id === rid))
  }, [rids, items])

  if (searching) {
    return (
      <ReferenceSearch
        sources={sources}
        items={items}
        onAdd={handleAdd}
        onCite={(items) => {
          setSearching(false)
          onCite(items)
        }}
        onCancel={() => setSearching(false)}
      />
    )
  }
  if (!rids.length) {
    return (
      <ReferenceSearch
        query={query}
        sources={sources}
        items={items}
        onAdd={handleAdd}
        onCite={onCite}
        onCancel={onCancel}
      />
    )
  }

  return (
    <>
      <Dialog
        isOpen={deleteDialog.show}
        category={Category.confirmation}
        header="Remove cited item"
        message="Are you sure you want to remove this cited item? It will still exist in the reference list."
        actions={{
          secondary: {
            action: () => {
              if (deleteDialog.id) {
                onUncite(deleteDialog.id)
                setDeleteDialog({ show: false })
              }
            },
            title: 'Remove',
          },
          primary: {
            action: () => setDeleteDialog({ show: false }),
            title: 'Cancel',
          },
        }}
      />
      <CitedItems>
        {cited.map((item) => (
          <CitedItem key={item._id}>
            <ReferenceLine item={item} />
            <CitedItemActions>
              <EditReferenceButton
                value={item._id}
                disabled={!canEdit}
                onClick={() => setEditingForm({ show: true, item: item })}
              >
                <AnnotationEdit color={'#6E6E6E'} />
              </EditReferenceButton>
              <ActionButton
                disabled={!canEdit}
                onClick={() => setDeleteDialog({ show: true, id: item._id })}
              >
                <CloseIconDark className={'remove-icon'} />
              </ActionButton>
            </CitedItemActions>
          </CitedItem>
        ))}
      </CitedItems>
      <ReferencesModal
        isOpen={editingForm.show}
        onCancel={() => setEditingForm({ show: false })}
        items={items}
        citationCounts={citationCounts}
        item={editingForm.item}
        onSave={onSave}
        onDelete={onDelete}
      />
      <Actions>
        <IconTextButton onClick={onComment}>
          <AddComment />
          <AddCommentButtonText>Add Comment</AddCommentButtonText>
        </IconTextButton>

        <ButtonGroup>
          <SecondaryButton onClick={onCancel}>Done</SecondaryButton>
          <PrimaryButton disabled={!canEdit} onClick={() => setSearching(true)}>
            Add Citation
          </PrimaryButton>
        </ButtonGroup>
      </Actions>
    </>
  )
}
