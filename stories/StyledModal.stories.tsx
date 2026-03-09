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
import React, { useState } from 'react'
import styled from 'styled-components'

import {
  CloseButton,
  ModalBody,
  ModalCardBody,
  ModalContainer,
  ModalHeader,
  ModalSidebar,
  ModalSidebarHeader,
  ModalSidebarTitle,
  ModalTitle,
  PrimaryButton,
  ScrollableModalContent,
  SecondaryButton,
  StyledModal,
  TertiaryButton,
} from '../src'

const meta: Meta<typeof StyledModal> = {
  title: 'StyledModal',
  component: StyledModal,
}

export default meta
type Story = StoryObj<typeof StyledModal>

const CardModalStory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open Modal</PrimaryButton>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onClick={() => setIsOpen(false)} />
          </ModalHeader>
          <ModalCardBody>
            <ModalTitle>Card Modal</ModalTitle>
            <p>A simple card-style modal with a title and content.</p>
            <Footer>
              <SecondaryButton onClick={() => setIsOpen(false)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={() => setIsOpen(false)}>Confirm</PrimaryButton>
            </Footer>
          </ModalCardBody>
        </ModalContainer>
      </StyledModal>
    </>
  )
}

export const CardModal: Story = {
  render: () => <CardModalStory />,
}

const SidebarModalStory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open Sidebar Modal</PrimaryButton>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onClick={() => setIsOpen(false)} />
          </ModalHeader>
          <ModalBody>
            <ModalSidebar>
              <ModalSidebarHeader>
                <ModalSidebarTitle>Items</ModalSidebarTitle>
              </ModalSidebarHeader>
              <div style={{ padding: '0 12px' }}>
                <p>Item 1</p>
                <p>Item 2</p>
                <p>Item 3</p>
              </div>
            </ModalSidebar>
            <ScrollableModalContent>
              <h3>Detail View</h3>
              <p>Select an item from the sidebar to view its details here.</p>
            </ScrollableModalContent>
          </ModalBody>
        </ModalContainer>
      </StyledModal>
    </>
  )
}

export const SidebarModal: Story = {
  render: () => <SidebarModalStory />,
}

const DangerModalStory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open Danger Modal</PrimaryButton>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onClick={() => setIsOpen(false)} />
          </ModalHeader>
          <ModalCardBody>
            <ModalTitle>Delete Item</ModalTitle>
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <Footer>
              <SecondaryButton onClick={() => setIsOpen(false)}>Cancel</SecondaryButton>
              <PrimaryButton danger={true} onClick={() => setIsOpen(false)}>Delete</PrimaryButton>
            </Footer>
          </ModalCardBody>
        </ModalContainer>
      </StyledModal>
    </>
  )
}

export const DangerModal: Story = {
  render: () => <DangerModalStory />,
}

const InfoModalStory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open Info Modal</PrimaryButton>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onClick={() => setIsOpen(false)} />
          </ModalHeader>
          <ModalCardBody>
            <ModalTitle>Information</ModalTitle>
            <p>Your changes have been saved successfully.</p>
            <Footer>
              <PrimaryButton onClick={() => setIsOpen(false)}>OK</PrimaryButton>
            </Footer>
          </ModalCardBody>
        </ModalContainer>
      </StyledModal>
    </>
  )
}

export const InfoModal: Story = {
  render: () => <InfoModalStory />,
}

const MultipleActionsStory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open Modal</PrimaryButton>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onClick={() => setIsOpen(false)} />
          </ModalHeader>
          <ModalCardBody>
            <ModalTitle>Unsaved Changes</ModalTitle>
            <p>You have unsaved changes. What would you like to do?</p>
            <Footer>
              <TertiaryButton onClick={() => setIsOpen(false)}>Discard</TertiaryButton>
              <SecondaryButton onClick={() => setIsOpen(false)}>Save as Draft</SecondaryButton>
              <PrimaryButton onClick={() => setIsOpen(false)}>Publish</PrimaryButton>
            </Footer>
          </ModalCardBody>
        </ModalContainer>
      </StyledModal>
    </>
  )
}

export const MultipleActions: Story = {
  render: () => <MultipleActionsStory />,
}

const NoOverlayStory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open No-Overlay Modal</PrimaryButton>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        hideOverlay={true}
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onClick={() => setIsOpen(false)} />
          </ModalHeader>
          <ModalCardBody>
            <ModalTitle>No Overlay</ModalTitle>
            <p>This modal has a transparent backdrop.</p>
            <Footer>
              <PrimaryButton onClick={() => setIsOpen(false)}>Close</PrimaryButton>
            </Footer>
          </ModalCardBody>
        </ModalContainer>
      </StyledModal>
    </>
  )
}

export const NoOverlay: Story = {
  render: () => <NoOverlayStory />,
}

const OnRequestCloseStory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [message, setMessage] = useState<string | null>(null)

  return (
    <>
      <PrimaryButton onClick={() => setIsOpen(true)}>Open Modal</PrimaryButton>
      {message != null && <p style={{ marginTop: 8 }}>{message}</p>}
      <StyledModal
        isOpen={isOpen}
        onRequestClose={(e) => {
          setMessage('onRequestClose ran (Esc or backdrop)')
          setIsOpen(false)
        }}
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onClick={() => setIsOpen(false)} />
          </ModalHeader>
          <ModalCardBody>
            <ModalTitle>onRequestClose</ModalTitle>
            <p>One callback for both Esc and backdrop. Called with the Event on Esc so you can preventDefault() to block closing.</p>
            <Footer>
              <SecondaryButton onClick={() => setIsOpen(false)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={() => setIsOpen(false)}>Confirm</PrimaryButton>
            </Footer>
          </ModalCardBody>
        </ModalContainer>
      </StyledModal>
    </>
  )
}

export const OnRequestClose: Story = {
  render: () => <OnRequestCloseStory />,
  parameters: {
    docs: {
      description: {
        story: '`onRequestClose` is called when the user presses Esc or clicks the backdrop. On Esc the event is passed so you can call `e.preventDefault()` to prevent closing.',
      },
    },
  },
}

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`
