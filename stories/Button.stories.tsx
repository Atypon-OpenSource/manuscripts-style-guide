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

import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import {
  Button,
  DangerButton,
  GreyButton,
  MiniButton,
  PrimaryButton,
  PrimaryMiniButton,
} from '../src'

storiesOf('Buttons', module)
  .add('Button', () => <Button onClick={action('clicked')}>Example</Button>)
  .add('Primary Button', () => (
    <PrimaryButton onClick={action('clicked')}>Done</PrimaryButton>
  ))
  .add('Danger Button', () => (
    <DangerButton onClick={action('clicked')}>Delete</DangerButton>
  ))
  .add('Grey Button', () => (
    <GreyButton onClick={action('clicked')}>Example</GreyButton>
  ))
  .add('Mini Button', () => (
    <MiniButton onClick={action('clicked')}>Example</MiniButton>
  ))
  .add('Primary Mini Button', () => (
    <PrimaryMiniButton onClick={action('clicked')}>Example</PrimaryMiniButton>
  ))
