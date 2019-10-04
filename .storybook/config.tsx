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

import { addDecorator, configure } from '@storybook/react'
import React from 'react'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { styled, ThemeProvider } from '../src/styled-components'
import { GlobalStyle, theme } from './theme'

const Story = styled.div`
  padding: 3rem;

  & h1,
  & h2,
  & h3 {
    font-weight: 300;
  }
`

addDecorator(story => (
  <DragDropContextProvider backend={HTML5Backend}>
    <ThemeProvider theme={theme}>
      <Story>
        <GlobalStyle suppressMultiMountWarning={true} />
        <div>{story()}</div>
      </Story>
    </ThemeProvider>
  </DragDropContextProvider>
))

const req = require.context('../stories', true, /.stories.tsx$/)

const loadStories = () => {
  req.keys().forEach(req)
}

configure(loadStories, module)
