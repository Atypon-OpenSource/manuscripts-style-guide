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

const meta: Meta<typeof PrimaryButton> = {
  title: 'Buttons',
  component: PrimaryButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PrimaryButton>

export const Variations: Story = {
  render: () => (
    <StorySection>
      <StorySectionInner>
        <h2>Default</h2>
        <Div>
          <PrimaryButton>PrimaryButton</PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton>SecondaryButton</SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton>TertiaryButton</TertiaryButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Mini</h2>
        <Div>
          <PrimaryButton mini={true}>PrimaryButton</PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton mini={true}>SecondaryButton</SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton mini={true}>TertiaryButton</TertiaryButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Disabled</h2>
        <Div>
          <PrimaryButton disabled={true}>PrimaryButton</PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton disabled={true}>SecondaryButton</SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton disabled={true}>TertiaryButton</TertiaryButton>
        </Div>
      </StorySectionInner>
    </StorySection>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <StorySection>
      <StorySectionInner>
        <h2>IconButton</h2>
        <Div>
          <IconButton>
            <AddIcon />
          </IconButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>SecondaryIconButton</h2>
        <Div>
          <SecondaryIconButton>
            <AddIcon />
          </SecondaryIconButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>RoundIconButton</h2>
        <Div>
          <RoundIconButton>
            <AddIcon />
          </RoundIconButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>CloseButton</h2>
        <Div>
          <CloseButton />
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>IconTextButton</h2>
        <Div>
          <IconTextButton>
            <AddIcon />
            Icon text button
          </IconTextButton>
        </Div>
      </StorySectionInner>
    </StorySection>
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
      <TertiaryButton>TertiaryButton</TertiaryButton>
      <PrimaryButton>PrimaryButton</PrimaryButton>
    </ButtonGroup>
  ),
}
