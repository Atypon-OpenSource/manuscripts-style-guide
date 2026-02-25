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

import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import React, { useState } from 'react'

import { Modal, ModalProps, PrimaryButton } from '../src'

const ModalStory: React.FC<Omit<ModalProps, 'isOpen' | 'onClose'>> = (props) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open Modal</PrimaryButton>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: () => (
    <ModalStory
      header="Modal Title"
      actions={[
        { label: 'Cancel', onClick: fn(), variant: 'secondary' },
        { label: 'Confirm', onClick: fn(), variant: 'primary' },
      ]}
    >
      <p>Please be advised that the document will be permanently removed from both the system and your dashboard.</p>
    </ModalStory>
  ),
}
