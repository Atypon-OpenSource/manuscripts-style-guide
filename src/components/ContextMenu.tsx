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

import React, { ReactElement, useMemo, useState } from 'react'

import { IconButton, IconButtonGroup } from './Button'
import { AddComment, EditIcon } from './icons'
import { Tooltip } from './Tooltip'
import styled from 'styled-components'

export interface Actions {
  label: string
  action: () => void
  icon: string
}

export interface ContextMenuProps {
  actions: Actions[]
}

const Icons: {
  [index: string]:
    | React.FC<React.SVGAttributes<SVGElement>>
    | (() => JSX.Element)
} = {
  AddComment: AddComment,
  EditIcon: EditIcon,
}

const ContextMenuIconButton = styled(IconButton)`
  &:not([disabled]):hover, &:not([disabled]):focus {
    color: #363636;
    background-color: #f2f2f2;
    border-color: #f2f2f2;
  }
  `

export const ContextMenu: React.FC<ContextMenuProps> = ({ actions }) => {
  let Icon: React.FC<React.SVGAttributes<SVGElement>> | (() => JSX.Element)
  return (
    <>
      <IconButtonGroup>
        {actions.map((action) => {
          {
            Icon = Icons[action.icon]
          }
          return (
            <ContextMenuIconButton
              key={action.icon}
              data-tooltip-id={action.icon}
              onClick={action.action}
            >
              <Icon />
              <Tooltip id={action.icon} place="bottom">
                {action.label}
              </Tooltip>
            </ContextMenuIconButton>
          )
        })}
      </IconButtonGroup>
    </>
  )
}
