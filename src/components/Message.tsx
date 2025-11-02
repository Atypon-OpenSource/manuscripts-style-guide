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

import { IconProps } from './icons/types'

const Text = styled.p`
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.normal} /
    ${(props) => props.theme.font.lineHeight.normal}
    ${(props) => props.theme.font.family.sans};

  box-sizing: border-box;
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
`

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.grid.unit * 2 + 'px'};
  padding: ${(props) => props.theme.grid.unit * 4 + 'px'};
  &.centered {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }
`

type MessageProps = {
  isCentered?: boolean
  icon?: React.ComponentType<IconProps>
  children: string
}

export const Message: React.FC<MessageProps> = ({
  isCentered,
  icon: Icon,
  children,
}) => (
  <MessageWrapper className={isCentered ? 'centered' : ''}>
    {Icon && <Icon />}
    <Text>{children}</Text>
  </MessageWrapper>
)
