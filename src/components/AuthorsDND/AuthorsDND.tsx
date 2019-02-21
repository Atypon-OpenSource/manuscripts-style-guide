import { Contributor, UserProfile } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import { styled } from '../../styled-components'
import DraggableAuthorItem from './DraggableAuthorItem'

const SidebarList = styled.div`
  flex: 1;
  overflow-y: visible;
`

interface Props {
  authors: Contributor[]
  selectAuthor: (item: Contributor) => void
  selectedAuthor: Contributor | null
  handleDrop: (oldIndex: number, newIndex: number) => void
  getSidebarItemDecorator?: (authorID: string) => JSX.Element | null
  components?: {
    AuthorName: React.FunctionComponent
  }
}

export const AuthorsDND: React.FunctionComponent<Props> = ({
  authors,
  selectAuthor,
  selectedAuthor,
  handleDrop,
  getSidebarItemDecorator,
  components,
}) => (
  <SidebarList>
    {authors.map((author, index) => {
      // const affiliations = authorAffiliations.get(author._id)
      // const user = users.findOne(author.userID) // TODO

      const user: Partial<UserProfile> = {
        _id: author.userID,
      }

      const authorItem = {
        _id: author._id,
        priority: author.priority || null,
        index,
      }

      const decorator = getSidebarItemDecorator
        ? getSidebarItemDecorator(author._id)
        : null

      return (
        <DraggableAuthorItem
          key={author._id}
          authorItem={authorItem}
          onDrop={handleDrop}
          author={author}
          authors={authors}
          user={user}
          selectedAuthor={selectedAuthor}
          selectAuthor={selectAuthor}
          sidebarItemDecorator={decorator}
          components={components}
        />
      )
    })}
  </SidebarList>
)
