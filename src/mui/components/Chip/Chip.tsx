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

import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip'
import { Theme, useTheme } from '@mui/material/styles'
import React from 'react'

import { palette as basePalette } from '../../theme/palette'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'warning'
  | 'info'
  | 'success'
  | 'dark'
  | 'orange'

export interface ChipProps extends Omit<
  MuiChipProps,
  'color' | 'size' | 'variant'
> {
  variant?: BadgeVariant
  size?: 'small' | 'medium'
}

const getVariantColors = ({ palette }: Theme) => ({
  default: { backgroundColor: palette.grey[300], color: palette.grey[900] },
  primary: {
    backgroundColor: palette.primary.dark,
    color: palette.common.white,
  },
  warning: {
    backgroundColor: basePalette.amber,
    color: palette.grey[900],
  },
  info: { backgroundColor: palette.info.main, color: palette.common.white },
  success: {
    backgroundColor: palette.success.dark,
    color: palette.common.white,
  },
  dark: { backgroundColor: palette.grey[700], color: palette.common.white },
  orange: {
    backgroundColor: palette.warning.dark,
    color: palette.common.white,
  },
})

export const Chip = ({
  variant = 'default',
  size = 'medium',
  style,
  sx,
  ...rest
}: ChipProps) => {
  const theme = useTheme()

  return (
    <MuiChip
      {...rest}
      variant="filled"
      size={size}
      style={{ borderRadius: 4, ...style }}
      sx={{
        fontSize:
          size === 'small'
            ? theme.typography.caption.fontSize
            : theme.typography.body1.fontSize,
        fontWeight: 700,
        '& .MuiChip-label::first-letter': { textTransform: 'uppercase' },
        ...getVariantColors(theme)[variant],
        ...sx,
      }}
    />
  )
}
