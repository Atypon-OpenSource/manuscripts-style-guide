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

import { IconButton, IconTextButton } from './Button'
import {
  AttentionBlueIcon,
  AttentionGreenIcon,
  AttentionOrangeIcon,
  AttentionRedIcon,
  XIcon,
} from './icons'

export type AlertVariant = 'success' | 'error' | 'info' | 'warning'

interface AlertLink {
  label: string
  onClick: () => void
}

interface CloseConfig {
  onClick?: () => void
  variant?: 'icon' | 'text'
  label?: string
}

export interface AlertMessageProps {
  title?: string
  message: string
  variant: AlertVariant
  link?: AlertLink
  closeConfig?: CloseConfig
  className?: string
}

const variantIcons = {
  success: AttentionGreenIcon,
  error: AttentionRedIcon,
  info: AttentionBlueIcon,
  warning: AttentionOrangeIcon,
} as const

export const AlertMessage: React.FC<AlertMessageProps> = ({
  title,
  message,
  variant,
  link,
  closeConfig,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const AlertIcon = variantIcons[variant]

  const handleClose = () => {
    setIsOpen(false)
    closeConfig?.onClick?.()
  }

  const renderCloseAction = () => {
    if (!closeConfig) {
      return null
    }

    return (
      <CloseAction>
        {closeConfig.variant === 'icon' ? (
          <CloseIconButton onClick={handleClose}>
            <XIcon />
          </CloseIconButton>
        ) : (
          <DismissButton onClick={handleClose}>
            {closeConfig.label}
          </DismissButton>
        )}
      </CloseAction>
    )
  }

  if (!isOpen) {
    return null
  }

  return (
    <Alert $variant={variant} className={className}>
      <IconWrapper $hasTitle={!!title}>
        <AlertIcon />
      </IconWrapper>

      <Content>
        {title && <Title>{title}</Title>}
        <MessageRow>
          <Message>{message}</Message>
          {link && <ActionLink onClick={link.onClick}>{link.label}</ActionLink>}
        </MessageRow>
      </Content>

      {renderCloseAction()}
    </Alert>
  )
}

const Alert = styled.div<{ $variant: AlertVariant }>`
  align-items: center;
  background-color: ${(props) => props.theme.colors.background[props.$variant]};
  border: 1px solid ${(props) => props.theme.colors.border[props.$variant]};
  border-radius: ${(props) => props.theme.grid.radius.small};
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.normal} / 1
    ${(props) => props.theme.font.family.Lato};
  gap: ${(props) => props.theme.grid.unit * 3}px;
  padding: ${(props) => props.theme.grid.unit * 3}px;
`

const IconWrapper = styled.div<{ $hasTitle: boolean }>`
  display: flex;
  align-self: ${(props) => (props.$hasTitle ? 'flex-start' : 'center')};
`

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${(props) => props.theme.grid.unit}px;
`

const Title = styled.span`
  font-weight: ${(props) => props.theme.font.weight.semibold};
`

const MessageRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${(props) => props.theme.grid.unit * 2}px;
`

const ActionLink = styled.button`
  font-size: ${(props) => props.theme.font.size.normal};
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
`

const Message = styled.div`
  font-size: ${(props) => props.theme.font.size.normal};
`

const CloseIconButton = styled(IconButton)`
  width: ${(props) => props.theme.grid.unit * 6}px;
  height: ${(props) => props.theme.grid.unit * 6}px;
`

const CloseAction = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: auto;
`

const DismissButton = styled(IconTextButton)`
  font-size: ${(props) => props.theme.font.size.normal};
  color: inherit;
`
