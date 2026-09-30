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

import { ThemeProvider } from '@mui/material/styles'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
  muiTheme,
  Typography,
  type TypographyColor,
  type TypographyFontWeight,
  type TypographyProps,
  type TypographyVariant,
} from '../src/mui'

const VARIANTS: TypographyVariant[] = ['h1', 'h2', 'h3', 'body', 'caption']
const COLORS: TypographyColor[] = ['primary', 'secondary', 'muted']
const FONT_WEIGHTS: Exclude<TypographyFontWeight, number>[] = [
  'regular',
  'medium',
  'bold',
]
const ALIGNS: NonNullable<TypographyProps['align']>[] = [
  'left',
  'center',
  'right',
  'justify',
]
const CLAMPS: NonNullable<TypographyProps['clamp']>[] = [2, 3]

const variantGuide: Record<
  TypographyVariant,
  { size: string; weight: string; element: string; useFor: string }
> = {
  h1: {
    size: '20px',
    weight: '700',
    element: 'h1',
    useFor: 'Page titles (PrimaryHeading)',
  },
  h2: {
    size: '18px',
    weight: '700',
    element: 'h2',
    useFor: 'Section headings; pair with fontWeight="regular" for subcopy',
  },
  h3: {
    size: '16px',
    weight: '700',
    element: 'h3',
    useFor: 'Mid headings / emphasized body-size titles',
  },
  body: {
    size: '14px',
    weight: '400',
    element: 'p',
    useFor: 'Default paragraph text',
  },
  caption: {
    size: '12px',
    weight: '400',
    element: 'span',
    useFor: 'Helper, meta, and compact labels',
  },
}

const Section: React.FC<{
  title?: string
  hint?: string
  children: React.ReactNode
}> = ({ title, hint, children }) => (
  <div
    style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}
  >
    {title && (
      <div>
        <div style={{ font: '700 14px/20px Lato, sans-serif' }}>{title}</div>
        {hint && (
          <div style={{ font: '12px/16px Lato, sans-serif', color: '#6e6e6e' }}>
            {hint}
          </div>
        )}
      </div>
    )}
    {children}
  </div>
)

const PropLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code
    style={{
      fontSize: 12,
      color: '#6e6e6e',
      background: '#f5f5f5',
      padding: '2px 6px',
      borderRadius: 4,
      alignSelf: 'flex-start',
    }}
  >
    {children}
  </code>
)

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {children}
  </div>
)

const meta: Meta<typeof Typography> = {
  title: 'MUI/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Shared text primitive. Import from \`@manuscripts/style-guide/mui\`.

**Choose a \`variant\` first**, then adjust with props. Do not add new variants for one-off pages.

| Prop | Values | Default | When to use |
| --- | --- | --- | --- |
| \`variant\` | \`h1\` \\| \`h2\` \\| \`h3\` \\| \`body\` \\| \`caption\` | \`body\` | Type style + default HTML tag |
| \`color\` | \`primary\` \\| \`secondary\` \\| \`muted\` | \`primary\` | Text color (\`#353535\` / \`#6e6e6e\` / \`#c9c9c9\`) |
| \`fontWeight\` | \`regular\` \\| \`medium\` \\| \`bold\` or a number | variant default | Override weight (e.g. \`h2\` + \`regular\`) |
| \`align\` | \`left\` \\| \`center\` \\| \`right\` \\| \`justify\` \\| \`inherit\` | inherit | Text alignment |
| \`italic\` | boolean | false | Emphasis |
| \`uppercase\` | boolean | false | All-caps labels |
| \`noWrap\` | boolean | false | Single-line ellipsis |
| \`clamp\` | \`2\` \\| \`3\` | — | Multi-line clamp |
| \`sx\` | MUI sx | — | Spacing or rare sizes only (login \`3rem\` / \`1.5rem\`). Not for color/weight/align. |
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={muiTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: VARIANTS,
      description:
        'Type style. h1=20px/700, h2=18px/700, h3=16px/700, body=14px/400, caption=12px/400.',
      table: { defaultValue: { summary: 'body' } },
    },
    color: {
      control: 'select',
      options: COLORS,
      description: 'primary=#353535, secondary=#6e6e6e, muted=#c9c9c9.',
      table: { defaultValue: { summary: 'primary' } },
    },
    fontWeight: {
      control: 'select',
      options: FONT_WEIGHTS,
      description:
        'regular=400, medium=500, bold=700. A number is also allowed.',
    },
    align: {
      control: 'select',
      options: ['inherit', ...ALIGNS],
      description: 'CSS text-align.',
    },
    italic: {
      control: 'boolean',
      description: 'Sets font-style: italic.',
    },
    uppercase: {
      control: 'boolean',
      description: 'Sets text-transform: uppercase.',
    },
    noWrap: {
      control: 'boolean',
      description: 'Single-line ellipsis. Combine with a maxWidth via sx.',
    },
    clamp: {
      control: 'select',
      options: [undefined, 2, 3],
      description: 'Line clamp (2 or 3). Combine with a maxWidth via sx.',
    },
    children: { control: 'text' },
    sx: {
      description:
        'Escape hatch for margin/padding or one-off fontSize (LoginPage only). Prefer props for color, weight, and align.',
    },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body',
    color: 'primary',
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Use the Controls panel to try every prop. This is the same component apps import from `@manuscripts/style-guide/mui`.',
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <Section
      title="variant"
      hint="Pick one of five styles. Size and default weight come from the theme."
    >
      {VARIANTS.map((variant) => {
        const spec = variantGuide[variant]
        return (
          <Row key={variant}>
            <PropLabel>
              variant=&quot;{variant}&quot; → {spec.element} · {spec.size} /{' '}
              {spec.weight} · {spec.useFor}
            </PropLabel>
            <Typography variant={variant}>
              {variant}: The quick brown fox jumps over the lazy dog
            </Typography>
          </Row>
        )
      })}
    </Section>
  ),
}

export const Color: Story = {
  render: () => (
    <Section
      title="color"
      hint="Do not pass MUI palette keys like primary.main. Use these three tokens."
    >
      {COLORS.map((color) => (
        <Row key={color}>
          <PropLabel>color=&quot;{color}&quot;</PropLabel>
          <Typography color={color}>
            {color} — The quick brown fox jumps over the lazy dog
          </Typography>
        </Row>
      ))}
    </Section>
  ),
}

export const FontWeight: Story = {
  render: () => (
    <Section
      title="fontWeight"
      hint='Named values: regular (400), medium (500), bold (700). Example: heading subcopy is variant="h2" fontWeight="regular".'
    >
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <PropLabel>variant=&quot;{variant}&quot;</PropLabel>
          {FONT_WEIGHTS.map((fontWeight) => (
            <Typography
              key={fontWeight}
              variant={variant}
              fontWeight={fontWeight}
            >
              fontWeight=&quot;{fontWeight}&quot;
            </Typography>
          ))}
        </div>
      ))}
    </Section>
  ),
}

export const Align: Story = {
  render: () => (
    <Section title="align" hint="MUI text-align. Default follows the parent.">
      {ALIGNS.map((align) => (
        <div
          key={align}
          style={{ border: '1px dashed #e2e2e2', padding: 8, width: '100%' }}
        >
          <PropLabel>align=&quot;{align}&quot;</PropLabel>
          <Typography align={align}>
            Align {align}: The quick brown fox jumps over the lazy dog
          </Typography>
        </div>
      ))}
    </Section>
  ),
}

export const ItalicAndUppercase: Story = {
  render: () => (
    <Section
      title="italic / uppercase"
      hint="Boolean modifiers. Combine with any variant."
    >
      <Row>
        <PropLabel>italic</PropLabel>
        <Typography italic>Italic body</Typography>
        <Typography variant="h2" italic>
          Italic h2
        </Typography>
      </Row>
      <Row>
        <PropLabel>uppercase</PropLabel>
        <Typography uppercase variant="caption">
          Uppercase caption
        </Typography>
        <Typography uppercase fontWeight="bold">
          Uppercase bold body
        </Typography>
      </Row>
      <Row>
        <PropLabel>italic + uppercase</PropLabel>
        <Typography italic uppercase>
          Italic uppercase body
        </Typography>
      </Row>
    </Section>
  ),
}

export const Overflow: Story = {
  render: () => (
    <Section
      title="noWrap / clamp"
      hint="Truncation needs a width constraint. Pass maxWidth with sx; do not invent extra variants."
    >
      <Row>
        <PropLabel>noWrap sx=&#123;&#123; maxWidth: 180 &#125;&#125;</PropLabel>
        <Typography noWrap sx={{ maxWidth: 180 }}>
          One line that should ellipsis when it overflows the container
        </Typography>
      </Row>
      {CLAMPS.map((clamp) => (
        <Row key={clamp}>
          <PropLabel>
            clamp=&#123;{clamp}&#125; sx=&#123;&#123; maxWidth: 220 &#125;&#125;
          </PropLabel>
          <Typography clamp={clamp} sx={{ maxWidth: 220 }}>
            Line clamp {clamp}: this wraps then truncates once the text is long
            enough to exceed {clamp} lines in this narrow column. Extra words
            keep going so the clamp is visible.
          </Typography>
        </Row>
      ))}
    </Section>
  ),
}

export const ColorByVariant: Story = {
  render: () => (
    <Section
      title="variant × color"
      hint="Every supported combination. Prefer this over ad-hoc hex colors."
    >
      {VARIANTS.map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <PropLabel>variant=&quot;{variant}&quot;</PropLabel>
          {COLORS.map((color) => (
            <Typography key={color} variant={variant} color={color}>
              {variant} / {color}
            </Typography>
          ))}
        </div>
      ))}
    </Section>
  ),
}

export const SxEscapeHatch: Story = {
  render: () => (
    <Section
      title="sx (spacing and rare sizes only)"
      hint="Login is the only current fontSize override. Spacing uses sx too. Do not use sx for color, weight, or align."
    >
      <Row>
        <PropLabel>
          variant=&quot;h1&quot; sx=&#123;&#123; fontSize: &apos;3rem&apos;
          &#125;&#125;
        </PropLabel>
        <Typography variant="h1" sx={{ fontSize: '3rem' }}>
          Help teams get more done
        </Typography>
      </Row>
      <Row>
        <PropLabel>
          variant=&quot;h2&quot; fontWeight=&quot;regular&quot; sx=&#123;&#123;
          fontSize: &apos;1.5rem&apos; &#125;&#125;
        </PropLabel>
        <Typography
          variant="h2"
          fontWeight="regular"
          sx={{ fontSize: '1.5rem' }}
        >
          An adjustable editing tool for production workflows
        </Typography>
      </Row>
      <Row>
        <PropLabel>
          variant=&quot;h1&quot; sx=&#123;&#123; mb: 3 &#125;&#125;
        </PropLabel>
        <Typography variant="h1" sx={{ mb: 3 }}>
          Page title with 24px margin below
        </Typography>
      </Row>
    </Section>
  ),
}
