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

import AddIconHighlight from '@manuscripts/assets/react/AddIconHighlight'
import AddIconInverted from '@manuscripts/assets/react/AddIconInverted'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'
import {
  ButtonGroup,
  CloseButton,
  IconButton,
  IconTextButton,
  PrimaryButton,
  RadioButton,
  SecondaryButton,
  SecondaryIconButton,
  TertiaryButton,
  ToggleButton,
  ToggleButtonAlt,
} from '../src'

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

storiesOf('Buttons', module)
  .add('Variations', () => (
    <StorySection>
      <StorySectionInner>
        <h2>Default</h2>
        <Div>
          <PrimaryButton onClick={action('clicked Primary SecondaryButton')}>
            PrimaryButton
          </PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton onClick={action('clicked SecondaryButton')}>
            SecondaryButton
          </SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton onClick={action('clicked TertiaryButton')}>
            TertiaryButton
          </TertiaryButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Mini</h2>
        <Div>
          <PrimaryButton mini={true} onClick={action('clicked PrimaryButton')}>
            PrimaryButton
          </PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton
            mini={true}
            onClick={action('clicked SecondaryButton')}
          >
            SecondaryButton
          </SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton
            mini={true}
            onClick={action('clicked TertiaryButton')}
          >
            TertiaryButton
          </TertiaryButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Disabled</h2>
        <Div>
          <PrimaryButton
            disabled={true}
            onClick={action('clicked PrimaryButton')}
          >
            PrimaryButton
          </PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton
            disabled={true}
            onClick={action('clicked SecondaryButton')}
          >
            SecondaryButton
          </SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton
            disabled={true}
            onClick={action('clicked TertiaryButton')}
          >
            TertiaryButton
          </TertiaryButton>
        </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h2>Type "error"</h2>
        <Div>
          <PrimaryButton
            danger={true}
            onClick={action('clicked PrimaryButton')}
          >
            PrimaryButton
          </PrimaryButton>
        </Div>
        <Div>
          <SecondaryButton
            danger={true}
            onClick={action('clicked SecondaryButton')}
          >
            SecondaryButton
          </SecondaryButton>
        </Div>
        <Div>
          <TertiaryButton danger={true} onClick={action('clicked Grey')}>
            TertiaryButton
          </TertiaryButton>
        </Div>
      </StorySectionInner>
    </StorySection>
  ))
  .add('Icon Buttons', () => (
    <>
      <StorySection>
        <StorySectionInner>
          <h2>IconButton</h2>
          <h3>Default</h3>
          <Div>
            <IconButton onClick={action('clicked')}>
              <AddIconInverted />
            </IconButton>
            <SecondaryIconButton onClick={action('clicked')}>
              <AddIconInverted />
            </SecondaryIconButton>
          </Div>
          <h3>Set size</h3>
          <Div>
            <IconButton size={64} onClick={action('clicked')}>
              <AddIconInverted />
            </IconButton>
            <SecondaryIconButton size={64} onClick={action('clicked')}>
              <AddIconInverted />
            </SecondaryIconButton>
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>CloseButton</h2>
          <h3>Default</h3>
          <Div>
            <CloseButton onClick={action('clicked CloseButton')} />
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>IconTextButton</h2>
          <Div>
            <IconTextButton onClick={action('clicked IconTextButton')}>
              <AddIconHighlight />
              Icon text button
            </IconTextButton>
          </Div>
        </StorySectionInner>
      </StorySection>
    </>
  ))
  .add('Toggle Button', () => (
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
  ))
  .add('Radio Button', () => (
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
  ))
  .add('Button Group', () => (
    <ButtonGroup>
      <TertiaryButton onClick={action('clicked TertiaryButton')}>
        TertiaryButton
      </TertiaryButton>
      <PrimaryButton onClick={action('clicked PrimaryButton')}>
        PrimaryButton
      </PrimaryButton>
    </ButtonGroup>
  ))
