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

import React, { CSSProperties, useState } from 'react'
import styled from 'styled-components'

import { IconButton } from './Button'
import ArrowDownCircleIcon from './icons/arrow-down-circle'

const Section = styled.div`
  font-size: ${(props) => props.theme.font.size.normal};
`

const Heading = styled.div<{ marginBottom?: string }>`
  display: flex;
  padding: 0 ${(props) => props.theme.grid.unit * 2}px;
  cursor: pointer;
  margin: ${(props) => props.theme.grid.unit * 4}px
    ${(props) => props.theme.grid.unit * 6}px
    ${(props) => props.marginBottom || '32px'}
    ${(props) => props.theme.grid.unit * 6}px;
`

const HeadingText = styled.div`
  font-size: ${(props) => props.theme.font.size.medium};
  font-weight: ${(props) => props.theme.font.weight.semibold};
  color: ${(props) => props.theme.colors.text.primary};
  flex: 1;
`

export const ExpanderButton = styled(IconButton).attrs(() => ({
  size: 20,
  defaultColor: true,
}))`
  border: none;
  border-radius: 50%;

  &:focus,
  &:hover {
    &:not([disabled]) {
      background: ${(props) => props.theme.colors.background.fifth};
    }
  }

  svg circle {
    stroke: ${(props) => props.theme.colors.border.secondary};
  }
`

export const Subheading = styled(HeadingText)`
  font-size: ${(props) => props.theme.font.size.normal};
  font-weight: ${(props) => props.theme.font.weight.normal};
  margin-bottom: ${(props) => props.theme.grid.unit * 3}px;

  &:not(:first-child) {
    margin-top: ${(props) => props.theme.grid.unit * 6}px;
  }
`

export const Field = styled.div`
  margin-bottom: ${(props) => props.theme.grid.unit * 4}px;
`

interface Props {
  title: React.ReactNode
  contentStyles?: CSSProperties
}

export const InspectorSection: React.FC<Props> = ({
  title,
  contentStyles,
  children,
}) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <Section>
      <Line />

      <Heading
        onClick={() => setExpanded(!expanded)}
        marginBottom={(!(expanded && children) && '40px') || undefined}
      >
        <HeadingText>{title}</HeadingText>
        <ExpanderButton
          aria-label={'Toggle expand section'}
          onClick={() => setExpanded(!expanded)}
          style={{
            transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        >
          <ArrowDownCircleIcon />
        </ExpanderButton>
      </Heading>

      {expanded && children && <div style={contentStyles}>{children}</div>}
    </Section>
  )
}

const Line = styled.hr`
  flex: 1;
  border: 1px solid ${(props) => props.theme.colors.border.tertiary};
  background: ${(props) => props.theme.colors.border.tertiary};
  margin: 0 ${(props) => props.theme.grid.unit * 6}px;
`
