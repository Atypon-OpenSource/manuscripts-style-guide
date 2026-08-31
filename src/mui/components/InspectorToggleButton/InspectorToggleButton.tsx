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

import { styled } from '@mui/material/styles'
import React from 'react'

import { IconButton, IconButtonProps } from '../IconButton'

const InspectorToggleButtonRoot = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  padding: 0,
  backgroundColor: theme.palette.common.white,
  color: theme.palette.grey[700],
  borderRadius: '50%',
  boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.12)',
}))

/**
 * Shared circular edge handle chrome for inspector / sidebar panels.
 * Hosts own position via `sx` or a styled wrapper.
 */
export const InspectorToggleButton = ({
  size = 'medium',
  type = 'button',
  ...props
}: IconButtonProps) => (
  <InspectorToggleButtonRoot size={size} type={type} {...props} />
)
