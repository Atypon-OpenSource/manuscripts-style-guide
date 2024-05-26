/*!
 * © 2019 Atypon Systems LLC
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

import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import { AttentionOrangeIcon } from '../src/components/icons'
import { Tooltip } from '../src/components/Tooltip'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
  width: 300px;
`

const Child = styled.div`
  padding: 8px;
  text-align: center;
`

storiesOf('Tip', module).add('Tip', () => (
  <Container>
    <Child data-tooltip-id="top-tooltip">Top</Child>
    <Tooltip id="top-tooltip" place="top">
      Top
    </Tooltip>

    <Child data-tooltip-id="bottom-tooltip">Bottom</Child>
    <Tooltip id="bottom-tooltip" place="bottom">
      Bottom
    </Tooltip>

    <Child data-tooltip-id="left-tooltip">Left</Child>
    <Tooltip id="left-tooltip" place="left">
      Left
    </Tooltip>

    <Child data-tooltip-id="right-tooltip">Right</Child>
    <Tooltip id="right-tooltip" place="right">
      Right
    </Tooltip>

    <Child>
      <AttentionOrangeIcon data-tooltip-id="word-count-warning" />
    </Child>
    <Tooltip id="word-count-warning" place="right">
      word count warning
    </Tooltip>
  </Container>
))
