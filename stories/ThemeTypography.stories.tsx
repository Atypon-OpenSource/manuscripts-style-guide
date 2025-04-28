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

// Typography Component (Moved from Theme.stories.tsx)
const Typography = () => (
  <>
    <StorySection>
      <StorySectionInner>
        <h1>Font Families</h1>
        <Div fontFamily={(props) => props.theme.font.family.sans}>
          sans - "Lato", sans-serif
        </Div>
        <Div fontFamily={(props) => props.theme.font.family.serif}>
          serif - "serif"
        </Div>
      </StorySectionInner>
    </StorySection>
    <StorySection>
      <StorySectionInner>
        <h1>Font Sizes</h1>
        <Div fontSize={(props) => props.theme.font.size.xlarge}>
          xlarge - 20px
        </Div>
        <Div fontSize={(props) => props.theme.font.size.large}>
          large - 18px
        </Div>
        <Div fontSize={(props) => props.theme.font.size.medium}>
          medium - 16px
        </Div>
        <Div fontSize={(props) => props.theme.font.size.normal}>
          normal - 14px
        </Div>
        <Div fontSize={(props) => props.theme.font.size.small}>
          small - 12px
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h1>Font Weights</h1>
        <Div fontWeight={(props) => props.theme.font.weight.xbold}>
          extrabold - 900
        </Div>
        <Div fontWeight={(props) => props.theme.font.weight.bold}>
          bold - 700
        </Div>
        <Div fontWeight={(props) => props.theme.font.weight.normal}>
          normal - 400
        </Div>
        <Div fontWeight={(props) => props.theme.font.weight.light}>
          light - 400
        </Div>
        <Div fontWeight={(props) => props.theme.font.weight.xlight}>
          extralight - 400
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h1>Line Heights</h1>
        <Div lineHeight={(props) => props.theme.font.lineHeight.large}>
          large - 24px
        </Div>
        <Div lineHeight={(props) => props.theme.font.lineHeight.normal}>
          normal - 16px
        </Div>
        <Div lineHeight={(props) => props.theme.font.lineHeight.small}>
          small - 14px
        </Div>
      </StorySectionInner>
    </StorySection>
  </>
)

// Meta for Typography
const meta: Meta<typeof Typography> = {
  title: 'Theme/Typography',
  component: Typography,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Typography>

// Story for Typography
export const Default: Story = {} // Changed name from TypographyStory to Default for convention
