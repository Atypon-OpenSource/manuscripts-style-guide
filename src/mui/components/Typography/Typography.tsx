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

const colorMap: Record<TypographyColor, string> = {
  primary: 'text.primary',
  secondary: 'text.secondary',
  muted: 'text.disabled',
}

const fontWeightMap: Record<'regular' | 'medium' | 'bold', number> = {
  regular: 400,
  medium: 500,
  bold: 700,
}

export const Typography = ({
  variant = 'body',
  color = 'primary',
  fontWeight,
  italic,
  uppercase,
  clamp,
  sx,
  ...rest
}: TypographyProps) => {
  const resolvedWeight =
    fontWeight === undefined
      ? undefined
      : typeof fontWeight === 'number'
        ? fontWeight
        : fontWeightMap[fontWeight]

  return (
    <MuiTypography
      variant={variantMap[variant]}
      sx={[
        {
          color: colorMap[color],
          ...(resolvedWeight !== undefined && { fontWeight: resolvedWeight }),
          ...(italic && { fontStyle: 'italic' }),
          ...(uppercase && { textTransform: 'uppercase' }),
          ...(clamp && {
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: clamp,
            WebkitBoxOrient: 'vertical',
          }),
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    />
  )
}
