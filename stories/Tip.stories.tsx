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

import AttentionOrange from '@manuscripts/assets/react/AttentionOrange'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'
import { Tip } from '../src'
import '../styles/tip.css'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 100px;
  width: 300px;
`

const Child = styled.div`
  padding: 8px;
  text-align: center;
`

storiesOf('Tip', module).add('Tip', () => (
  <Container>
    <Tip placement={'top'} title={'Top'}>
      <Child>Top</Child>
    </Tip>
    <Tip placement={'bottom'} title={'Bottom'}>
      <Child>Bottom</Child>
    </Tip>
    <Tip placement={'left'} title={'Left'}>
      <Child>Left</Child>
    </Tip>
    <Tip placement={'right'} title={'Right'}>
      <Child>Right</Child>
    </Tip>
    <Tip placement={'right'} title={'word count warning '}>
      <AttentionOrange height={'1em'} />
    </Tip>
  </Container>
))
