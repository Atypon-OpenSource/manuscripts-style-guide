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

import AttentionRed from '@manuscripts/assets/react/AttentionRed'
import React from 'react'
import { styled } from '../styled-components'
import { ButtonGroup, GreyButton, PrimaryButton } from './Button'
import { StyledModal } from './StyledModal'

const Icon = styled.div`
  margin-right: 6px;
  color: ${props => props.theme.colors.dialog.icon};
  display: inline-flex;
  align-items: center;
`
const ModalBody = styled.div`
  border-radius: ${props => props.theme.radius}px;
  box-shadow: 0 4px 9px 0 ${props => props.theme.colors.dialog.shadow};
  background: ${props => props.theme.colors.dialog.background};
  min-width: 200px;
`

const MessageContainer = styled.div`
  max-width: 297px;
  min-height: 95px;
  font-family: ${props => props.theme.fontFamily};
  font-size: 16px;
  color: ${props => props.theme.colors.dialog.text};
  margin-top: 15px;
  margin-left: 20px;
  margin-right: 20px;
`
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: ${props => props.theme.fontFamily};
  font-size: 16px;
  font-weight: 500;
  padding: 15px 20px 0;
`

const ButtonsContainer = styled(ButtonGroup)`
  padding: 20px;
  padding-left: 0;
`

interface DialogProps {
  isOpen: boolean
  actions: {
    primary: {
      action: () => void
      title?: string
    }
    secondary?: {
      action: () => void
      title: string
      isDestructive: boolean
    }
  }
  category: Category
  header: string
  message: string | React.ReactElement<{}>
}

export enum Category {
  error = 'error',
  confirmation = 'confirmation',
}

export const Dialog: React.FunctionComponent<DialogProps> = ({
  isOpen,
  actions,
  header,
  message,
  category,
}) => (
  <StyledModal
    isOpen={isOpen}
    onRequestClose={actions.primary.action}
    shouldCloseOnOverlayClick={true}
  >
    <ModalBody>
      <HeaderContainer>
        {category === Category.error && (
          <Icon>
            <AttentionRed />
          </Icon>
        )}
        {header}
      </HeaderContainer>
      <MessageContainer>{message}</MessageContainer>
      <ButtonsContainer>
        {category === Category.confirmation && actions.secondary ? (
          !actions.secondary.isDestructive ? (
            <>
              <GreyButton onClick={actions.primary.action}>
                {actions.primary.title || 'Dismiss'}
              </GreyButton>
              <PrimaryButton onClick={actions.secondary.action}>
                {actions.secondary.title}
              </PrimaryButton>
            </>
          ) : (
            <>
              <GreyButton onClick={actions.secondary.action}>
                {actions.secondary.title}
              </GreyButton>
              <PrimaryButton onClick={actions.primary.action}>
                {actions.primary.title || 'Dismiss'}
              </PrimaryButton>
            </>
          )
        ) : (
          <PrimaryButton onClick={actions.primary.action}>
            {actions.primary.title || 'Dismiss'}
          </PrimaryButton>
        )}
      </ButtonsContainer>
    </ModalBody>
  </StyledModal>
)
