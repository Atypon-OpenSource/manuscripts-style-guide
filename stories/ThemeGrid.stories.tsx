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

import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import styled, { DefaultTheme } from 'styled-components'
// Shared styled components
const StorySection = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const StorySectionInner = styled.div`
  flex: 1;
  margin: 10px;
  max-width: 200px;
`

const Div = styled.div<{
  // Note: bgColor, fontFamily etc. are not used here but kept for consistency if copied from Typography
  bgColor?: (props: { theme: DefaultTheme }) => string
  fontFamily?: (props: { theme: DefaultTheme }) => string
  fontSize?: (props: { theme: DefaultTheme }) => string
  fontWeight?: (props: { theme: DefaultTheme }) => number
  lineHeight?: (props: { theme: DefaultTheme }) => string
}>`
  background-color: ${(props) => props.bgColor};
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};
  padding: 16px;
`

// Grid Component (Moved from Theme.stories.tsx)
const Grid = () => (
  <StorySection>
    <StorySectionInner>
      <h1>Unit</h1>
      <Div>4</Div>
    </StorySectionInner>
    <StorySectionInner>
      <h1>Radius</h1>
      <Div>default - 8px</Div>
      <Div>small - 4px</Div>
    </StorySectionInner>
    <StorySectionInner>
      <h1>Breakpoints</h1>
      <Div>mobile - 360</Div>
      <Div>tablet - 768</Div>
      <Div>smallDesktop - 1024</Div>
      <Div>desktop - 1280</Div>
      <Div>largeDesktop - 1920</Div>
      <Div>editorMaxWidth - 960</Div>
    </StorySectionInner>
  </StorySection>
)

// Meta for Grid
const meta: Meta<typeof Grid> = {
  title: 'Theme/Grid',
  component: Grid,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Grid>

// Story for Grid
export const Default: Story = {} // Changed name from GridStory to Default for convention
