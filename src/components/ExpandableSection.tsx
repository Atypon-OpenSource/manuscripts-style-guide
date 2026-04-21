/*!
 * © 2026 Atypon Systems LLC
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
import React, { FC, ReactNode, useState } from 'react'
import styled from 'styled-components'

import { ArrowDownCircleIcon } from './icons'

interface ExpandableSectionProps {
  title: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  bordered?: boolean
}

export const ExpandableSection: FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultOpen = true,
  bordered = false,
}) => {
  const [open, setOpen] = useState<boolean>(defaultOpen)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  }

  return (
    <Container bordered={bordered}>
      <Header
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={open}
      >
        <Title>{title}</Title>
        <ArrowIcon open={open} />
      </Header>
      <ContentOuter open={open} inert={!open || undefined}>
        <ContentInner>
          <div>{children}</div>
        </ContentInner>
      </ContentOuter>
    </Container>
  )
}

const Container = styled.div<{ bordered: boolean }>`
  border: ${(props) =>
    props.bordered
      ? `1px solid ${props.theme.colors.border.tertiary}`
      : 'none'};
  border-radius: ${(props) => props.theme.grid.radius.default};
  background: ${(props) => props.theme.colors.background.primary};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.grid.unit * 4}px;
  cursor: pointer;
  font-weight: ${(props) => props.theme.font.weight.semibold};
`

const Title = styled.span`
  font-size: ${(props) => props.theme.font.size.medium};
  color: ${(props) => props.theme.colors.text.primary};
`

const ArrowIcon = styled(ArrowDownCircleIcon)<{ open: boolean }>`
  transition: transform 0.25s ease;
  transform: rotate(${(props) => (props.open ? '180deg' : '0deg')});
`

const ContentOuter = styled.div<{ open: boolean }>`
  display: grid;
  grid-template-rows: ${(props) => (props.open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.25s ease;
`

const ContentInner = styled.div`
  overflow: hidden;
  min-height: 0;
`
