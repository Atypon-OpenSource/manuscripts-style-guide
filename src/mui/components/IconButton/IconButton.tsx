/*!
 * © 2026 Atypon Systems LLC
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

import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import React from 'react'

export interface IconButtonProps extends Omit<MuiIconButtonProps, 'size'> {
  bordered?: boolean
  size?: MuiIconButtonProps['size']
  danger?: boolean
}

const IconButtonRoot = styled(MuiIconButton, {
  shouldForwardProp: (prop) => prop !== 'bordered',
})<{ bordered?: boolean }>(({ theme, bordered }) => ({
  svg: {
    pointerEvents: 'none',
  },
  ...(bordered && {
    border: '1px solid',
    borderColor: theme.palette.grey[300],
  }),
}))

export const IconButton = ({
  bordered,
  danger,
  color,
  size = 'medium',
  ...props
}: IconButtonProps) => (
  <IconButtonRoot
    color={danger ? 'error' : color}
    bordered={bordered}
    size={size}
    {...props}
  />
)
