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

import { ThemeProvider } from '@mui/material/styles'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { styled } from 'styled-components'

import { Avatar, muiTheme } from '../src/mui'

const StorySection = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const StorySectionInner = styled.div`
  flex: 1;
  margin: 10px;
  max-width: 200px;
`
const Div = styled.div`
  padding: 16px;
`

const meta: Meta = {
  title: 'MUI/Avatar',
  decorators: [
    (Story) => (
      <ThemeProvider theme={muiTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj

export const Variations: Story = {
  render: () => (
    <StorySection>
      <StorySectionInner>
        <h2>Image</h2>
        <Div>
          <Avatar
            size={40}
            name="Ada Lovelace"
            src="https://mui.com/static/images/avatar/1.jpg"
          />
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Initials</h2>
        <Div>
          <Avatar size={24} name="Ada Lovelace" />
        </Div>
        <Div>
          <Avatar size={32} name="Grace Hopper" />
        </Div>
        <Div>
          <Avatar size={40} name="Lin" />
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Icon fallback</h2>
        <Div>
          <Avatar size={32} />
        </Div>
        <Div>
          <Avatar size={36} color="#6e6e6e" />
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Opacity</h2>
        <Div>
          <Avatar size={36} opacity={1} />
        </Div>
        <Div>
          <Avatar size={36} opacity={0.05} />
        </Div>
      </StorySectionInner>
    </StorySection>
  ),
}
