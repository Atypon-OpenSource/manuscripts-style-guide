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
import { fn } from '@storybook/test'
import React from 'react'
import styled from 'styled-components'

import {
  AddIcon,
  AttachIcon,
  ButtonGroup,
  CloseButton,
  IconButton,
  IconTextButton,
  PrimaryButton,
  RadioButton,
  RoundIconButton,
  SecondaryButton,
  SecondaryIconButton,
  TertiaryButton,
  ToggleButton,
  ToggleButtonAlt,
} from '../src'
import { CommentReplyIcon } from '../src/components/icons'

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
  title: 'Buttons',
}

export default meta
type Story = StoryObj

export const Variations: Story = {
  render: () => (
    <StorySection>
      <StorySectionInner>
        <h2>Default</h2>
        <Div>
          <PrimaryButton onClick={fn()}>PrimaryButton</PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton onClick={fn()}>SecondaryButton</SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton onClick={fn()}>TertiaryButton</TertiaryButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Mini</h2>
        <Div>
          <PrimaryButton mini={true} onClick={fn()}>
            PrimaryButton
          </PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton mini={true} onClick={fn()}>
            SecondaryButton
          </SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton mini={true} onClick={fn()}>
            TertiaryButton
          </TertiaryButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Disabled</h2>
        <Div>
          <PrimaryButton disabled={true} onClick={fn()}>
            PrimaryButton
          </PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton disabled={true} onClick={fn()}>
            SecondaryButton
          </SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton disabled={true} onClick={fn()}>
            TertiaryButton
          </TertiaryButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Type "error"</h2>
        <Div>
          <PrimaryButton danger={true} onClick={fn()}>
            PrimaryButton
          </PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton danger={true} onClick={fn()}>
            SecondaryButton
          </SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton danger={true} onClick={fn()}>
            TertiaryButton
          </TertiaryButton>
        </Div>
      </StorySectionInner>
    </StorySection>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <>
      <StorySection>
        <StorySectionInner>
          <h2>IconButton</h2>
          <h3>Default</h3>
          <Div>
            <IconButton onClick={fn()}>
              <AddIcon />
            </IconButton>
            <SecondaryIconButton onClick={fn()}>
              <AddIcon />
            </SecondaryIconButton>
          </Div>
          <h3>Set size</h3>
          <Div>
            <IconButton size={64} onClick={fn()}>
              <AddIcon />
            </IconButton>
            <SecondaryIconButton size={64} onClick={fn()}>
              <AddIcon />
            </SecondaryIconButton>
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>RoundIconButton</h2>
          <h3>Default</h3>
          <Div>
            <RoundIconButton onClick={fn()}>
              <CommentReplyIcon />
            </RoundIconButton>
          </Div>
          <h3>CloseButton</h3>
          <Div>
            <CloseButton onClick={fn()} />
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>IconTextButton</h2>
          <Div>
            <IconTextButton onClick={fn()}>
              <AddIcon />
              Icon text button
            </IconTextButton>
          </Div>
        </StorySectionInner>
      </StorySection>
    </>
  ),
}

export const ToggleButtons: Story = {
  render: () => (
    <StorySection>
      <StorySectionInner>
        <Div>
          <ToggleButton selected={true}>Toggle selected</ToggleButton>
        </Div>
        <Div>
          <ToggleButton>Toggle unselected</ToggleButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <Div>
          <ToggleButton selected={true}>
            <AttachIcon />
            &nbsp;Toggle selected
          </ToggleButton>
        </Div>
        <Div>
          <ToggleButton>
            <AttachIcon />
            &nbsp;Toggle unselected
          </ToggleButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <Div>
          <ToggleButtonAlt selected={true}>
            Toggle selected - alternativeFormat
          </ToggleButtonAlt>
        </Div>
        <Div>
          <ToggleButtonAlt>
            Toggle unselected - alternativeFormat
          </ToggleButtonAlt>
        </Div>
      </StorySectionInner>
    </StorySection>
  ),
}

export const RadioButtons: Story = {
  render: () => (
    <>
      <Div>
        <RadioButton
          checked={true}
          id={'radio_1'}
          name={'radio_group'}
          label={'Radio checked'}
        />
      </Div>
      <Div>
        <RadioButton
          id={'radio_2'}
          name={'radio_group'}
          label={'Radio unchecked'}
        />
      </Div>
    </>
  ),
}

export const ButtonGroups: Story = {
  render: () => (
    <ButtonGroup>
      <TertiaryButton onClick={fn()}>TertiaryButton</TertiaryButton>
      <PrimaryButton onClick={fn()}>PrimaryButton</PrimaryButton>
    </ButtonGroup>
  ),
}
