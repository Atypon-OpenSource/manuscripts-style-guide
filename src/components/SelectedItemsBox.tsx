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
import styled from 'styled-components'

import { XIcon } from './icons/x'

interface SelectedItem {
  id: string
  label: string
}

interface SelectedItemsBoxProps {
  items: SelectedItem[]
  onRemove: (id: string) => void
  placeholder?: string
}

const BoxContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border.tertiary};
  border-radius: 4px;
  padding: 8px;
  min-height: 120px;
  background: ${(props) => props.theme.colors.background.primary};
`

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`

const EmptyContainer = styled.div`
  height: 100%;
  min-height: 104px; // 120px - 2 * 8px padding
  display: flex;
  justify-content: center;
  align-items: center;
`

const Placeholder = styled.div`
  color: #c9c9c9;
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.normal}
    ${(props) => props.theme.font.family.sans};
`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f2f2f2;
  border-radius: 6px;
  padding: 4px;
  color: ${(props) => props.theme.colors.text.primary};
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.small}
    ${(props) => props.theme.font.family.sans};
`

const RemoveButton = styled.button`
  background: ${(props) => props.theme.colors.background.dark};
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.onDark};
  display: inline-flex;
  justify-content: center;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  font-size: 10px;
  padding: 0;
  font-family: ${(props) => props.theme.font.family.sans};
  font-weight: ${(props) => props.theme.font.weight.light};
`

export const SelectedItemsBox: React.FC<SelectedItemsBoxProps> = ({
  items,
  onRemove,
  placeholder = 'No items selected',
}) => {
  return (
    <BoxContainer>
      {items.length > 0 ? (
        <ItemsList>
          {items.map((item) => (
            <Item key={item.id}>
              {item.label}
              <RemoveButton
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.label}`}
              >
                x
              </RemoveButton>
            </Item>
          ))}
        </ItemsList>
      ) : (
        <EmptyContainer>
          <Placeholder>{placeholder}</Placeholder>
        </EmptyContainer>
      )}
    </BoxContainer>
  )
}

export default SelectedItemsBox
