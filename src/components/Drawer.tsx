/*!
 * © 2025 Atypon Systems LLC
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
import styled, { keyframes } from 'styled-components'

export interface DrawerProps {
  title: string

  onBack: () => void
  width?: string
  children: React.ReactNode
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`

const DrawerContainer = styled.div<{ width?: string }>`
  width: ${(props) => props.width || '300px'};
  padding: 40px 0 0 0;
  background: ${(props) => props.theme.colors.background.primary};
  border-right: 1px solid ${(props) => props.theme.colors.border.secondary};
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease-out;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`

const DrawerBackButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: none;
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.medium};
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.brand.default};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: none;
    opacity: 0.8;
  }
`

export const DrawerItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`

export const DrawerListItem = styled.li<{ selected?: boolean }>`
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  min-height: 30px;
  gap: 8px;
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.medium};
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.primary};
  border-bottom: 1px solid ${(props) => props.theme.colors.border.tertiary};
  &:last-child {
    border-bottom: none;
  }
`

export const DrawerIcon = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const DrawerTitle = styled.h2`
  padding: 16px 16px 48px 16px;
  margin: 0;
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.large};
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const DrawerLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const DrawerItemLabel = styled.span`
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.medium};
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.primary};
`

export const DrawerItemMeta = styled.span`
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.small};
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const Drawer: React.FC<DrawerProps> = ({
  title,
  onBack,
  width,
  children,
}) => {
  return (
    <DrawerContainer data-cy="drawer" width={width}>
      <DrawerBackButton onClick={onBack}>
        <span>←</span>
        Back
      </DrawerBackButton>
      <DrawerTitle>{title}</DrawerTitle>
      {children}
    </DrawerContainer>
  )
}
