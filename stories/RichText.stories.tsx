/*!
 * © 2024 Atypon Systems LLC
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

import { RichText } from '../src/components/RichText/RichText'
import { RichTextField } from '../src/components/RichText/RichTextField'

const text =
  'This is rich text. It can have <strong>Bold text</strong>, <i>italic text</i>, <sub>Subscript</sub> and <sup>Superscript</sup> &quot;'

const meta: Meta = {
  title: 'Rich Text',
}

export default meta
type Story = StoryObj

export const RichText_: Story = {
  render: () => <RichText value={text} />,
}

export const RichTextField_: Story = {
  render: () => <RichTextField value={text} onChange={fn()} />,
}
