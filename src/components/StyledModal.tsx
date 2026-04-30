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

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'

import { RoundIconButton } from './Button'
import { SidebarStyles } from './Sidebar'

interface StyledModalProps {
  isOpen: boolean
  onRequestClose?: (e?: Event) => void
  shouldCloseOnOverlayClick?: boolean
  hideOverlay?: boolean
  pointerEventsOnBackdrop?: 'all' | 'none' | 'auto'
  children: React.ReactNode
  className?: string
  style?: {
    content?: React.CSSProperties
  }
  ariaLabelledby?: string
}

export const StyledModal: React.FC<StyledModalProps> = ({
  isOpen,
  onRequestClose,
  shouldCloseOnOverlayClick = true,
  hideOverlay = false,
  pointerEventsOnBackdrop,
  children,
  className,
  style,
  ariaLabelledby,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closedByCancelRef = useRef(false)

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

    const handleNativeClose = (wasOpen: boolean) => {
      if (wasOpen && !closedByCancelRef.current) {
        onRequestClose?.()
      }
      closedByCancelRef.current = false
    }

    const listener = () => handleNativeClose(isOpen)
    dialog.addEventListener('close', listener)
    return () => dialog.removeEventListener('close', listener)
  }, [isOpen, onRequestClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) {
      return
    }
    const handleCancel = (e: Event) => {
      closedByCancelRef.current = true
      onRequestClose?.(e)
    }
    dialog.addEventListener('cancel', handleCancel)
    return () => dialog.removeEventListener('cancel', handleCancel)
  }, [onRequestClose])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (shouldCloseOnOverlayClick && e.target === dialogRef.current) {
      onRequestClose?.()
    }
  }

  return createPortal(
    <Dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      $hideOverlay={hideOverlay}
      $pointerEventsOnBackdrop={pointerEventsOnBackdrop}
      className={className ? `Modal ${className}` : 'Modal'}
      style={style?.content}
      aria-labelledby={ariaLabelledby ? ariaLabelledby : undefined}
    >
      {children}
    </Dialog>,
    document.body
  )
}

const Dialog = styled.dialog<{
  $hideOverlay?: boolean
  $pointerEventsOnBackdrop?: 'all' | 'none' | 'auto'
}>`
  background: transparent;
  border: none;
  position: relative;
  outline: none;
  padding: 0;
  overflow: visible;
  opacity: 1;
  transition:
    opacity 0.5s ease-in-out,
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
    ${(props) => {
      if (props.$hideOverlay) {
        return css`
          background: transparent;
        `
      }
      if (props.$pointerEventsOnBackdrop === 'none') {
        return css`
          background: rgba(0, 0, 0, 0.1);
        `
      }
      return css`
        background: ${props.theme.colors.background.dark};
      `
    }}
    opacity: 1;
    pointer-events: ${(props) => props.$pointerEventsOnBackdrop || 'auto'};
    transition:
      opacity 0.5s ease-in-out,
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

export const ModalContainer = styled.div`
  background: ${(props) => props.theme.colors.background.primary};
  border-radius: ${(props) => props.theme.grid.radius.default};
  box-shadow: ${(props) => props.theme.shadow.dropShadow};
  font-family: ${(props) => props.theme.font.family.sans};
  overflow: hidden;
  margin: ${(props) => props.theme.grid.unit * 3}px;
`

export const ModalHeader = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
`

export const CloseButton = styled(RoundIconButton)<{ size?: number }>`
  box-shadow: none;
  text-indent: -99999px;
  z-index: 2;

  ::before,
  ::after {
    background-color: ${(props) => props.theme.colors.text.secondary};
    border-radius: 2px;
    content: ' ';
    display: block;
    height: 14px;
    transform: rotate(-45deg);
    width: 2px;
    position: absolute;
    top: calc(50% - 7px);
    left: calc(50% - 1px);
  }
  ::after {
    transform: rotate(45deg);
  }
`

export const ModalBody = styled.div`
  align-items: stretch;
  display: flex;
  flex: 1;
  height: 90vh;
  max-height: 680px;
`

export const ModalSidebar = styled.div`
  ${SidebarStyles};
  background-color: ${(props) => props.theme.colors.background.secondary};
  border-top-left-radius: ${(props) => props.theme.grid.radius.default};
  border-bottom-left-radius: ${(props) => props.theme.grid.radius.default};
  max-width: 40vw;
  overflow: auto;
  width: 340px;
`

export const ModalSidebarHeader = styled.div`
  align-items: flex-start;
  display: flex;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.grid.unit * 3}px;
  margin-bottom: ${(props) => props.theme.grid.unit * 6}px;
`

export const ModalSidebarTitle = styled.div`
  font-size: ${(props) => props.theme.font.size.xlarge};
  font-weight: ${(props) => props.theme.font.weight.semibold};
  color: ${(props) => props.theme.colors.text.primary};
  user-select: none;
  white-space: nowrap;
  width: 100%;
`

export const ModelContent = styled.div`
  padding: ${(props) => props.theme.grid.unit * 4}px;
  box-sizing: border-box;
  max-width: 60vw;
  width: 480px;
`

export const ScrollableModalContent = styled(ModelContent)`
  overflow-y: auto;
  max-height: 100%;
`

export const ModalCardBody = styled.div<{ width?: number | string }>`
  box-sizing: border-box;
  padding: ${(props) => 6 * props.theme.grid.unit}px;
  background-color: ${(props) => props.theme.colors.background.primary};
  width: ${(props) =>
    props.width
      ? typeof props.width === 'number'
        ? `${props.width}px`
        : props.width
      : '640px'};
  max-width: 60vw;
  max-height: 80vh;
`

export const ModalTitle = styled.h2`
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: ${(props) => props.theme.font.size.medium};
  font-weight: ${(props) => props.theme.font.weight.bold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 20px 0;
`
