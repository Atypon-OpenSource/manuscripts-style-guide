/*!
 * © 2025 Atypon Systems LLC
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

import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { ModalContainer, StyledModal } from './StyledModal'

export const DraggableModal: React.FC<{
  children: React.ReactNode
  isOpen: boolean
  onRequestClose: () => void
}> = ({ children, isOpen, onRequestClose }) => {
  const [pos, setPos] = useState({ left: 0, top: 0, prevX: 0, prevY: 0 })
  const [drag, setDrag] = useState(false)

  const mouseDown = (event: React.MouseEvent) => {
    if (
      event.target instanceof Element &&
      (event.target.tagName === 'INPUT' || event.target.tagName === 'BUTTON')
    ) {
      return
    }
    pos.prevX = event.screenX
    pos.prevY = event.screenY
    setPos((state) => ({
      ...state,
      prevX: event.screenX,
      prevY: event.screenY,
    }))
    setDrag(true)
  }

  const mouseMove = useCallback(
    function (event: React.MouseEvent) {
      if (!drag) {
        return
      }
      const left = pos.left + event.screenX - pos.prevX
      const top = pos.top + event.screenY - pos.prevY

      setPos((state) => ({
        ...state,
        left,
        top,
        prevX: event.screenX,
        prevY: event.screenY,
      }))
    },
    [pos, drag]
  )

  useEffect(() => {
    const mouseup = () => {
      setDrag(false)
    }
    document.addEventListener('mouseup', mouseup)
    return () => {
      document.removeEventListener('mouseup', mouseup)
    }
  }, [])

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={false}
      pointerEventsOnBackdrop="none"
      style={{
        content: {
          left: pos.left + 'px',
          top: pos.top + 'px',
          transition: 'none',
        },
      }}
    >
      <DraggableModalContainer
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        data-cy="find-replace-modal"
      >
        {children}
      </DraggableModalContainer>
    </StyledModal>
  )
}

const DraggableModalContainer = styled(ModalContainer)`
  padding: 0 2rem 2rem 2rem;
`
