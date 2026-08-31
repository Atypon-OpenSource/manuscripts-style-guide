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

import MuiToggleButton, {
  ToggleButtonProps as MuiToggleButtonProps,
} from '@mui/material/ToggleButton'
import React from 'react'

export interface ToggleButtonProps
  extends Omit<MuiToggleButtonProps, 'size' | 'value'> {
  danger?: boolean
  size?: 'small' | 'medium' | 'large'
  value?: MuiToggleButtonProps['value']
}

export const ToggleButton = ({
  danger,
  size = 'medium',
  color,
  value = 'toggle',
  ...rest
}: ToggleButtonProps) => (
  <MuiToggleButton
    value={value}
    color={danger ? 'error' : color}
    size={size}
    {...rest}
  />
)
