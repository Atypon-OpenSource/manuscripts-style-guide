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

import { SystemUserAvatarIcon } from './icons'

interface SystemUserAvatarProps {
  src?: string
  size: number
  color?: string
}

const SystemUserAvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const RoundedImage = styled.img<{ size: number }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`

const StyledAvatar = styled(SystemUserAvatarIcon)<{
  color?: string
}>`
  path {
    fill: ${(props) => props.color || props.theme.colors.text.secondary};
  }

  &:hover path {
    fill: ${(props) => props.color || props.theme.colors.text.info};
  }
`

export const Avatar: React.FC<SystemUserAvatarProps> = (props) => {
  const [srcError, setSrcError] = useState(false)

  const handleSrcError = useCallback(() => {
    setSrcError(true)
  }, [])

  return (
    <SystemUserAvatarContainer>
      {props.src && !srcError ? (
        <RoundedImage
          src={props.src}
          size={props.size}
          onError={handleSrcError}
        />
      ) : (
        <StyledAvatar
          height={props.size}
          width={props.size}
          color={props.color}
        />
      )}
    </SystemUserAvatarContainer>
  )
}
