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

import { AddedIcon, AddIcon } from './icons'

interface DrawerProps {
  items: Array<{
    id: string
    label: string
    country?: string
    city?: string
    state?: string
  }>
  selectedIds?: string[]
  title: string
  onSelect: (id: string) => void
  onBack: () => void
  width?: string
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

const BackButton = styled.button`
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

const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
`

const ListItem = styled.li<{ selected?: boolean }>`
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

const Icon = styled.span`
  width: 20px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const DrawerTitle = styled.h2`
  padding: 8px 16px 6px 16px;
  margin: 0;
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.large};
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.secondary};
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ItemLabel = styled.span`
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.medium};
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.primary};
`

const ItemMeta = styled.span`
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.small};
  font-family: ${(props) => props.theme.font.family.sans};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const Drawer: React.FC<DrawerProps> = ({
  items,
  selectedIds = [],
  title,
  onSelect,
  onBack,
  width,
}) => {
  return (
    <DrawerContainer data-cy="drawer" width={width}>
      <BackButton onClick={onBack}>
        <span>←</span>
        Back
      </BackButton>
      <DrawerTitle>{title}</DrawerTitle>
      <ItemsList>
        {items.map((item) => (
          <ListItem
            data-cy="item"
            key={item.id}
            selected={selectedIds?.includes(item.id)}
            onClick={() => onSelect(item.id)}
          >
            <Icon>
              {selectedIds?.includes(item.id) ? (
                <AddedIcon width={22} height={22} />
              ) : (
                <AddIcon width={22} height={22} />
              )}
            </Icon>
            <LabelContainer>
              <ItemLabel>{item.label}</ItemLabel>
              <ItemMeta>
                {item.city && (
                  <>
                    {item.city}
                    {item.state || item.country ? ', ' : ''}
                  </>
                )}
                {item.state && (
                  <>
                    {item.state}
                    {item.country ? ', ' : ''}
                  </>
                )}
                {item.country && <>{item.country}</>}
              </ItemMeta>
            </LabelContainer>
          </ListItem>
        ))}
      </ItemsList>
    </DrawerContainer>
  )
}
