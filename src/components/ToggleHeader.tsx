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

import { TriangleCollapsedIcon, TriangleExpandedIcon } from './icons'

interface SectionHeaderProps {
  title: string
  isOpen: boolean
  onToggle: () => void
}

export const ToggleHeader: React.FC<SectionHeaderProps> = ({
  title,
  isOpen,
  onToggle,
}) => {
  return (
    <ToggleHeaderContainer
      onClick={(e) => {
        e.stopPropagation()
        onToggle()
      }}
    >
      <span>{title}</span>
      <ToggleIcon isOpen={isOpen}>
        {isOpen ? <TriangleExpandedIcon /> : <TriangleCollapsedIcon />}
      </ToggleIcon>
    </ToggleHeaderContainer>
  )
}

const ToggleHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 8px;
  margin: 8px;
  color: #353535;

  cursor: pointer;

  border-top: 1px solid #f2f2f2;

  font-size: 16px;
  font-weight: 700;
  font-family: Lato, sans-serif;
`

export const ToggleIcon = styled.div<{ isOpen: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #e2e2e2;
  text-align: center;
  cursor: pointer;

  svg {
    width: 19px;
    height: 19px;
    transform: rotate(${(props) => (props.isOpen ? '0deg' : '270deg')});
    transition: transform 0.2s ease; // Smooth transition for rotation
  }
`
