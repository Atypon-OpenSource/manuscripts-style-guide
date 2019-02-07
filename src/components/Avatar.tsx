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
