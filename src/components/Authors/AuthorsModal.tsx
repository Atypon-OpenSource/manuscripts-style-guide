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

import AddIcon from '@manuscripts/assets/react/AddIcon'
import {
  Affiliation,
  buildBibliographicName,
  buildContributor,
  Contributor,
} from '@manuscripts/json-schema'
import { isEqual } from 'lodash'
import React, { useReducer, useRef, useState } from 'react'
import styled from 'styled-components'

import { modelsReducer } from '../../lib/array-reducer'
import { SidebarContent } from '../Sidebar'
import {
  CloseButton,
  ModalBody,
  ModalContainer,
  ModalHeader,
  ModalSidebar,
  ModalSidebarHeader,
  ModalSidebarTitle,
  ScrollableModalContent,
  StyledModal,
} from '../StyledModal'
import { AuthorActions } from './AuthorActions'
import { AuthorAffiliations } from './AuthorAffiliations'
import { AuthorDetailsForm, AuthorDetailsFormValues } from './AuthorDetailsForm'
import { AuthorFormPlaceholder } from './AuthorFormPlaceholder'
import { AuthorList } from './AuthorList'
import { SaveAuthorConfirmationDialog } from './SaveAuthorConfirmationDialog'

const AddAuthorButton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.grid.unit * 4}px;
  margin-left: ${(props) => props.theme.grid.unit * 2}px;
  cursor: pointer;
`

const ActionTitle = styled.div`
  padding-left: ${(props) => props.theme.grid.unit * 2}px;
`

const FormLabel = styled.legend`
  margin-top: 12px;
  margin-bottom: 12px;
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.xlarge} /
    ${(props) => props.theme.font.lineHeight.large}
    ${(props) => props.theme.font.family.sans};
  letter-spacing: -0.4px;
  color: ${(props) => props.theme.colors.text.secondary};
`

const AuthorForms = styled.div`
  padding-left: ${(props) => props.theme.grid.unit * 3}px;
  padding-right: ${(props) => props.theme.grid.unit * 3}px;
`

const normalizeAuthor = (author: Contributor): AuthorDetailsFormValues => {
  return {
    _id: author._id,
    email: author.email || '',
    isCorresponding: Boolean(author.isCorresponding),
    bibliographicName: {
      _id: author.bibliographicName._id,
      objectType: author.bibliographicName.objectType,
      given: author.bibliographicName.given || '',
      family: author.bibliographicName.family || '',
      suffix: author.bibliographicName.suffix || '',
    },
    role: author.role || '',
    ORCIDIdentifier: author.ORCIDIdentifier || '',
    affiliations: author.affiliations || [],
  }
}

const authorsReducer = modelsReducer<Contributor>()
const affiliationsReducer = modelsReducer<Affiliation>()

export interface AuthorsModalProps {
  authors: Contributor[]
  affiliations: Affiliation[]
  author?: Contributor
  onSaveAuthor: (author: Contributor) => void
  onDeleteAuthor: (author: Contributor) => void
  onSaveAffiliation: (affiliation: Affiliation) => void
}

export const AuthorsModal: React.FC<AuthorsModalProps> = ({
  authors: $authors,
  affiliations: $affiliations,
  author,
  onSaveAuthor,
  onDeleteAuthor,
  onSaveAffiliation,
}) => {
  const [isOpen, setOpen] = useState(true)
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const valuesRef = useRef<AuthorDetailsFormValues>()

  const [authors, dispatchAuthors] = useReducer(authorsReducer, $authors)
  const [affiliations, dispatchAffiliations] = useReducer(
    affiliationsReducer,
    $affiliations
  )

  const [selection, setSelection] = useState(author)

  const handleSelect = (author: Contributor) => {
    const values = valuesRef.current
    if (values && selection && !isEqual(values, normalizeAuthor(selection))) {
      setShowConfirmationDialog(true)
    } else {
      setSelection(author)
    }
  }

  const handleSaveAuthor = (values: AuthorDetailsFormValues | undefined) => {
    if (!values || !selection) {
      return
    }
    const author = {
      ...selection,
      ...values,
    }
    onSaveAuthor(author)
    setSelection(author)
    setShowConfirmationDialog(false)
    dispatchAuthors({
      type: 'update',
      items: [author],
    })
  }

  const handleMoveAuthor = (from: number, to: number) => {
    const copy = [...authors]
    const order = copy.map((_, i) => (i === from ? to : i))
    copy.sort((a, b) => order[authors.indexOf(a)] - order[authors.indexOf(b)])
    copy.forEach((a, i) => {
      if (a.priority !== i) {
        a.priority = i
        onSaveAuthor(a)
      }
    })
    dispatchAuthors({
      type: 'set',
      state: copy,
    })
  }

  const handleAddAuthor = () => {
    const name = buildBibliographicName({ given: '', family: '' })
    const author = buildContributor(name, 'author') as Contributor
    onSaveAuthor(author)
    setSelection(author)
    dispatchAuthors({
      type: 'update',
      items: [author],
    })
  }

  const handleDeleteAuthor = () => {
    if (!selection) {
      return
    }
    onDeleteAuthor(selection)
    setSelection(undefined)
    dispatchAuthors({
      type: 'delete',
      item: selection,
    })
  }

  const handleSaveAffiliation = (affiliation: Affiliation) => {
    onSaveAffiliation(affiliation)
    dispatchAffiliations({
      type: 'update',
      items: [affiliation],
    })
  }

  const handleAddAffiliation = (affiliation: Affiliation) => {
    if (!valuesRef.current) {
      return
    }
    const values = valuesRef.current
    const affiliations = values.affiliations || []
    handleSaveAuthor({
      ...values,
      affiliations: [...affiliations, affiliation._id],
    })
  }

  const handleRemoveAffiliation = (affiliation: Affiliation) => {
    if (!valuesRef.current) {
      return
    }
    const values = valuesRef.current
    handleSaveAuthor({
      ...values,
      affiliations: values.affiliations?.filter((i) => i !== affiliation._id),
    })
  }

  const handleResetAuthor = () => {
    setShowConfirmationDialog(false)
  }

  const handleChangeAuthor = (values: AuthorDetailsFormValues) => {
    valuesRef.current = values
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={() => setOpen(false)}
      shouldCloseOnOverlayClick={true}
    >
      <ModalContainer>
        <ModalHeader>
          <CloseButton
            onClick={() => setOpen(false)}
            data-cy={'modal-close-button'}
          />
        </ModalHeader>
        <ModalBody>
          <ModalSidebar data-cy={'authors-sidebar'}>
            <ModalSidebarHeader>
              <ModalSidebarTitle>Authors</ModalSidebarTitle>
            </ModalSidebarHeader>
            <SidebarContent>
              <AddAuthorButton onClick={handleAddAuthor}>
                <AddIcon width={40} height={40} />
                <ActionTitle>Add Author</ActionTitle>
              </AddAuthorButton>
              <AuthorList
                author={selection}
                authors={authors}
                onSelect={handleSelect}
                moveAuthor={handleMoveAuthor}
              />
            </SidebarContent>
          </ModalSidebar>
          <ScrollableModalContent>
            {selection ? (
              <AuthorForms>
                <SaveAuthorConfirmationDialog
                  isOpen={showConfirmationDialog}
                  onSave={() => handleSaveAuthor(valuesRef.current)}
                  onCancel={handleResetAuthor}
                />
                <AuthorActions
                  author={selection}
                  onSave={() => handleSaveAuthor(valuesRef.current)}
                  onDelete={handleDeleteAuthor}
                  onCancel={() => setOpen(false)}
                />
                <FormLabel>Details</FormLabel>
                <AuthorDetailsForm
                  values={normalizeAuthor(selection)}
                  onChange={handleChangeAuthor}
                  onSave={handleSaveAuthor}
                />
                <FormLabel>Affiliations</FormLabel>
                <AuthorAffiliations
                  author={selection}
                  affiliations={affiliations}
                  onSave={handleSaveAffiliation}
                  onAdd={handleAddAffiliation}
                  onRemove={handleRemoveAffiliation}
                />
              </AuthorForms>
            ) : (
              <AuthorFormPlaceholder />
            )}
          </ScrollableModalContent>
        </ModalBody>
      </ModalContainer>
    </StyledModal>
  )
}
