import { Contributor } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import { initials } from '../../lib/name'
import { PrimaryButton } from '../Button'
import { Category, Dialog } from '../Dialog'

interface Props {
  author: Contributor
  isOpen: boolean
  removeAuthor: () => void
  handleOpen: () => void
}

class RemoveAuthorButton extends React.Component<Props> {
  public render() {
    const { isOpen } = this.props
    const { removeAuthor, author } = this.props
    const actions = {
      primary: {
        action: this.props.handleOpen,
        title: 'Cancel',
      },
      secondary: {
        action: removeAuthor,
        title: 'Remove',
        isDestructive: true,
      },
    }
    return (
      <React.Fragment>
        <PrimaryButton type="button" onClick={this.props.handleOpen}>
          Delete
        </PrimaryButton>
        {isOpen && (
          <Dialog
            isOpen={isOpen}
            actions={actions}
            category={Category.confirmation}
            header={'Remove author'}
            message={`Are you sure you want to remove ${initials(
              author.bibliographicName
            )}${' '}${author.bibliographicName.family} from the authors list?`}
          />
        )}
      </React.Fragment>
    )
  }
}

export default RemoveAuthorButton
