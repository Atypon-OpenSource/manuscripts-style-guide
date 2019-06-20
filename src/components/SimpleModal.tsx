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

import CloseIconDark from '@manuscripts/assets/react/CloseIconDark'
import React from 'react'
import Modal from 'react-modal'
import { styled } from '../styled-components'

if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root')
} else {
  Modal.setAppElement(document.createElement('div'))
}

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${props => props.theme.fontFamily};
  width: 800px;
  max-width: 100%;
  margin: auto;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`

export const CloseButton = styled.button.attrs({
  type: 'button',
})`
  width: 45px;
  height: 35px;
  display: inline-block;
  cursor: pointer;
  background: transparent;
  border: none;

  &:focus {
    outline: none;
  }
`

export const ModalMain = styled.div`
  flex: 1;
  flex-direction: column;
  border-radius: ${props => props.theme.radius}px;
  border: 1px solid ${props => props.theme.colors.modal.border};
  box-shadow: 0 10px 20px 0 rgba(107, 134, 164, 0.19);
  background: #fff;
`

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(217, 224, 243, 1)',
    opacity: 0.91,
  },
  content: {
    background: 'transparent',
    border: 'none',
    width: 800,
    maxWidth: '100%',
    padding: 0,
    margin: 'auto',
  },
}

interface Props {
  handleClose: () => void
}

export const SimpleModal: React.FunctionComponent<Props> = ({
  children,
  handleClose,
}) => (
  <Modal
    isOpen={true}
    onRequestClose={handleClose}
    shouldCloseOnOverlayClick={true}
    style={modalStyle}
  >
    <ModalContainer>
      <ModalHeader>
        <CloseButton onClick={handleClose}>
          <CloseIconDark />
        </CloseButton>
      </ModalHeader>
      <ModalMain>{children}</ModalMain>
    </ModalContainer>
  </Modal>
)
