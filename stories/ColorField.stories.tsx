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
import React from 'react'

import { ColorField } from '../src/components/ColorField/ColorField'

const COLORS = [
  { _id: '1', value: '#999999' },
  { _id: '2', value: '#F44E3B' },
  { _id: '3', value: '#FE9200' },
  { _id: '4', value: '#FCDC00' },
  { _id: '5', value: '#DBDF00' },
  { _id: '6', value: '#A4DD00' },
  { _id: '7', value: '#68CCCA' },
  { _id: '8', value: '#73D8FF' },
  { _id: '9', value: '#AEA1FF' },
  { _id: '10', value: '#FDA1FF' },
]

storiesOf('ColorField', module).add('Basic', () => (
  <ColorField
    options={COLORS}
    value="#999999"
    handleChange={action('change color')}
  />
))
