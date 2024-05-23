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
import styled from 'styled-components'

import AttentionRed from './icons/attention-red'
import SaveStatusOfflineIcon from './icons/save-status-offline'
import SaveIconSaved from './icons/save-status-saved'
import SaveStatusSaving from './icons/save-status-saving'

interface Props {
  status: 'saving' | 'saved' | 'offline' | 'failed'
}

export const SaveStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case 'offline':
      return (
        <Container>
          <SaveStatusOfflineIcon />
          <Text>Offline</Text>
        </Container>
      )

    case 'saving':
      return (
        <Container>
          <RotateContinuous>
            <SaveStatusSaving />
          </RotateContinuous>
          <Text>Saving&hellip;</Text>
        </Container>
      )

    case 'saved':
      return (
        <Container>
          <PopPop>
            <SaveIconSaved />
          </PopPop>
          <Text>Saved</Text>
        </Container>
      )
    case 'failed':
      return (
        <FailedContainer>
          <PopPop>
            <AttentionRed />
          </PopPop>
          <FailedText>Failed To Save</FailedText>
        </FailedContainer>
      )
    default:
      return null
  }
}

const Container = styled.div`
  color: ${(props) => props.theme.colors.text.secondary};
  display: inline-flex;
  flex-direction: row;
  align-items: center;

  path {
    stroke: ${(props) => props.theme.colors.text.secondary};
  }
`

const Text = styled.span`
  margin-left: 0.5em;
  font-family: ${(props) => props.theme.font.family.Lato};
  font-size: 14px;
  font-weight: 700;
`
const FailedContainer = styled(Container)`
  path {
    stroke: ${(props) => props.theme.colors.text.error};
    stroke-width: 0;
  }
`
const FailedText = styled(Text)`
  color: ${(props) => props.theme.colors.text.error};
`

const RotateContinuous = styled.div`
  svg {
    animation: saveRotation 2.7s ease-in-out infinite;
    @media (prefers-reduced-motion) {
      animation: unset;
    }
  }

  @keyframes saveRotation {
    0% {
      transform: rotate(0);
    }

    20% {
      transform: rotate(180deg);
    }

    50% {
      transform: rotate(180deg);
    }

    70% {
      transform: rotate(360deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`

const PopPop = styled.div`
  svg {
    animation: PopPop 0.3s ease-in-out 2;
    @media (prefers-reduced-motion) {
      animation: unset;
    }
  }

  @keyframes PopPop {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`
