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
  display: flex;
  flex-direction: column;
  width: 800px;
  max-width: 100%;
  margin: auto;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`

export const CloseButton = styled(IconButton)<{ size?: number }>`
  background: ${props => props.theme.colors.brand.xlight};
  border: 5px solid ${props => props.theme.colors.background.primary} !important;
  border-radius: 50%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  height: 40px;
  padding: 0;
  position: relative;
  text-indent: -99999px;
  width: 40px;

  transition: border-color 0.25s;

  &:focus,
  &:hover {
    background: ${props => props.theme.colors.brand.light} !important;
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
  flex: 1;
  flex-direction: column;
  border-radius: ${props => props.theme.grid.radius.default}px;
  border: 1px solid ${props => props.theme.colors.border.secondary};
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
        <CloseButton onClick={handleClose} size={40} />
      </ModalHeader>
      <ModalMain>{children}</ModalMain>
    </ModalContainer>
  </Modal>
)
