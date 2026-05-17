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

import React from 'react'
import styled from 'styled-components'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'warning'
  | 'info'
  | 'bordered'
  | 'success'
  | 'dark'
  | 'orange'
export type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
  width?: number
  size?: BadgeSize
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  label,
  width,
  size = 'md',
}) => {
  return (
    <BadgeContainer $variant={variant} $width={width} $size={size}>
      {label}
    </BadgeContainer>
  )
}

const BadgeContainer = styled.div<{
  $variant: BadgeVariant
  $width?: number
  $size: BadgeSize
}>`
  background: ${(props) => props.theme.colors.badge[props.$variant].background};
  color: ${(props) => props.theme.colors.badge[props.$variant].color};
  font-family: ${(props) => props.theme.font.family.Lato};
  font-weight: ${(props) => props.theme.font.weight.bold};
  font-size: ${(props) =>
    props.$size === 'sm'
      ? props.theme.font.size.small
      : props.theme.font.size.normal};
  line-height: ${(props) =>
    props.$size === 'sm'
      ? props.theme.font.lineHeight.normal
      : props.theme.font.lineHeight.large};
  width: ${(props) => (props.$width ? `${props.$width}px` : 'fit-content')};
  padding-inline: ${(props) => props.theme.grid.unit * 2}px;
  padding-block: ${(props) => props.theme.grid.unit}px;
  border-radius: ${(props) => props.theme.grid.radius.small};
  text-align: center;
  border: ${(props) =>
    props.theme.colors.badge[props.$variant].border
      ? `1px solid ${props.theme.colors.badge[props.$variant].border}`
      : 'none'};
  min-width: max-content;
  text-transform: capitalize;
`

export const WarningBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #fe8f1f;
  color: white;
  border-radius: 50%;
  min-width: 14px;
  height: 14px;
  font-family: 'Lato', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 9px;
  font-weight: 400;
  line-height: 1;
  z-index: 10;
`
export const ErrorBadge = styled(WarningBadge)`
  background-color: #f35143;
`
export const IconWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
