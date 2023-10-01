/*!
 * © 2023 Atypon Systems LLC
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

import {
  CHANGE_OPERATION,
  CHANGE_STATUS,
  trackCommands,
  TrackedAttrs,
} from '@manuscripts/track-changes-plugin'
import { Command } from 'prosemirror-state'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { TextButton } from './AlertMessage'
import { ButtonGroup } from './Button'
import { EditButtonIcon } from './icons'

const getLatest = (a: TrackedAttrs, b: TrackedAttrs) =>
  a.updatedAt > b.updatedAt ? a : b

export const TrackNodeAttrs: React.FC<{
  dataTracked?: TrackedAttrs[]
}> = ({ dataTracked, children }) => {
  const currentChange = useMemo<TrackedAttrs | undefined>(
    () => dataTracked?.reduce(getLatest),
    [dataTracked]
  )

  if (!currentChange) {
    return <>{children}</>
  }

  const markStyle = getMarkStyle(currentChange)

  const showAttrsButton =
    currentChange.operation === CHANGE_OPERATION.set_node_attributes &&
    currentChange.status === CHANGE_STATUS.pending

  return (
    <Mark
      className={(showAttrsButton && 'attrs-track-mark') || undefined}
      {...markStyle}
    >
      {children}
      {showAttrsButton && <TrackAttrsButton changeId={currentChange.id} />}
    </Mark>
  )
}

const Mark = styled.div<{
  background?: string
  textDecoration?: string
  display?: string
}>`
  position: relative;
  ${(props) => props.background && `background: ${props.background}`};
  ${(props) =>
    props.textDecoration && `text-decoration: ${props.textDecoration}`};
  ${(props) => props.display && `display: ${props.display}`};

  :has(.attrs-popper-button, .attrs-popper-button-active):hover {
    background: #a3eaff;
  }

  :hover .attrs-popper-button,
  .attrs-popper-button-active {
    display: inline-flex;
  }

  .attrs-popper-button,
  .attrs-popper-button-active {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`

export const getMarkStyle = (dataTracked?: TrackedAttrs) => {
  const style: {
    background?: string
    textDecoration?: string
    display?: string
  } = {}

  if (!dataTracked) {
    return style
  }

  const { status, operation } = dataTracked

  if (
    (operation === CHANGE_OPERATION.delete ||
      operation === CHANGE_OPERATION.insert ||
      operation === CHANGE_OPERATION.set_node_attributes) &&
    status === CHANGE_STATUS.pending
  ) {
    style.background = '#ddf3fa'
  }

  if (
    (operation === CHANGE_OPERATION.insert ||
      operation === CHANGE_OPERATION.set_node_attributes) &&
    status === CHANGE_STATUS.accepted
  ) {
    style.background = '#bffca7'
  }

  if (
    operation === CHANGE_OPERATION.delete &&
    status === CHANGE_STATUS.pending
  ) {
    style.textDecoration = 'line-through'
  }

  if (
    (operation === CHANGE_OPERATION.insert &&
      status === CHANGE_STATUS.rejected) ||
    (operation === CHANGE_OPERATION.delete && status === CHANGE_STATUS.accepted)
  ) {
    style.display = 'none'
  }

  return style
}

export const TrackAttrsButton: React.FC<{
  changeId: string
}> = ({ changeId }) => (
  <TrackMetaButton
    as={'button'}
    className={'attrs-popper-button'}
    value={changeId}
  >
    <EditButtonIcon />
  </TrackMetaButton>
)

export const TrackAttrsPopperContent: React.FC<{
  newAttrs: Record<string, { label: string; value: string }>
  oldAttrs: Record<string, { label: string; value: string }>
  changeId: string
  updateState: (cmd: Command) => void
}> = ({ newAttrs, oldAttrs, changeId, updateState }) => {
  const approveChange = () => {
    updateState(
      trackCommands.setChangeStatuses(CHANGE_STATUS.accepted, [changeId])
    )
  }

  const rejectChange = () => {
    updateState(
      trackCommands.setChangeStatuses(CHANGE_STATUS.rejected, [changeId])
    )
  }

  return (
    <PopperContainer>
      <Header>
        <LabelContainer>
          <EditButtonIcon />
          <Label>Changed</Label>
        </LabelContainer>
        <ButtonGroup>
          <RejectButton onClick={rejectChange}>Reject</RejectButton>
          <TrackChangesButton onClick={approveChange}>
            Approve
          </TrackChangesButton>
        </ButtonGroup>
      </Header>

      <ChangesList>
        {Object.entries(oldAttrs).map(([key], index) => (
          <Attribute key={index}>
            <AttributeLabel>{oldAttrs[key].label}:</AttributeLabel>
            {newAttrs[key].value &&
              oldAttrs[key].value !== newAttrs[key].value && (
                <OldAttribute>{oldAttrs[key].value}</OldAttribute>
              )}
            <AttributeValue>
              {newAttrs[key].value || oldAttrs[key].value}
            </AttributeValue>
          </Attribute>
        ))}
      </ChangesList>
    </PopperContainer>
  )
}

export const TrackMetaButton = styled.div`
  display: none;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  border: solid 1px #e2e2e2;
  align-items: center;
  justify-content: space-around;
  margin: 2px;
  cursor: pointer;

  background: ${(props) => props.theme.colors.background.primary};

  :hover {
    background: ${(props) => props.theme.colors.background.selected};

    path {
      stroke: ${(props) => props.theme.colors.brand.medium};
    }
  }
`

export const TrackChangesButton = styled(TextButton)`
  font-size: ${(props) => props.theme.font.size.normal};
  color: ${(props) => props.theme.colors.text.tertiary};
  text-decoration: underline;
  margin-right: ${(props) => props.theme.grid.unit * 2}px;

  &:hover,
  &:focus {
    color: ${(props) => props.theme.colors.text.tertiary} !important;
  }
`

const RejectButton = styled(TrackChangesButton)`
  color: ${(props) => props.theme.colors.text.secondary};
`

const PopperContainer = styled.div`
  border-radius: ${(props) => props.theme.grid.radius.default};
  background: ${(props) => props.theme.colors.background.primary};
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.3);
  z-index: 10;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`

const Label = styled.div`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.font.size.medium};
  font-weight: ${(props) => props.theme.font.weight.normal};
  line-height: ${(props) => props.theme.font.lineHeight.large};
  font-style: normal;
  padding: 2px;
`

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
`

const Attribute = styled.div`
  padding: ${(props) => props.theme.grid.unit * 3}px;
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.colors.background.fifth};
  }
`

const AttributeLabel = styled.div`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.font.size.small};
  font-weight: ${(props) => props.theme.font.weight.bold};
  font-style: normal;
  line-height: 16px;
`

const AttributeValue = styled(AttributeLabel)`
  font-weight: ${(props) => props.theme.font.weight.normal};
`

const OldAttribute = styled(AttributeValue)`
  text-decoration: line-through;
`

const ChangesList = styled.div`
  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 4}px;
  max-height: ${(props) => props.theme.grid.unit * 124}px;
  background: ${(props) => props.theme.colors.background.secondary};
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: #fafafa;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #3d3b3b3d;
    border-radius: 16px;
    border: 4px solid #fafafa;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }
`
