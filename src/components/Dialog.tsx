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

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { ButtonGroup, PrimaryButton, SecondaryButton } from './Button'
import { AttentionOrangeIcon, AttentionRedIcon } from './icons'
import { StyledModal } from './StyledModal'
import { TextField } from './TextField'

const Icon = styled.div`
  margin-right: 6px;
  color: red;
  display: inline-flex;
  align-items: center;
`
export const DialogModalBody = styled.div`
  border-radius: ${(props) => props.theme.grid.radius.default};
  box-shadow: ${(props) => props.theme.shadow.dropShadow};
  background: ${(props) => props.theme.colors.background.primary};
  width: 350px;
  max-width: 90vw;
  overflow: hidden;
  padding: ${(props) => props.theme.grid.unit * 6}px;
`

export const MessageContainer = styled.div`
  min-height: 90px;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  word-wrap: break-word;
  margin: ${(props) => props.theme.grid.unit * 4}px 0;

  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.medium} / 1
    ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.5;
`

const HeaderContainer = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  font: ${(props) => props.theme.font.weight.bold}
    ${(props) => props.theme.font.size.medium} / 1
    ${(props) => props.theme.font.family.sans};
  line-height: 1.5;
`

const ButtonsContainer = styled(ButtonGroup)`
  padding-top: ${(props) => props.theme.grid.unit * 5}px;
`

const ConfirmationTextField = styled(TextField)`
  margin-top: ${(props) => props.theme.grid.unit * 4}px;
  margin-bottom: ${(props) => props.theme.grid.unit * 8}px;
`

interface DialogProps {
  isOpen: boolean
  actions: {
    primary: {
      action: () => void
      title?: string
      isDestructive?: boolean
    }
    secondary?: {
      action: () => void
      title: string
    }
    onClose?: () => void
  }
  confirmFieldText?: string
  category: Category
  header: string | React.ReactElement
  message: string | React.ReactElement
  className?: string
  children?: React.ReactNode
}

export enum Category {
  error = 'error',
  confirmation = 'confirmation',
  warning = 'warning',
}

interface ButtonProps {
  isDestructive?: boolean
  disabled?: boolean
  title: string
  action: () => void
  hasForm?: boolean
}

const PrimaryAction = (props: ButtonProps) =>
  props.isDestructive ? (
    props.hasForm ? (
      <PrimaryButton disabled={props.disabled} form="formDialog" type="submit">
        {props.title}
      </PrimaryButton>
    ) : (
      <PrimaryButton
        disabled={props.disabled}
        onClick={props.action}
        autoFocus={true}
      >
        {props.title}
      </PrimaryButton>
    )
  ) : props.hasForm ? (
    <PrimaryButton disabled={props.disabled} form="formDialog" type="submit">
      {props.title}
    </PrimaryButton>
  ) : (
    <PrimaryButton
      disabled={props.disabled}
      onClick={props.action}
      autoFocus={true}
    >
      {props.title}
    </PrimaryButton>
  )

const SecondaryAction = (props: ButtonProps) => (
  <SecondaryButton disabled={props.disabled} onClick={props.action}>
    {props.title}
  </SecondaryButton>
)

export const Dialog: React.FC<DialogProps> = ({
  actions,
  isOpen,
  header,
  message,
  category,
  children,
  confirmFieldText,
  className,
}) => {
  const [primaryActionDisabled, setPrimaryActionDisabled] = useState(true)

  useEffect(() => {
    setPrimaryActionDisabled(!!confirmFieldText)
  }, [confirmFieldText])

  const checkInputValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const testingVal = confirmFieldText && confirmFieldText.toUpperCase()
      const target = event.target
      const newVal = target.value.toUpperCase()

      setPrimaryActionDisabled(newVal !== testingVal)
    },
    [confirmFieldText]
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!primaryActionDisabled) {
        actions.primary.action()
      }
    },
    [primaryActionDisabled, actions.primary]
  )

  const renderButtons = useCallback(
    (disabled: boolean) => (
      <ButtonsContainer>
        {actions.secondary ? (
          !actions.primary.isDestructive ? (
            <>
              <SecondaryAction
                action={actions.secondary.action}
                hasForm={!!confirmFieldText}
                title={actions.secondary.title}
              />
              <PrimaryAction
                action={actions.primary.action}
                disabled={disabled}
                title={actions.primary.title || 'Dismiss'}
              />
            </>
          ) : (
            <>
              <PrimaryAction
                action={actions.primary.action}
                disabled={disabled}
                isDestructive={true}
                hasForm={!!confirmFieldText}
                title={actions.primary.title || 'Dismiss'}
              />
              <SecondaryAction
                action={actions.secondary.action}
                title={actions.secondary.title}
              />
            </>
          )
        ) : (
          <PrimaryAction
            action={actions.primary.action}
            disabled={disabled}
            isDestructive={actions.primary.isDestructive}
            hasForm={!!confirmFieldText}
            title={actions.primary.title || 'Dismiss'}
          />
        )}
      </ButtonsContainer>
    ),
    [actions, confirmFieldText]
  )

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={actions.onClose}
      shouldCloseOnOverlayClick={true}
      className={className}
    >
      <DialogModalBody>
        <HeaderContainer>
          {category === Category.error && (
            <Icon>
              <AttentionRedIcon />
            </Icon>
          )}
          {category === Category.warning && (
            <Icon>
              <AttentionOrangeIcon />
            </Icon>
          )}
          {header}
        </HeaderContainer>
        <MessageContainer>
          {message}
          {confirmFieldText && (
            <form id="formDialog" onSubmit={handleSubmit}>
              <ConfirmationTextField
                autoFocus={true}
                onChange={checkInputValue}
                placeholder={'Please type: ' + confirmFieldText}
                required={true}
              />
            </form>
          )}
          {children}
        </MessageContainer>
        {renderButtons(primaryActionDisabled)}
      </DialogModalBody>
    </StyledModal>
  )
}
