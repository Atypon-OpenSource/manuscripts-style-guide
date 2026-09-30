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

import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import React from 'react'

import { ProfileIcon } from '../../../components/icons'

const INITIALS_PALETTE = [
  '#1a9bc7',
  '#31a056',
  '#e65100',
  '#6a1b9a',
  '#c62828',
  '#1565c0',
  '#558b2f',
  '#00695c',
]

const getInitials = (name: string): string => {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
}

export interface AvatarProps extends Omit<
  MuiAvatarProps,
  'children' | 'color'
> {
  size: number
  name?: string
  color?: string
  opacity?: number
}

export const Avatar = ({
  size,
  name,
  color,
  opacity = 1,
  src,
  alt,
  ...rest
}: AvatarProps) => {
  const initials = name ? getInitials(name) : undefined
  const initialsBg = name
    ? INITIALS_PALETTE[name.charCodeAt(0) % INITIALS_PALETTE.length]
    : undefined

  return (
    <AvatarRoot
      {...rest}
      src={src}
      alt={alt ?? name}
      ownerState={{ size, opacity, initialsBg, initials: !!initials, color }}
    >
      {initials ?? <ProfileIcon height={size} width={size} />}
    </AvatarRoot>
  )
}

type AvatarOwnerState = {
  size: number
  opacity?: number
  initialsBg?: string
  initials?: boolean
  color?: string
}

const AvatarRoot = styled(MuiAvatar)<{ ownerState: AvatarOwnerState }>(
  ({ theme, ownerState }) => ({
    width: ownerState.size,
    height: ownerState.size,
    fontSize: Math.round(ownerState.size * 0.4),
    opacity: ownerState.opacity,
    backgroundColor: ownerState.initialsBg ?? 'transparent',
    color: ownerState.initials
      ? theme.palette.common.white
      : ownerState.color || theme.palette.grey[700],
    ...(!ownerState.initials && {
      '&:hover': {
        color: ownerState.color || theme.palette.info.main,
      },
    }),
  })
)
