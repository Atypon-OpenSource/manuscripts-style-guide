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
import styled, { ThemeProps } from 'styled-components'

const totalTransitionTime = 800
const transitionDelay = 300
const delayedTransitionTime = totalTransitionTime - transitionDelay

interface Props {
  modalClassName?: Modal.Classes
}

export const ReactModalAdapter: React.FunctionComponent<
  Modal.Props & ThemeProps<ReactModal> & Props
> = ({ className, modalClassName, ...props }) => (
  <Modal
    className={modalClassName}
    portalClassName={className as string}
    closeTimeoutMS={totalTransitionTime}
    appElement={document.getElementById('root') as HTMLElement}
    {...props}
  />
)

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
    background-color: ${(props) => props.theme.colors.background.dark};
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;

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
