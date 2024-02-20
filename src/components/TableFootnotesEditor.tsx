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

import AddedIcon from '@manuscripts/assets/react/AddedIcon'
import AddIcon from '@manuscripts/assets/react/AddIcon'
import { FootnoteNode } from '@manuscripts/transform'
import React, { useState } from 'react'
import styled from 'styled-components'

import {
  ButtonGroup,
  IconTextButton,
  PrimaryButton,
  SecondaryButton,
} from './Button'
import { TemplateIcon } from './icons/template-icon'

const NotesContainer = styled.div`
  height: 90vh;
  max-height: 400px;
  overflow-y: auto;
`

const Actions = styled(ButtonGroup)`
  align-items: center;
  box-shadow: 0 -2px 12px 0 rgba(216, 216, 216, 0.26);
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.grid.unit * 4}px;
`

const Container = styled.div`
  flex: 1;
  font-family: ${(props) => props.theme.font.family.sans};
`

const AddNewFootnote = styled(ButtonGroup)`
  button {
    margin-right: ${(props) => props.theme.grid.unit * 8}px;
  }

  button:hover,
  button:active {
    path {
      stroke: ${(props) => props.theme.colors.brand.medium};
    }
    rect {
      stroke: ${(props) => props.theme.colors.brand.medium};
    }
  }
`

export const TableFootnotesEditor: React.FC<{
  notes: FootnoteNode[]
  onAdd: () => void
  onInsert: (notes: FootnoteNode[]) => void
  onCancel: () => void
}> = ({ notes, onAdd, onInsert, onCancel }) => {
  const [selections, setSelections] = useState(new Map<string, FootnoteNode>())

  const toggleSelection = (item: FootnoteNode) => {
    const id = item.attrs.id
    if (selections.has(id)) {
      selections.delete(id)
      setSelections(new Map([...selections]))
    } else {
      selections.set(id, item)
      setSelections(new Map([...selections]))
    }
  }

  const isSelected = (item: FootnoteNode) => {
    return selections.has(item.attrs.id)
  }

  const handleClick = () => {
    const items = Array.from(selections.values())
    return onInsert(items)
  }

  return (
    <Container>
      <NotesContainer>
        <TableFootnotesList
          notes={notes}
          isSelected={isSelected}
          onSelect={toggleSelection}
        />
      </NotesContainer>
      <Actions>
        <AddNewFootnote>
          <IconTextButton onClick={onAdd}>
            <TemplateIcon />
            Add new
          </IconTextButton>
        </AddNewFootnote>
        <ButtonGroup>
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleClick} disabled={selections.size === 0}>
            Insert
          </PrimaryButton>
        </ButtonGroup>
      </Actions>
    </Container>
  )
}

const TableFootnotesList: React.FC<{
  notes: FootnoteNode[]
  isSelected: (item: FootnoteNode) => boolean
  onSelect: (item: FootnoteNode) => void
}> = ({ notes, isSelected, onSelect }) => {
  return (
    <NotesListContainer>
      {notes.map((note) => (
        <FootnoteItem onClick={() => onSelect(note)} key={note.attrs.id}>
          <StatusIcon>
            {isSelected(note) ? (
              <AddedIcon data-cy={'plus-icon-ok'} width={24} height={24} />
            ) : (
              <AddIcon data-cy={'plus-icon'} width={24} height={24} />
            )}
          </StatusIcon>
          <NoteText>{note.firstChild?.textContent}</NoteText>
        </FootnoteItem>
      ))}
    </NotesListContainer>
  )
}

const NotesListContainer = styled.div`
  padding: 0 ${(props) => props.theme.grid.unit * 4}px;
  flex: 1;
  overflow-y: auto;
`

const FootnoteItem = styled.div`
  cursor: pointer;
  padding: ${(props) => props.theme.grid.unit * 2}px 0;
  display: flex;
`
const StatusIcon = styled.div`
  flex-shrink: 1;
  margin-right: ${(props) => props.theme.grid.unit * 3}px;
  margin-left: ${(props) => props.theme.grid.unit}px;
  height: ${(props) => props.theme.grid.unit * 6}px;
  width: ${(props) => props.theme.grid.unit * 6}px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const NoteText = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  flex: 1;
  font-weight: ${(props) => props.theme.font.weight.light};
  margin-top: ${(props) => props.theme.grid.unit}px;
`
