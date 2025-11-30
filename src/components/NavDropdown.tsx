/*!
 * © 2020 Atypon Systems LLC
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
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { Badge } from './Badge'
import { SecondaryButton } from './Button'
import { ArrowUpIcon } from './icons'

export const NavDropdownContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`

export const NavDropdown = styled.div<{
  direction?: 'left' | 'right'
  minWidth?: number
  top?: number
}>`
  border: 1px solid ${(props) => props.theme.colors.border.secondary};
  border-radius: ${(props) => props.theme.grid.radius.small};
  box-shadow: ${(props) => props.theme.shadow.dropShadow};
  background: ${(props) => props.theme.colors.background.primary};
  color: ${(props) => props.theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.theme.font.size.normal};
  font-weight: ${(props) => props.theme.font.weight.normal};
  max-height: 80vh;
  max-width: 300px;
  ${(props) => props.minWidth && 'min-width: ' + props.minWidth + 'px;'}
  ${(props) => (props.direction === 'right' ? ' right: 0' : 'left : 0')};
  top: ${(props) => (props.top ? props.top : props.theme.grid.unit * 10)}px;
  position: absolute;
  z-index: 10;
`

export const InvitedBy = styled.div`
  display: flex;
  align-items: center;
  font-size: ${(props) => props.theme.font.size.normal};
  letter-spacing: -0.3px;
  color: ${(props) => props.theme.colors.text.secondary};
  clear: both;
  margin-top: ${(props) => props.theme.grid.unit * 2}px;
`

const commonStyles = css<{ disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: ${(props) => props.theme.grid.unit * 3}px
    ${(props) => props.theme.grid.unit * 3}px;
  align-items: center;
  text-decoration: none;
  white-space: nowrap;
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.text.secondary
      : props.theme.colors.text.primary};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'unset')};

  &:hover {
    background: ${(props) => props.theme.colors.background.fifth};
  }
`

export const NavDropdownLink = styled(NavLink)`
  ${commonStyles};
`

export const NavDropdownElement = styled.div`
  ${commonStyles};

  cursor: pointer;

  &:hover .user-icon-path {
    fill: ${(props) => props.theme.colors.text.onDark};
  }
`

export const NavDropdownSeparator = styled.div`
  height: 1px;
  width: 100%;
  opacity: 0.23;
  background-color: ${(props) => props.theme.colors.border.primary};
`

export const NavDropdownButtonText = styled.div`
  align-items: center;
  display: flex;
  margin-right: ${(props) => props.theme.grid.unit}px;
`

interface DropdownProps {
  isOpen: boolean
}

export const NavDropdownToggle = styled(ArrowUpIcon)`
  margin-left: 6px;
  transform: rotate(180deg);

  &.open {
    transform: rotate(0deg);
  }
`

export const NotificationsBadge = styled(Badge)<DropdownProps>`
  background-color: ${(props) =>
    props.isOpen
      ? props.theme.colors.background.success
      : props.theme.colors.brand.default};
  color: ${(props) =>
    props.isOpen
      ? props.theme.colors.text.success
      : props.theme.colors.text.onDark};
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: 9px;
  margin-left: 4px;
  max-height: 10px;
  min-width: 10px;
  min-height: 10px;
`

export const NavDropdownButtonContainer = styled(SecondaryButton).attrs(
  (props: DropdownProps) => ({
    selected: props.isOpen,
  })
)<DropdownProps>`
  .inheritColors path {
    fill: currentColor;
    stroke: currentColor;
  }
`

interface DropdownButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as?: React.FunctionComponent<any>
  disabled?: boolean
  isOpen: boolean
  notificationsCount?: number
  onClick?: React.MouseEventHandler
  removeChevron?: boolean
  children: React.ReactNode
}

export const NavDropdownButton: React.FunctionComponent<
  DropdownButtonProps
> = ({
  as,
  children,
  disabled,
  isOpen,
  notificationsCount,
  onClick,
  removeChevron,
}) => (
  <NavDropdownButtonContainer
    as={as}
    disabled={disabled}
    onClick={onClick}
    isOpen={isOpen}
    className={'dropdown-toggle'}
    tabIndex={0}
  >
    <NavDropdownButtonText>{children}</NavDropdownButtonText>
    {!!notificationsCount && (
      <NotificationsBadge isOpen={isOpen}>
        {notificationsCount}
      </NotificationsBadge>
    )}
    {!removeChevron && <NavDropdownToggle className={isOpen ? 'open' : ''} />}
  </NavDropdownButtonContainer>
)
