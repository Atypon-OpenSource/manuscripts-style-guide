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
import React, { ChangeEvent } from 'react'
import { styled } from '../styled-components'
import { ButtonGroup, DangerButton, GreyButton, PrimaryButton } from './Button'
import { StyledModal } from './StyledModal'
import { TextField } from './TextField'

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

interface DialogState {
  primaryActionEnabled: boolean
}
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
  confirmFieldText?: string
  category: Category
  header: string
  message: string | React.ReactElement<{}>
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
}

const PrimaryAction = (props: ButtonProps) =>
  props.isDestructive ? (
    <DangerButton disabled={props.disabled} onClick={props.action}>
      {props.title}
    </DangerButton>
  ) : (
    <PrimaryButton disabled={props.disabled} onClick={props.action}>
      {props.title}
    </PrimaryButton>
  )

const SecondaryAction = (props: ButtonProps) => (
  <GreyButton disabled={props.disabled} onClick={props.action}>
    {props.title}
  </GreyButton>
)

export class Dialog extends React.Component<DialogProps, DialogState> {
  public state: DialogState = {
    primaryActionEnabled: true,
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
      confirmFieldText,
    } = this.props
    const { primaryActionEnabled } = this.state

    return (
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
          <MessageContainer>
            {message}
            {confirmFieldText && (
              <TextField
                required={true}
                placeholder={'Please type: ' + confirmFieldText}
                onChange={this.checkInputValue}
                style={{ marginTop: '16px' }}
              />
            )}
          </MessageContainer>
          {this.renderButtons(this.props, primaryActionEnabled)}
        </ModalBody>
      </StyledModal>
    )
  }

  private renderButtons = (props: DialogProps, disabled: boolean) => (
    <ButtonsContainer>
      {props.actions.secondary ? (
        !props.actions.secondary.isDestructive ? (
          <>
            <SecondaryAction
              disabled={disabled}
              action={props.actions.primary.action}
              title={props.actions.primary.title || 'Dismiss'}
            />
            <PrimaryAction
              action={props.actions.secondary.action}
              title={props.actions.secondary.title}
            />
          </>
        ) : (
          <>
            <SecondaryAction
              action={props.actions.secondary.action}
              title={props.actions.secondary.title}
            />
            <PrimaryAction
              disabled={disabled}
              action={props.actions.primary.action}
              title={props.actions.primary.title || 'Dismiss'}
              isDestructive={true}
            />
          </>
        )
      ) : (
        <PrimaryAction
          disabled={disabled}
          action={props.actions.primary.action}
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
    this.setState({ primaryActionEnabled: state })
  }
}
