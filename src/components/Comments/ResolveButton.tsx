/*!
 * © 2021 Atypon Systems LLC
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
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import { IconTextButton } from '../Button'
import TickMark from '../icons/tick-mark'

export const ResolveButton: React.FC<{
  id: string
  resolved: boolean | undefined
  resolvedCallback: () => void
}> = ({ id, resolved, resolvedCallback }) => {
  return (
    <Container className="note-actions">
      <Button
        resolved={resolved}
        data-tip={true}
        data-for={id}
        onClick={resolvedCallback}
      >
        <TickMark color={'#353535'} />
      </Button>
      <ReactTooltip
        id={id}
        place="bottom"
        effect="solid"
        offset={{ top: 10 }}
        className="tooltip"
      >
        {(resolved && 'Unresolve') || 'Resolve'}
      </ReactTooltip>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: ${(props) => props.theme.grid.unit};
`

const Button = styled(IconTextButton)<{ resolved: boolean | undefined }>`
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  border-radius: 16px;
  background: ${(props) => (props.resolved && '#f2fbfc') || '#FFFFFF'};
  border: ${(props) => (props.resolved && '1px solid #bce7f6') || 'none'};

  svg {
    max-height: 8.5px;
    max-width: 12px;
    margin-right: 0;
  }

  path {
    fill: ${(props) => (props.resolved && '#1a9bc7') || '#353535'};
  }

  &:not([disabled]):hover {
    path {
      fill: #1a9bc7;
    }
    background: #f2fbfc;
    border: 1px solid #c9c9c9;
  }
`
