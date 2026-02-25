import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { PrimaryButton, SecondaryButton, TertiaryButton } from './Button'
import { CloseButton } from './StyledModal'

export type ModalAction = {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
}

export interface ModalProps {
  isOpen: boolean
  header?: string
  children: React.ReactNode
  actions?: ModalAction[]
  showCloseButton?: boolean
  onClose: () => void
}

const ACTION_COMPONENTS = {
  primary: PrimaryButton,
  secondary: SecondaryButton,
  tertiary: TertiaryButton,
  danger: PrimaryButton,
} as const

const ActionButton: React.FC<ModalAction> = ({
  label,
  onClick,
  variant = 'primary',
}) => {
  const Component = ACTION_COMPONENTS[variant]
  return (
    <Component onClick={onClick} danger={variant === 'danger'}>
      {label}
    </Component>
  )
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  header,
  children,
  actions,
  showCloseButton = true,
  onClose,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }

    const handleNativeClose = () => {
      if (isOpen) {
        onClose()
      }
    }

    dialog.addEventListener('close', handleNativeClose)
    return () => dialog.removeEventListener('close', handleNativeClose)
  }, [isOpen, onClose])

  return (
    <Dialog ref={dialogRef}>
      <ModalContentWrapper>
        {showCloseButton && <ModalCloseButton onClick={onClose} />}
        {header && <ModalHeader>{header}</ModalHeader>}
        <ModalContent>{children}</ModalContent>
        {actions && actions.length > 0 && (
          <ModalFooter>
            {actions.map((action) => (
              <ActionButton key={action.label} {...action} />
            ))}
          </ModalFooter>
        )}
      </ModalContentWrapper>
    </Dialog>
  )
}

const Dialog = styled.dialog`
  border: none;
  border-radius: ${(props) => props.theme.grid.radius.default};
  position: relative;
  overflow: visible;
  width: 320px;
  padding: 0;
  box-shadow: ${(props) => props.theme.shadow.dropShadow};
  font-family: ${(props) => props.theme.font.family.sans};
  opacity: 1;
  transition:
    opacity 0.5s ease,
    display 0.5s ease allow-discrete,
    overlay 0.5s ease allow-discrete;

  &:not([open]) {
    opacity: 0;
  }

  @starting-style {
    &[open] {
      opacity: 0;
    }
  }

  &::backdrop {
    background: rgba(0, 0, 0, 0.4);
    opacity: 1;
    transition:
      opacity 0.5s ease,
      display 0.5s ease allow-discrete,
      overlay 0.5s ease allow-discrete;
  }

  &:not([open])::backdrop {
    opacity: 0;
  }

  @starting-style {
    &[open]::backdrop {
      opacity: 0;
    }
  }
`

const ModalCloseButton = styled(CloseButton)`
  position: absolute;
  right: -${(props) => props.theme.grid.unit * 4}px;
  top: -${(props) => props.theme.grid.unit * 4}px;
`

const ModalHeader = styled.div`
  font-size: ${(props) => props.theme.font.size.xlarge};
  font-weight: ${(props) => props.theme.font.weight.bold};
  color: ${(props) => props.theme.colors.text.primary};
`

const ModalContentWrapper = styled.div`
  padding: ${(props) => props.theme.grid.unit * 4}px;
`

const ModalContent = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.font.size.medium};
  line-height: ${(props) => props.theme.font.lineHeight.normal};
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
  gap: ${(props) => props.theme.grid.unit * 2}px;
  margin-top: ${(props) => props.theme.grid.unit * 4}px;
`
