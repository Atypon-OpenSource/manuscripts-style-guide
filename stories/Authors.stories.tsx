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

import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { useState } from 'react'

import { AuthorsModal } from '../src/components/Authors/AuthorsModal'
import authors from './data/authors'
import affiliations from "./data/affiliations";
import {Affiliation, Contributor} from "@manuscripts/json-schema";

storiesOf('Authors', module).add('AuthorModal', () => {
  const [aaa, setAuthors] = useState(authors)
  const [bbb, setAffiliations] = useState(affiliations)

  const [isOpen, setOpen] = useState(false)

  const handleSaveAuthor = (author: Contributor) => {
    const copy = [...aaa]
    const index = aaa.findIndex((i) => i._id === author._id)
    if (index >= 0) {
      copy[index] = author
    } else {
      copy.push(author)
    }
    setAuthors(copy)
  }

  const handleDeleteAuthor = (author: Contributor) => {
    setAuthors(aaa.filter((i) => i._id !== author._id))
  }

  const handleSaveAffiliation = (affiliation: Affiliation) => {
    const copy = [...bbb]
    const index = bbb.findIndex((i) => i._id === affiliation._id)
    if (index >= 0) {
      copy[index] = affiliation
    } else {
      copy.push(affiliation)
    }
    setAffiliations(copy)
  }

  const handleAddAffiliation = (author: Contributor, affiliation: Affiliation) => {
    if (author.affiliations) {
      author.affiliations.push(affiliation._id)
    } else {
      author.affiliations = [affiliation._id]
    }
    setAuthors(aaa)
  }

  const handleRemoveAffiliation = (author: Contributor, affiliation: Affiliation) => {
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <AuthorsModal
        authors={aaa}
        affiliations={bbb}
        isOpen={isOpen}
        onSaveAuthor={handleSaveAuthor}
        onDeleteAuthor={handleDeleteAuthor}
        onSaveAffiliation={handleSaveAffiliation}
        onAddAffiliation={handleAddAffiliation}
        onRemoveAffiliation={handleRemoveAffiliation}
        onCancel={handleCancel}
      />
    </>
  )
})
