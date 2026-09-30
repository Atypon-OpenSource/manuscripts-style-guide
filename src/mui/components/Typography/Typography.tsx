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

import MuiTypography, {
  TypographyProps as MuiTypographyProps,
} from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import React from 'react'

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption'
export type TypographyColor = 'primary' | 'secondary' | 'muted'
export type TypographyFontWeight = 'regular' | 'medium' | 'bold' | number

export interface TypographyProps extends Omit<
  MuiTypographyProps,
  'variant' | 'color'
> {
  variant?: TypographyVariant
  color?: TypographyColor
  fontWeight?: TypographyFontWeight
  italic?: boolean
  uppercase?: boolean
  clamp?: 2 | 3
}

const variantMap: Record<TypographyVariant, MuiTypographyProps['variant']> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  body: 'body1',
  caption: 'caption',
}

export const Typography = ({
  variant = 'body',
  color = 'primary',
  fontWeight,
  italic,
  uppercase,
  clamp,
  ...rest
}: TypographyProps) => (
  <TypographyRoot
    {...rest}
    variant={variantMap[variant]}
    ownerState={{ color, fontWeight, italic, uppercase, clamp }}
  />
)

type TypographyOwnerState = {
  color: TypographyColor
  fontWeight?: TypographyFontWeight
  italic?: boolean
  uppercase?: boolean
  clamp?: 2 | 3
}

const TypographyRoot = styled(MuiTypography)<{
  ownerState: TypographyOwnerState
}>(({ theme, ownerState }) => {
  const fontWeight =
    ownerState.fontWeight === undefined
      ? undefined
      : typeof ownerState.fontWeight === 'number'
        ? ownerState.fontWeight
        : {
            regular: theme.typography.fontWeightRegular,
            medium: theme.typography.fontWeightMedium,
            bold: theme.typography.fontWeightBold,
          }[ownerState.fontWeight]

  return {
    color: {
      primary: theme.palette.text.primary,
      secondary: theme.palette.text.secondary,
      muted: theme.palette.text.disabled,
    }[ownerState.color],
    ...(fontWeight !== undefined && { fontWeight }),
    ...(ownerState.italic && { fontStyle: 'italic' }),
    ...(ownerState.uppercase && { textTransform: 'uppercase' }),
    ...(ownerState.clamp && {
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitLineClamp: ownerState.clamp,
      WebkitBoxOrient: 'vertical',
    }),
  }
})
