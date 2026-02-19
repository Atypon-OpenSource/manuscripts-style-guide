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
import React from 'react'
import styled from 'styled-components'

import * as colors from '../src/colors'

const colorGroups: { title: string; keys: (keyof typeof colors)[] }[] = [
  {
    title: 'Primary palette',
    keys: [
      'manuscriptsBlueDark',
      'manuscriptsBlue',
      'manuscriptsIcons',
      'manuscriptsLight',
      'manuscriptsXLight',
      'manuscriptsXLight2',
      'manuscriptsSecondary',
    ],
  },
  {
    title: 'Greys',
    keys: [
      'black',
      'greyDark',
      'greyMuted',
      'greyMutedText',
      'greyLight',
      'mercuryGrey',
      'seashellGrey',
      'alabasterGrey',
      'white',
    ],
  },
  {
    title: 'Blues',
    keys: [
      'jellyBeanBlue',
      'aliceBlue',
      'powderBlue',
      'focusBlue',
      'graphBlue1',
    ],
  },
  {
    title: 'Reds',
    keys: ['punchRed', 'mandysRed', 'chablisRed', 'darkRed'],
  },
  {
    title: 'Greens',
    keys: ['killarneyGreen', 'springGreen', 'peppermintGreen'],
  },
  {
    title: 'Yellows & oranges',
    keys: ['zestOrange', 'wheatYellow', 'butteryYellow'],
  },
]

function getLuminance(hex: string): number {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
  if (!match) {
    return 0.5
  }
  const [r, g, b] = match.slice(1).map((x) => parseInt(x, 16) / 255)
  return 0.299 * r + 0.587 * g + 0.114 * b
}

function getContrastColor(hex: string): string {
  return getLuminance(hex) > 0.5 ? '#1a1a1a' : '#fafafa'
}

const Container = styled.div`
  padding: 24px;
  font-family: 'Lato', sans-serif;
`

const Section = styled.section`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #353535;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #e2e2e2;
  text-transform: capitalize;
`

const SwatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
`

const SwatchCard = styled.div<{ $bg: string; $textColor: string }>`
  background: ${(p) => p.$bg};
  color: ${(p) => p.$textColor};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.06);
`

const SwatchColor = styled.div<{ $bg: string }>`
  height: 72px;
  background: ${(p) => p.$bg};
`

const SwatchInfo = styled.div`
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.4;
`

const SwatchName = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
  word-break: break-word;
`

const SwatchHex = styled.code`
  font-size: 11px;
  opacity: 0.9;
  font-family: ui-monospace, monospace;
`

const meta: Meta = {
  title: 'Theme/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Raw color palette from `@manuscripts/style-guide` (colors.ts). Use these to build theme values or for one-off UI.',
      },
    },
  },
}

export const Palette: StoryObj = {
  render: () => (
    <Container>
      {colorGroups.map((group) => (
        <Section key={group.title}>
          <SectionTitle>{group.title}</SectionTitle>
          <SwatchGrid>
            {group.keys.map((key) => {
              const hex = (colors as Record<string, string>)[key]
              if (typeof hex !== 'string') {
                return null
              }
              const textColor = getContrastColor(hex)
              return (
                <SwatchCard key={key} $bg={hex} $textColor={textColor}>
                  <SwatchColor $bg={hex} />
                  <SwatchInfo>
                    <SwatchName>{key}</SwatchName>
                    <SwatchHex>{hex}</SwatchHex>
                  </SwatchInfo>
                </SwatchCard>
              )
            })}
          </SwatchGrid>
        </Section>
      ))}
    </Container>
  ),
}

export default meta
