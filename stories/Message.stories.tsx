/*!
 * © 2025 Atypon Systems LLC
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
import { storiesOf } from '@storybook/react'
import React from 'react'

import { AttentionGreenIcon, AttentionOrangeIcon, Message } from '../src/'

storiesOf('Message', module)
  .add('simple', () => <Message>Example of a message</Message>)
  .add('with success icon', () => (
    <Message icon={AttentionGreenIcon}>Example of a message</Message>
  ))
  .add('with warning icon', () => (
    <Message icon={AttentionOrangeIcon}>Example of a message</Message>
  ))
  .add('centered', () => <Message isCentered>Example of a message</Message>)
  .add('centered with icon', () => (
    <Message isCentered icon={AttentionGreenIcon}>
      Example of a message
    </Message>
  ))
