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

import ArrowDownBlue from '@manuscripts/assets/react/ArrowDownBlue'
import React, { useState } from 'react'
import styled, { CSSProperties } from 'styled-components'

import { IconButton } from './Button'

const Section = styled.div`
  font-size: ${(props) => props.theme.font.size.normal};
  padding: 0 ${(props) => props.theme.grid.unit * 6}px
    ${(props) => props.theme.grid.unit * 6}px
    ${(props) => props.theme.grid.unit * 6}px;
`

const Heading = styled.div`
  display: flex;
  padding: ${(props) => props.theme.grid.unit * 2}px;
  cursor: pointer;
`

const HeadingText = styled.div`
  font-size: ${(props) => props.theme.font.size.medium};
  font-weight: ${(props) => props.theme.font.weight.semibold};
  color: ${(props) => props.theme.colors.text.primary};
  flex: 1;
`

export const ExpanderButton = styled(IconButton).attrs((props) => ({
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

export const InspectorSubsection = styled.div`
  margin-left: ${(props) => props.theme.grid.unit * 2}px;

  :not(:first-child) {
    margin-top: ${(props) => props.theme.grid.unit * 4}px;
  }
`

const Content = styled.div`
  margin: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 8}px;
`

interface Props {
  title: React.ReactNode
  sectionStyles?: CSSProperties
  headingStyles?: CSSProperties
  contentStyles?: CSSProperties
  lineStyles?: CSSProperties
}

export const InspectorSection: React.FC<Props> = ({
  title,
  sectionStyles,
  headingStyles,
  contentStyles,
  lineStyles,
  children,
}) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <Section style={sectionStyles}>
      <Heading style={headingStyles} onClick={() => setExpanded(!expanded)}>
        <HeadingText>{title}</HeadingText>
        <ExpanderButton
          aria-label={'Toggle expand section'}
          onClick={() => setExpanded(!expanded)}
          style={{
            transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        >
          <ArrowDownBlue />
        </ExpanderButton>
      </Heading>
      {expanded && <Content style={contentStyles}>{children}</Content>}
      <Line style={lineStyles} />
    </Section>
  )
}

const Line = styled.hr`
  flex: 1;
  border: 1px solid ${(props) => props.theme.colors.border.tertiary};
  background: ${(props) => props.theme.colors.border.tertiary};
`
