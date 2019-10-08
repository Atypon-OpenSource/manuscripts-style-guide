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
        <PrimaryButton danger={true} onClick={this.props.handleOpen}>
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
