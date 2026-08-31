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
import { fn } from '@storybook/test'
import React from 'react'
import styled from 'styled-components'

import { Button, IconButton, InspectorToggleButton, muiTheme, ToggleButton } from '../src/mui'

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
  title: 'MUI/Buttons',
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
        <h2>Default</h2>
        <Div>
          <Button variant="primary" onClick={fn()}>
            Primary
          </Button>
        </Div>
        <Div>
          <Button variant="secondary" onClick={fn()}>
            Secondary
          </Button>
        </Div>
        <Div>
          <Button variant="tertiary" onClick={fn()}>
            Tertiary
          </Button>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Mini</h2>
        <Div>
          <Button variant="primary" mini onClick={fn()}>
            Primary
          </Button>
        </Div>
        <Div>
          <Button variant="secondary" mini onClick={fn()}>
            Secondary
          </Button>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Danger</h2>
        <Div>
          <Button variant="primary" danger onClick={fn()}>
            Primary
          </Button>
        </Div>
        <Div>
          <Button variant="secondary" danger onClick={fn()}>
            Secondary
          </Button>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Disabled</h2>
        <Div>
          <Button variant="primary" disabled onClick={fn()}>
            Primary
          </Button>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Icon + text</h2>
        <Div>
          <Button
            variant="primary"
            startIcon={<span aria-hidden>★</span>}
            onClick={fn()}
          >
            Starred
          </Button>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Icon only</h2>
        <Div>
          <IconButton onClick={fn()} aria-label="icon button">
            <span aria-hidden>★</span>
          </IconButton>
        </Div>
        <Div>
          <IconButton bordered onClick={fn()} aria-label="bordered icon">
            <span aria-hidden>★</span>
          </IconButton>
        </Div>
        <Div>
          <IconButton
            bordered
            size="small"
            onClick={fn()}
            aria-label="small icon"
          >
            <span aria-hidden>★</span>
          </IconButton>
        </Div>
        <Div>
          <IconButton
            bordered
            size="medium"
            onClick={fn()}
            aria-label="medium icon"
          >
            <span aria-hidden>★</span>
          </IconButton>
        </Div>
        <Div>
          <IconButton
            bordered
            size="large"
            onClick={fn()}
            aria-label="large icon"
          >
            <span aria-hidden>★</span>
          </IconButton>
        </Div>
        <Div style={{ position: 'relative', width: 40, height: 40 }}>
          <InspectorToggleButton onClick={fn()} aria-label="inspector toggle">
            <span aria-hidden>☰</span>
          </InspectorToggleButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Toggle</h2>
        <Div>
          <ToggleButton selected={false} onChange={fn()}>
            Off
          </ToggleButton>
        </Div>
        <Div>
          <ToggleButton selected={true} onChange={fn()}>
            On
          </ToggleButton>
        </Div>
      </StorySectionInner>
    </StorySection>
  ),
}
