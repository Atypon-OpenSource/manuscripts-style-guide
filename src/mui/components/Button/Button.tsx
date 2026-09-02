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

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import React from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

export interface ButtonProps
  extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  variant?: ButtonVariant
  danger?: boolean
  size?: 'small' | 'medium' | 'large'
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
}

const variantMap: Record<
  ButtonVariant,
  { variant: MuiButtonProps['variant']; color: MuiButtonProps['color'] }
> = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'outlined', color: 'secondary' },
  tertiary: { variant: 'text', color: 'secondary' },
}

export const Button = ({
  variant = 'primary',
  danger,
  size = 'medium',
  ...rest
}: ButtonProps) => {
  const mapped = variantMap[variant]

  return (
    <MuiButton
      variant={mapped.variant}
      color={danger ? 'error' : mapped.color}
      size={size}
      {...rest}
    />
  )
}
