/*!
 * © 2019 Atypon Systems LLC
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

import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { AvatarIcon, ProfileIcon } from './icons'

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

interface AvatarProps {
  src?: string
  size: number
  color?: string
  opacity?: number
  name?: string
}

const AvatarContainer = styled.div<{ $opacity: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: ${(props) => props.$opacity};
`

const RoundedImage = styled.img<{ $size: number }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`

const StyledAvatar = styled(ProfileIcon)<{
  $color?: string
  $opacity?: number
}>`
  path {
    fill: ${(props) => props.$color || props.theme.colors.text.secondary};
  }

  &:hover path {
    fill: ${(props) => props.$color || props.theme.colors.text.info};
  }
`

const InitialsCircle = styled.div<{ $size: number; $bg: string }>`
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  border-radius: 50%;
  background: ${(props) => props.$bg};
  color: #ffffff;
  font-weight: bold;
  font-size: ${(props) => Math.round(props.$size * 0.4)}px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-shrink: 0;
`

export const Avatar: React.FC<AvatarProps> = (props) => {
  const [srcError, setSrcError] = useState(false)

  const handleSrcError = useCallback(() => {
    setSrcError(true)
  }, [])

  const showInitials = (!props.src || srcError) && !!props.name

  return (
    <AvatarContainer $opacity={props.opacity || 1}>
      {props.src && !srcError ? (
        <RoundedImage
          src={props.src}
          $size={props.size}
          onError={handleSrcError}
        />
      ) : showInitials ? (
        <InitialsCircle
          $size={props.size}
          $bg={
            INITIALS_PALETTE[
              props.name!.charCodeAt(0) % INITIALS_PALETTE.length
            ]
          }
        >
          {getInitials(props.name!)}
        </InitialsCircle>
      ) : (
        <StyledAvatar
          height={props.size}
          width={props.size}
          $color={props.color}
        />
      )}
    </AvatarContainer>
  )
}
