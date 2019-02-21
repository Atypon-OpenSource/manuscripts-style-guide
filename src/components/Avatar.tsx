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

import React from 'react'
import { styled, withTheme } from '../styled-components'
import { Theme } from '../theme'
import UserIcon from './icons/user'

interface AvatarProps {
  src?: string
  size: number
  color?: string
  theme: Theme
}

const AvatarContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const RoundedImage = styled.img<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
`

const AvatarComponent: React.FunctionComponent<AvatarProps> = props => (
  <AvatarContainer>
    {props.src ? (
      <RoundedImage {...props} />
    ) : (
      <UserIcon
        {...props}
        color={props.color || props.theme.colors.profile.avatar}
      />
    )}
  </AvatarContainer>
)

export const Avatar = withTheme(AvatarComponent)
