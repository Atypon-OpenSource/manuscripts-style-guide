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

import React from 'react'
import styled from 'styled-components'

import { IconButton, IconButtonGroup } from './Button'
import {
  AddCommentIcon,
  AddOutlineIcon,
  DeleteIcon,
  EditIcon,
  ImageDefaultIcon,
  ImageLeftIcon,
  ImageRightIcon,
  ScrollIcon,
} from './icons'
import { Tooltip } from './Tooltip'

export interface Actions {
  label: string
  action: () => void
  icon: string
  selected?: boolean
}

export interface ContextMenuProps {
  actions: Actions[]
  icons?: Record<string, React.FC>
}

const ContextMenuIconButton = styled(IconButton)`
  color: #6e6e6e;
  &:not([disabled]).selected {
    background-color: #c9c9c9;
  }
  &:not([disabled]):hover,
  &:not([disabled]):focus {
    color: #363636;
    background-color: #f2f2f2;
    border-color: #f2f2f2;
  }
`

const icons: { [key: string]: React.FC } = {
  AddComment: AddCommentIcon,
  Edit: EditIcon,
  AddOutline: AddOutlineIcon,
  Scroll: ScrollIcon,
  Delete: DeleteIcon,
  ImageDefault: ImageDefaultIcon,
  ImageLeft: ImageLeftIcon,
  ImageRight: ImageRightIcon,
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ actions }) => (
  <IconButtonGroup size={32}>
    {actions.map((action) => {
      const Icon = icons[action.icon as keyof typeof icons] || (() => null)

      return (
        <ContextMenuIconButton
          key={action.icon}
          data-tooltip-id={action.icon}
          onClick={action.action}
          className={action.selected ? 'selected' : ''}
        >
          <Icon />
          <Tooltip id={action.icon} place="bottom">
            {action.label}
          </Tooltip>
        </ContextMenuIconButton>
      )
    })}
  </IconButtonGroup>
)
