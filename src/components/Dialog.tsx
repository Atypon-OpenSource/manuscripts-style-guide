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

import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

import { ButtonGroup, PrimaryButton, SecondaryButton } from './Button'
import { AttentionRedIcon } from './icons'
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

interface DialogState {
  primaryActionDisabled: boolean
}
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
  header: string
  message: string | React.ReactElement
  className?: string
  children?: React.ReactNode
}

export enum Category {
  error = 'error',
  confirmation = 'confirmation',
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
      <PrimaryButton
        danger={true}
        disabled={props.disabled}
        form="formDialog"
        type="submit"
      >
        {props.title}
      </PrimaryButton>
    ) : (
      <PrimaryButton
        danger={true}
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

export class Dialog extends React.Component<DialogProps, DialogState> {
  public state: DialogState = {
    primaryActionDisabled: true,
  }

  public componentDidMount(): void {
    this.setDisabledBtnState(!!this.props.confirmFieldText)
  }

  public render() {
    const {
      actions,
      isOpen,
      header,
      message,
      category,
      children,
      confirmFieldText,
      className,
    } = this.props
    const { primaryActionDisabled } = this.state

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
            {header}
          </HeaderContainer>
          <MessageContainer>
            {message}
            {confirmFieldText && (
              <form id="formDialog" onSubmit={this.handleSubmit}>
                <ConfirmationTextField
                  autoFocus={true}
                  onChange={this.checkInputValue}
                  placeholder={'Please type: ' + confirmFieldText}
                  required={true}
                />
              </form>
            )}
            {children}
          </MessageContainer>
          {this.renderButtons(this.props, primaryActionDisabled)}
        </DialogModalBody>
      </StyledModal>
    )
  }

  private renderButtons = (props: DialogProps, disabled: boolean) => (
    <ButtonsContainer>
      {props.actions.secondary ? (
        !props.actions.primary.isDestructive ? (
          <>
            <SecondaryAction
              action={props.actions.secondary.action}
              hasForm={!!this.props.confirmFieldText}
              title={props.actions.secondary.title}
            />
            <PrimaryAction
              action={props.actions.primary.action}
              disabled={disabled}
              title={props.actions.primary.title || 'Dismiss'}
            />
          </>
        ) : (
          <>
            <PrimaryAction
              action={props.actions.primary.action}
              disabled={disabled}
              isDestructive={true}
              hasForm={!!this.props.confirmFieldText}
              title={props.actions.primary.title || 'Dismiss'}
            />
            <SecondaryAction
              action={props.actions.secondary.action}
              title={props.actions.secondary.title}
            />
          </>
        )
      ) : (
        <PrimaryAction
          action={props.actions.primary.action}
          disabled={disabled}
          isDestructive={props.actions.primary.isDestructive}
          hasForm={!!this.props.confirmFieldText}
          title={props.actions.primary.title || 'Dismiss'}
        />
      )}
    </ButtonsContainer>
  )

  private checkInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const testingVal =
      this.props.confirmFieldText && this.props.confirmFieldText.toUpperCase()
    const target = event.target
    const newVal = target.value.toUpperCase()

    this.setDisabledBtnState(newVal !== testingVal)
  }

  private setDisabledBtnState = (state: boolean) => {
    this.setState({ primaryActionDisabled: state })
  }

  private handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    const { primaryActionDisabled } = this.state
    e.preventDefault()

    if (!primaryActionDisabled) {
      this.props.actions.primary.action()
    }
  }
}
