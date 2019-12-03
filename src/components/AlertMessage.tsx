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

import AttentionBlue from '@manuscripts/assets/react/AttentionBlue'
import AttentionOrange from '@manuscripts/assets/react/AttentionOrange'
import AttentionRed from '@manuscripts/assets/react/AttentionRed'
import CloseIconDark from '@manuscripts/assets/react/CloseIconDark'
import SuccessGreen from '@manuscripts/assets/react/SuccessGreen'
import React from 'react'
import { SizeMe } from 'react-sizeme'
import styled, { css } from 'styled-components'
import { IconButton, IconTextButton } from './Button'

const buttonStyles = css`
  color: inherit;
  margin-left: ${props => props.theme.grid.unit * 4}px;

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

const CloseIcon = styled(IconButton).attrs(props => ({
  defaultColor: true,
  size: 16,
}))`
  ${buttonStyles}
`

const InformativeIcon = styled.div`
  height: 24px;
  margin-right: ${props => props.theme.grid.unit * 3}px;
`

const InnerContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

const AlertContainer = styled.div<{
  type: string
}>`
  align-items: center;
  background-color: ${props => props.theme.colors.background[props.type]};
  border: solid 1px ${props => props.theme.colors.border[props.type]};
  border-radius: ${props => props.theme.grid.radius.small};
  color: ${props => props.theme.colors.text[props.type]};
  display: flex;
  flex-shrink: 0;
  font: ${props => props.theme.font.weight.normal}
    ${props => props.theme.font.size.medium} / 1
    ${props => props.theme.font.family.sans};
  justify-content: space-between;
  padding: ${props => props.theme.grid.unit * 3}px;
  white-space: normal;
`

const TextContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
  align-items: center;
`

const SuccessIcon = styled(SuccessGreen)`
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

const AlertIcon: React.FunctionComponent<{ type: AlertMessageType }> = ({
  type,
}) => {
  switch (type) {
    case AlertMessageType.success:
      return <SuccessIcon />
    case AlertMessageType.error:
      return <AttentionRed />
    case AlertMessageType.info:
      return <AttentionBlue />
    default:
      return <AttentionOrange />
  }
}

export class AlertMessage extends React.Component<Props, State> {
  public state: State = {
    isOpen: true,
  }

  public render() {
    const { hideCloseButton, dismissButton, children, type } = this.props
    const { isOpen } = this.state

    return (
      isOpen && (
        <SizeMe>
          {({ size }) => (
            <AlertContainer type={type} className={'alert-message'}>
              <InnerContainer>
                <InformativeIcon>{<AlertIcon type={type} />}</InformativeIcon>
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
              {!hideCloseButton && (size.width! >= 900 || !dismissButton) && (
                <CloseIcon onClick={this.handleClose}>
                  <CloseIconDark />
                </CloseIcon>
              )}
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
