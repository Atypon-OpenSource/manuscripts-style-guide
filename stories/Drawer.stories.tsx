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

import { Drawer } from '../src/components/Drawer'

const items = [
  {
    id: '1',
    label: 'Item 1',
  },
  {
    id: '2',
    label: 'Item 2',
  },
  {
    id: '3',
    label: 'Item 3',
  },
]

storiesOf('Drawer', module)
  .add('default', () => (
    <div style={{ height: '400px' }}>
      <Drawer
        items={items}
        selectedIds={['1']}
        title="Select Items"
        onSelect={action('selected')}
        onBack={action('back')}
      />
    </div>
  ))
  .add('with multiple selections', () => (
    <div style={{ height: '400px' }}>
      <Drawer
        items={items}
        selectedIds={['1', '2']}
        title="Select Multiple Items"
        onSelect={action('selected')}
        onBack={action('back')}
      />
    </div>
  ))
  .add('without selection', () => (
    <div style={{ height: '400px' }}>
      <Drawer
        items={items}
        selectedIds={[]}
        title="Choose Items"
        onSelect={action('selected')}
        onBack={action('back')}
      />
    </div>
  ))
