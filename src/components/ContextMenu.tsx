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
import * as Icons from './icons' // Dynamically import all icons
import { Tooltip } from './Tooltip'

export interface Actions {
  label: string
  action: () => void
  icon: string
  disabled?: boolean
  selected?: boolean
}

export interface ContextMenuProps {
  actions: Actions[]
}

export interface IconProps {
  width?: number | string
  height?: number | string
  color?: string
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
  &[disabled] {
    color: #c9c9c9 !important;
    background-color: #fff !important;
  }
`

// Dynamically map all icons from the imported Icons object
const icons: { [key: string]: React.FC<IconProps> } = Object.entries(
  Icons
).reduce(
  (acc, [name, IconComponent]) => {
    // Remove the "Icon" suffix from the name (e.g., "AddCommentIcon" -> "AddComment")
    const iconName = name.replace(/Icon$/, '')
    // @ts-ignore
    acc[iconName] = IconComponent
    return acc
  },
  {} as { [key: string]: React.FC<IconProps> }
)

export const ContextMenu: React.FC<ContextMenuProps> = ({ actions }) => (
  <IconButtonGroup size={32}>
    {actions.map((action) => {
      const Icon = icons[action.icon]
      return (
        <ContextMenuIconButton
          key={action.icon}
          data-tooltip-id={action.icon}
          onClick={action.disabled === true ? () => null : action.action}
          className={action.selected ? 'selected' : ''}
          disabled={!!action.disabled}
        >
          <Icon width={18} height={18} />
          <Tooltip id={action.icon} place="bottom">
            {action.label}
          </Tooltip>
        </ContextMenuIconButton>
      )
    })}
  </IconButtonGroup>
)
