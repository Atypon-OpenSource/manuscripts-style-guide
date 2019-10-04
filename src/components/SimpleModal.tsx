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
import Modal from 'react-modal'
import { styled } from '../styled-components'
import { IconButton } from './Button'

Modal.setAppElement('#root')

export const ModalContainer = styled.div`
  background: ${props => props.theme.colors.background.primary};
  border-radius: ${props => props.theme.grid.radius.default};
  box-shadow: ${props => props.theme.shadow.dropShadow};
  font-family: ${props => props.theme.font.family.sans};
  overflow: hidden;
  margin: ${props => props.theme.grid.unit * 3}px;
`

export const ModalHeader = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`

export const CloseButton = styled(IconButton)<{ size?: number }>`
  background: ${props => props.theme.colors.background.primary};
  border: 5px solid ${props => props.theme.colors.background.primary} !important;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  display: inline-block;
  height: 40px;
  padding: 0;
  position: relative;
  text-indent: -99999px;
  width: 40px;

  transition: border-color 0.25s;

  &:focus,
  &:hover {
    background: ${props => props.theme.colors.background.fifth} !important;
  }

  ::before,
  ::after {
    background-color: ${props => props.theme.colors.text.secondary};
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

export const ModalMain = styled.div`
  padding: ${props => props.theme.grid.unit * 4}px;
`

const modalStyle = (width: string) => {
  const parameters = {
    overlay: {
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      position: 'fixed',
      right: 0,
      top: 0,
    },
    content: {
      background: 'transparent',
      border: 'none',
      bottom: 0,
      left: 0,
      margin: 'auto',
      maxHeight: '70vh',
      maxWidth: '70vw',
      padding: 0,
      position: 'relative',
      right: 0,
      top: 0,
      width,
    },
  }
  return parameters
}

interface Props {
  handleClose: () => void
  closeWithOverlay: boolean
  width?: string
}

export const SimpleModal: React.FunctionComponent<Props> = ({
  children,
  closeWithOverlay,
  handleClose,
  width,
}) => (
  <Modal
    isOpen={true}
    onRequestClose={handleClose}
    shouldCloseOnOverlayClick={closeWithOverlay}
    style={modalStyle(width || 'auto')}
  >
    <ModalContainer>
      <ModalHeader>
        <CloseButton onClick={handleClose} />
      </ModalHeader>
      <ModalMain>{children}</ModalMain>
    </ModalContainer>
  </Modal>
)
