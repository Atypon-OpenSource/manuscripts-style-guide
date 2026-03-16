import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { afterEach, describe, expect, it } from 'vitest'

import { defaultTheme } from '../../defaultTheme'
import { InspectorSection } from '../InspectorSection'

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>)
}

afterEach(cleanup)

describe('InspectorSection', () => {
  it('renders the title', () => {
    renderWithTheme(<InspectorSection title="Details" />)
    expect(screen.getByText('Details')).toBeInTheDocument()
  })

  it('renders children when expanded (default)', () => {
    renderWithTheme(
      <InspectorSection title="Section">
        <p>Content inside</p>
      </InspectorSection>
    )
    expect(screen.getByText('Content inside')).toBeInTheDocument()
  })

  it('hides children after clicking the heading', async () => {
    const user = userEvent.setup()

    renderWithTheme(
      <InspectorSection title="Section">
        <p>Content inside</p>
      </InspectorSection>
    )

    expect(screen.getByText('Content inside')).toBeInTheDocument()

    await user.click(screen.getByText('Section'))

    expect(screen.queryByText('Content inside')).not.toBeInTheDocument()
  })

  it('re-expands children when heading is clicked again', async () => {
    const user = userEvent.setup()

    renderWithTheme(
      <InspectorSection title="Section">
        <p>Content inside</p>
      </InspectorSection>
    )

    await user.click(screen.getByText('Section'))
    expect(screen.queryByText('Content inside')).not.toBeInTheDocument()

    await user.click(screen.getByText('Section'))
    expect(screen.getByText('Content inside')).toBeInTheDocument()
  })

  it('toggles children via the expander button', async () => {
    const user = userEvent.setup()

    renderWithTheme(
      <InspectorSection title="Section">
        <p>Visible content</p>
      </InspectorSection>
    )

    const toggleBtn = screen.getByRole('button', {
      name: 'Toggle expand section',
    })

    await user.click(toggleBtn)
    expect(screen.queryByText('Visible content')).not.toBeInTheDocument()

    await user.click(toggleBtn)
    expect(screen.getByText('Visible content')).toBeInTheDocument()
  })

  it('does not render expander button when collapsible is false', () => {
    renderWithTheme(
      <InspectorSection title="Static" collapsible={false}>
        <p>Always visible</p>
      </InspectorSection>
    )

    expect(
      screen.queryByRole('button', { name: 'Toggle expand section' })
    ).not.toBeInTheDocument()
    expect(screen.getByText('Always visible')).toBeInTheDocument()
  })

  it('does not collapse when heading is clicked and collapsible is false', async () => {
    const user = userEvent.setup()

    renderWithTheme(
      <InspectorSection title="Locked" collapsible={false}>
        <p>Stays visible</p>
      </InspectorSection>
    )

    await user.click(screen.getByText('Locked'))
    expect(screen.getByText('Stays visible')).toBeInTheDocument()
  })

  it('applies contentStyles to the children wrapper', () => {
    renderWithTheme(
      <InspectorSection title="Styled" contentStyles={{ padding: '20px' }}>
        <p>Styled content</p>
      </InspectorSection>
    )

    const content = screen.getByText('Styled content')
    expect(content.parentElement).toHaveStyle({ padding: '20px' })
  })

  it('does not render content div when children are absent', () => {
    const { container } = renderWithTheme(
      <InspectorSection title="Empty" />
    )

    const headingText = screen.getByText('Empty')
    const section = headingText.closest('div')!.parentElement!
    const childDivs = section.querySelectorAll(':scope > div > div > div')

    const contentDivs = Array.from(
      section.querySelectorAll(':scope > div')
    ).filter(
      (el) =>
        !el.textContent?.includes('Empty') &&
        el.tagName !== 'HR' &&
        el.getAttribute('style') !== null
    )
    expect(contentDivs).toHaveLength(0)
  })

  it('renders with a JSX node as title', () => {
    renderWithTheme(
      <InspectorSection title={<span data-testid="custom-title">Custom</span>}>
        <p>Body</p>
      </InspectorSection>
    )

    expect(screen.getByTestId('custom-title')).toBeInTheDocument()
    expect(screen.getByText('Custom')).toBeInTheDocument()
  })

  it('sets cursor to default when collapsible is false', () => {
    renderWithTheme(
      <InspectorSection title="No pointer" collapsible={false}>
        <p>Content</p>
      </InspectorSection>
    )

    const heading = screen.getByText('No pointer').closest('[style]')
    expect(heading).toHaveStyle({ cursor: 'default' })
  })

  it('sets cursor to pointer when collapsible is true', () => {
    renderWithTheme(
      <InspectorSection title="Pointer">
        <p>Content</p>
      </InspectorSection>
    )

    const heading = screen.getByText('Pointer').closest('[style]')
    expect(heading).toHaveStyle({ cursor: 'pointer' })
  })
})
