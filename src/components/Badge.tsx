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
`
