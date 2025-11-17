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

import type { Meta, StoryObj } from '@storybook/react'
import styled, { DefaultTheme, ThemeProps } from 'styled-components'

const StorySection = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const StorySectionInner = styled.div`
  flex: 1;
  margin: 10px;
  max-width: 200px;
`

const Div = styled.div<{
  bgColor?: (props: ThemeProps<DefaultTheme>) => string
  fontFamily?: (props: ThemeProps<DefaultTheme>) => string
  fontSize?: (props: ThemeProps<DefaultTheme>) => string
  fontWeight?: (props: ThemeProps<DefaultTheme>) => number
  lineHeight?: (props: ThemeProps<DefaultTheme>) => string
}>`
  background-color: ${(props) => props.bgColor};
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  line-height: ${(props) => props.lineHeight};
  padding: 16px;
`

const metaColors: Meta = {
  title: 'Theme/Colors',
}

export const Basic: StoryObj = {
  ...metaColors,
  render: () => (
    <>
      <StorySection>
        <StorySectionInner>
          <h1>Brand</h1>
          <Div bgColor={(props) => props.theme.colors.brand.dark}>dark</Div>
          <Div bgColor={(props) => props.theme.colors.brand.medium}>medium</Div>
          <Div bgColor={(props) => props.theme.colors.brand.default}>
            default
          </Div>
          <Div bgColor={(props) => props.theme.colors.brand.light}>light</Div>
          <Div bgColor={(props) => props.theme.colors.brand.xlight}>xlight</Div>
          <Div bgColor={(props) => props.theme.colors.brand.secondary}>
            secondary
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h1>Background</h1>
          <Div bgColor={(props) => props.theme.colors.background.primary}>
            primary
          </Div>
          <Div bgColor={(props) => props.theme.colors.background.secondary}>
            secondary
          </Div>
          <Div bgColor={(props) => props.theme.colors.background.tertiary}>
            tertiary
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.background.fifth
                ? props.theme.colors.background.fifth
                : ''
            }
          >
            fifth
          </Div>
          <Div bgColor={(props) => props.theme.colors.background.dark}>
            dark
          </Div>
          <Div bgColor={(props) => props.theme.colors.background.error}>
            error
          </Div>
          <Div bgColor={(props) => props.theme.colors.background.info}>
            info
          </Div>
          <Div bgColor={(props) => props.theme.colors.background.success}>
            success
          </Div>
          <Div bgColor={(props) => props.theme.colors.background.warning}>
            warning
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h1>Text</h1>
          <Div bgColor={(props) => props.theme.colors.text.primary}>
            primary
          </Div>
          <Div bgColor={(props) => props.theme.colors.text.secondary}>
            secondary
          </Div>
          <Div bgColor={(props) => props.theme.colors.text.tertiary}>
            tertiary
          </Div>
          <Div bgColor={(props) => props.theme.colors.text.muted}>muted</Div>
          <Div bgColor={(props) => props.theme.colors.text.onDark}>onDark</Div>
          <Div bgColor={(props) => props.theme.colors.text.onLight}>
            onLight
          </Div>
          <Div bgColor={(props) => props.theme.colors.text.error}>error</Div>
          <Div bgColor={(props) => props.theme.colors.text.info}>info</Div>
          <Div bgColor={(props) => props.theme.colors.text.success}>
            success
          </Div>
          <Div bgColor={(props) => props.theme.colors.text.warning}>
            warning
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h1>Border</h1>
          <Div bgColor={(props) => props.theme.colors.border.primary}>
            primary
          </Div>
          <Div bgColor={(props) => props.theme.colors.border.secondary}>
            secondary
          </Div>
          <Div bgColor={(props) => props.theme.colors.border.tertiary}>
            tertiary
          </Div>
          <Div bgColor={(props) => props.theme.colors.border.error}>error</Div>
          <Div bgColor={(props) => props.theme.colors.border.info}>info</Div>
          <Div bgColor={(props) => props.theme.colors.border.success}>
            success
          </Div>
          <Div bgColor={(props) => props.theme.colors.border.warning}>
            warning
          </Div>
          <Div bgColor={(props) => props.theme.colors.border.field.default}>
            field - default
          </Div>
          <Div bgColor={(props) => props.theme.colors.border.field.active}>
            field - active
          </Div>
          <Div bgColor={(props) => props.theme.colors.border.field.hover}>
            field - hover
          </Div>
        </StorySectionInner>
      </StorySection>
    </>
  ),
}

export const Buttons: StoryObj = {
  ...metaColors,
  render: () => (
    <>
      <h2>Default</h2>
      <StorySection>
        <StorySectionInner>
          <h2>Background</h2>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.default.background.default
            }
          >
            default
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.default.background.hover
            }
          >
            hover
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.default.background.active
            }
          >
            active
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>Border</h2>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.default.border.default
            }
          >
            default
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.default.border.hover}
          >
            hover
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.default.border.active}
          >
            active
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>Text color</h2>
          <Div
            bgColor={(props) => props.theme.colors.button.default.color.default}
          >
            default
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.default.color.hover}
          >
            hover
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.default.color.active}
          >
            active
          </Div>
        </StorySectionInner>
      </StorySection>
      <h2>Primary</h2>
      <StorySection>
        <StorySectionInner>
          <h2>Background</h2>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.primary.background.default
            }
          >
            default
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.primary.background.hover
            }
          >
            hover
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.primary.background.active
            }
          >
            active
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>Border</h2>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.primary.border.default
            }
          >
            default
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.primary.border.hover}
          >
            hover
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.primary.border.active}
          >
            active
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>Text color</h2>
          <Div
            bgColor={(props) => props.theme.colors.button.primary.color.default}
          >
            default
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.primary.color.hover}
          >
            hover
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.primary.color.active}
          >
            active
          </Div>
        </StorySectionInner>
      </StorySection>
      <h2>Secondary</h2>
      <StorySection>
        <StorySectionInner>
          <h2>Background</h2>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.secondary.background.default
            }
          >
            default
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.secondary.background.hover
            }
          >
            hover
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.secondary.background.active
            }
          >
            active
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>Border</h2>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.secondary.border.default
            }
          >
            default
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.secondary.border.hover
            }
          >
            hover
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.secondary.border.active
            }
          >
            active
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>Text color</h2>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.secondary.color.default
            }
          >
            default
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.secondary.color.hover}
          >
            hover
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.secondary.color.active
            }
          >
            active
          </Div>
        </StorySectionInner>
      </StorySection>
      <h2>Danger</h2>
      <StorySection>
        <StorySectionInner>
          <h2>Background</h2>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.error.background.default
            }
          >
            default
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.error.background.hover
            }
          >
            hover
          </Div>
          <Div
            bgColor={(props) =>
              props.theme.colors.button.error.background.active
            }
          >
            active
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>Border</h2>
          <Div
            bgColor={(props) => props.theme.colors.button.error.border.default}
          >
            default
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.error.border.hover}
          >
            hover
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.error.border.active}
          >
            active
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h2>Text color</h2>
          <Div
            bgColor={(props) => props.theme.colors.button.error.color.default}
          >
            default
          </Div>
          <Div bgColor={(props) => props.theme.colors.button.error.color.hover}>
            hover
          </Div>
          <Div
            bgColor={(props) => props.theme.colors.button.error.color.active}
          >
            active
          </Div>
        </StorySectionInner>
      </StorySection>
    </>
  ),
}

export const ColorsPalette: StoryObj = {
  ...metaColors,
  render: () => (
    <StorySection>
      <StorySectionInner>
        <h1>GREYS</h1>
        <Div bgColor={(props) => '#000'} style={{ color: 'white' }}>
          black
        </Div>
        <Div bgColor={(props) => '#353535'} style={{ color: 'white' }}>
          greyDark
        </Div>
        <Div bgColor={(props) => '#6e6e6e'} style={{ color: 'white' }}>
          greyMuted
        </Div>
        <Div bgColor={(props) => '#d8d8d8'}> mercuryGrey </Div>
        <Div bgColor={(props) => '#e2e2e2'}> seashellGrey </Div>
        <Div bgColor={(props) => '#fcfcfc'}> alabasterGrey </Div>
        <Div bgColor={(props) => '#fff'}> white </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h1>BLUES</h1>
        <Div bgColor={(props) => '#2781a1'} style={{ color: 'white' }}>
          jellyBeanBlue
        </Div>
        <Div bgColor={(props) => '#0d79d0'} style={{ color: 'white' }}>
          manuscriptsBlueDark
        </Div>
        <Div bgColor={(props) => '#1a9bc7'} style={{ color: 'white' }}>
          manuscriptsBlue
        </Div>
        <Div bgColor={(props) => '#bce7f6'}>manuscriptsLight</Div>
        <Div bgColor={(props) => '#f5fbfc'}>manuscriptsXLight2</Div>
      </StorySectionInner>
      <StorySectionInner>
        <h1>GREENS</h1>
        <Div bgColor={(props) => '#36b260'}> killarneyGreen </Div>
        <Div bgColor={(props) => '#b2c0ac'}> springGreen </Div>
        <Div bgColor={(props) => '#dff0d7'}> peppermintGreen </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h1>REDS</h1>
        <Div bgColor={(props) => '#f35143'}> punchRed </Div>
        <Div bgColor={(props) => '#f5c1b7'}> mandysRed </Div>
        <Div bgColor={(props) => '#fff1f0'}> chablisRed </Div>
      </StorySectionInner>
      <StorySectionInner>
        <h1>YELLOWS</h1>
        <Div bgColor={(props) => '#fe8f1f'}>zestOrange</Div>
        <Div bgColor={(props) => '#ffbd26'}>manuscriptsSecondary</Div>
        <Div bgColor={(props) => '#ffe0b2'}> wheatYellow </Div>
        <Div bgColor={(props) => '#fffcdb'}> butteryYellow </Div>
      </StorySectionInner>
    </StorySection>
  ),
}

const meta: Meta = {
  title: 'Theme',
}

export default meta
type Story = StoryObj

export const Typography: Story = {
  render: () => (
    <>
      <StorySection>
        <StorySectionInner>
          <h1>Font Families</h1>
          <Div fontFamily={(props) => props.theme.font.family.sans}>
            sans - "Lato", sans-serif
          </Div>
          <Div fontFamily={(props) => props.theme.font.family.serif}>
            serif - "serif"
          </Div>
        </StorySectionInner>
      </StorySection>
      <StorySection>
        <StorySectionInner>
          <h1>Font Sizes</h1>
          <Div fontSize={(props) => props.theme.font.size.xlarge}>
            xlarge - 20px
          </Div>
          <Div fontSize={(props) => props.theme.font.size.large}>
            large - 18px
          </Div>
          <Div fontSize={(props) => props.theme.font.size.medium}>
            medium - 16px
          </Div>
          <Div fontSize={(props) => props.theme.font.size.normal}>
            normal - 14px
          </Div>
          <Div fontSize={(props) => props.theme.font.size.small}>
            small - 12px
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h1>Font Weights</h1>
          <Div fontWeight={(props) => props.theme.font.weight.xbold}>
            extrabold - 900
          </Div>
          <Div fontWeight={(props) => props.theme.font.weight.bold}>
            bold - 700
          </Div>
          <Div fontWeight={(props) => props.theme.font.weight.normal}>
            normal - 400
          </Div>
          <Div fontWeight={(props) => props.theme.font.weight.light}>
            light - 400
          </Div>
          <Div fontWeight={(props) => props.theme.font.weight.xlight}>
            extralight - 400
          </Div>
        </StorySectionInner>
        <StorySectionInner>
          <h1>Line Heights</h1>
          <Div lineHeight={(props) => props.theme.font.lineHeight.large}>
            large - 24px
          </Div>
          <Div lineHeight={(props) => props.theme.font.lineHeight.normal}>
            normal - 16px
          </Div>
          <Div lineHeight={(props) => props.theme.font.lineHeight.small}>
            small - 14px
          </Div>
        </StorySectionInner>
      </StorySection>
    </>
  ),
}

export const Grid: Story = {
  render: () => (
    <StorySection>
      <StorySectionInner>
        <h1>Unit</h1>
        <Div>4</Div>
      </StorySectionInner>
      <StorySectionInner>
        <h1>Radius</h1>
        <Div>default - 8px</Div>
        <Div>small - 4px</Div>
      </StorySectionInner>
      <StorySectionInner>
        <h1>Breakpoints</h1>
        <Div>mobile - 360</Div>
        <Div>tablet - 768</Div>
        <Div>smallDesktop - 1024</Div>
        <Div>desktop - 1280</Div>
        <Div>largeDesktop - 1920</Div>
        <Div>editorMaxWidth - 960</Div>
      </StorySectionInner>
    </StorySection>
  ),
}
