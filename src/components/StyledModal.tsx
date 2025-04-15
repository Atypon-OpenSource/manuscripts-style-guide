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
import ReactModal from 'react-modal'
import styled from 'styled-components'

import { RoundIconButton } from './Button'
import { SidebarStyles } from './Sidebar'

const totalTransitionTime = 800
const transitionDelay = 300
const delayedTransitionTime = totalTransitionTime - transitionDelay

interface Props {
  modalClassName?: ReactModal.Classes
  pointerEventsOnBackdrop?: 'all' | 'none' | 'auto'
}

const ReactModalAdapter: React.FC<ReactModal.Props & Props> = ({
  className,
  modalClassName,
  ...props
}) => {
  props.style = props.style || {}
  if (props.pointerEventsOnBackdrop == 'none') {
    props.style.content = {
      ...props.style.content,
      pointerEvents: 'all',
    }
  }
  return (
    <ReactModal
      className={modalClassName}
      portalClassName={className as string}
      closeTimeoutMS={totalTransitionTime}
      preventScroll={true}
      appElement={document.getElementById('root') as HTMLElement}
      {...props}
    />
  )
}

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
  z-index: 1;
`

export const CloseButton = styled(RoundIconButton)<{ size?: number }>`
  box-shadow: none;
  text-indent: -99999px;

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
`

export const StyledModal = styled(ReactModalAdapter).attrs({
  closeTimeoutMS: totalTransitionTime,
  overlayClassName: {
    base: 'Overlay',
    afterOpen: 'Overlay--after-open',
    beforeClose: 'Overlay--before-close',
  },
  modalClassName: {
    base: 'Modal',
    afterOpen: 'Modal--after-open',
    beforeClose: 'Modal--before-close',
  },
})`
  .Overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) =>
      props.pointerEventsOnBackdrop === 'none'
        ? 'rgba(0,0,0,0.1)'
        : props.theme.colors.background.dark};
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: ${(props) => props.pointerEventsOnBackdrop || 'auto'};

    &--after-open {
      transition: opacity ${totalTransitionTime}ms ease-in-out;
      opacity: 1;
    }

    &--before-close {
      transition: opacity ${delayedTransitionTime}ms ease-in-out;
      transition-delay: ${transitionDelay}ms;
      opacity: 0;
    }
  }

  .Modal {
    background: transparent;
    border: none;
    position: relative;
    outline: none;
    opacity: 0;
    transition: opacity ${delayedTransitionTime}ms ease-in-out,
      top ${delayedTransitionTime}ms ease-in-out;
    transition-delay: ${transitionDelay}ms;

    &--after-open {
      opacity: 1;
    }

    &--before-close {
      transition-delay: 0ms;
      opacity: 0;
    }
  }
`

// adapted from https://github.com/reactjs/react-modal/issues/603
