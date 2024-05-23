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
import { SizeMe } from 'react-sizeme'
import styled, { AnyStyledComponent, css } from 'styled-components'

import { IconButton, IconTextButton } from './Button'
import AttentionBlueIcon from './icons/attention-blue'
import AttentionGreenIcon from './icons/attention-green'
import AttentionOrangeIcon from './icons/attention-orange'
import AttentionRedIcon from './icons/attention-red'

const buttonStyles = css`
  color: inherit;
  margin-left: ${(props) => props.theme.grid.unit * 4}px;

  g[fill] {
    fill: currentColor;
  }

  &:not([disabled]):focus,
  &:not([disabled]):hover {
    color: inherit;
    filter: brightness(80%);
  }
`
export const TextButton = styled(IconTextButton)`
  ${buttonStyles}
`

const CloseIconButton = styled(IconButton).attrs({
  defaultColor: true,
  size: 16,
})`
  ${buttonStyles}
`

const InformativeIcon = styled.div`
  height: 24px;
  margin-right: ${(props) => props.theme.grid.unit * 3}px;
  display: flex;
  align-items: center;
`

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

const BaseAlertContainer = styled.div`
  align-items: center;
  border-radius: ${(props) => props.theme.grid.radius.small};
  display: flex;
  flex-shrink: 0;
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.medium} / 1
    ${(props) => props.theme.font.family.sans};
  justify-content: space-between;
  padding: ${(props) => props.theme.grid.unit * 3}px;
  white-space: normal;
`

const SuccessAlertContainer = styled(BaseAlertContainer)`
  background-color: ${(props) => props.theme.colors.background.success};
  border: solid 1px ${(props) => props.theme.colors.border.success};
  color: ${(props) => props.theme.colors.text.success};
`

const ErrorAlertContainer = styled(BaseAlertContainer)`
  background-color: ${(props) => props.theme.colors.background.error};
  border: solid 1px ${(props) => props.theme.colors.border.error};
  color: ${(props) => props.theme.colors.text.error};
`

const InfoAlertContainer = styled(BaseAlertContainer)`
  background-color: ${(props) => props.theme.colors.background.info};
  border: solid 1px ${(props) => props.theme.colors.border.info};
  color: ${(props) => props.theme.colors.text.info};
`

const WarningAlertContainer = styled(BaseAlertContainer)`
  background-color: ${(props) => props.theme.colors.background.warning};
  border: solid 1px ${(props) => props.theme.colors.border.warning};
  color: ${(props) => props.theme.colors.text.warning};
`

const TextContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  word-break: break-word;
`

const SuccessIcon = styled(AttentionGreenIcon)`
  transform: scale(0.75, 0.75);
`

interface State {
  isOpen: boolean
}

interface Dismiss {
  text: string
  action?: () => void
}

export enum AlertMessageType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info',
}

interface Props {
  type: AlertMessageType
  dismissButton?: Dismiss
  hideCloseButton?: boolean
}

const alertIcons: { [key in AlertMessageType]: React.FC } = {
  success: SuccessIcon,
  error: AttentionRedIcon,
  info: AttentionBlueIcon,
  warning: AttentionOrangeIcon,
}

const alertContainers: { [key in AlertMessageType]: AnyStyledComponent } = {
  success: SuccessAlertContainer,
  error: ErrorAlertContainer,
  info: InfoAlertContainer,
  warning: WarningAlertContainer,
}

export class AlertMessage extends React.Component<Props, State> {
  public state: State = {
    isOpen: true,
  }

  public render() {
    const { hideCloseButton, dismissButton, children, type } = this.props
    const { isOpen } = this.state

    const AlertContainer = alertContainers[type]
    const AlertIcon = alertIcons[type]

    return (
      isOpen && (
        <SizeMe>
          {() => (
            <AlertContainer className={'alert-message'}>
              <InnerContainer>
                <InformativeIcon>{<AlertIcon />}</InformativeIcon>
                <TextContainer>{children}</TextContainer>
                {dismissButton && (
                  <TextButton
                    onClick={
                      dismissButton.action
                        ? dismissButton.action
                        : this.handleClose
                    }
                  >
                    {dismissButton.text}
                  </TextButton>
                )}
              </InnerContainer>
            </AlertContainer>
          )}
        </SizeMe>
      )
    )
  }

  private handleClose = () => {
    this.setState({ isOpen: false })
  }
}
