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

import 'typeface-lato'
import { createGlobalStyle } from '../src/styled-components'
import { Theme } from '../src/theme'
import * as colors from './colors'

const fontFamily = '"Lato", sans-serif'

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.background.primary};
    color: ${props => props.theme.colors.text.primary};
    font-family: ${props => props.theme.font.family.sans};
    margin: 0;
  }
`

export const theme: Theme = {
  name: 'Manuscripts',
  colors: {
    background: {
      primary: colors.white,
      secondary: colors.greyMuted,
      tertiary: colors.mercuryGrey,
      fifth: colors.manuscriptsXLight2,
      dark: 'rgba(0,0,0,0.5)',
      error: colors.chablisRed,
      info: colors.manuscriptsXLight2,
      success: colors.peppermintGreen,
      warning: colors.butteryYellow,
    },
    border: {
      error: colors.mandysRed,
      info: colors.manuscriptsBlue,
      success: colors.springGreen,
      warning: colors.wheatYellow,
      primary: colors.manuscriptsLight,
      secondary: colors.mercuryGrey,
      tertiary: colors.seashellGrey,
      field: {
        active: colors.manuscriptsLight,
        default: colors.mercuryGrey,
        hover: colors.manuscriptsLight,
      },
    },
    brand: {
      dark: colors.manuscriptsBlueDark,
      medium: colors.manuscriptsBlueDark,
      default: colors.manuscriptsBlue,
      light: colors.manuscriptsLight,
      xlight: colors.manuscriptsXLight,
      secondary: colors.manuscriptsSecondary,
    },
    button: {
      default: {
        background: {
          active: 'transparent',
          default: 'transparent',
          hover: colors.manuscriptsXLight2,
        },
        border: {
          active: 'transparent',
          default: 'transparent',
          hover: colors.manuscriptsXLight2,
        },
        color: {
          active: colors.manuscriptsBlueDark,
          default: colors.manuscriptsBlueDark,
          hover: colors.manuscriptsBlueDark,
        },
      },
      primary: {
        background: {
          active: colors.manuscriptsBlue,
          default: colors.manuscriptsBlueDark,
          hover: colors.manuscriptsBlue,
        },
        border: {
          active: colors.manuscriptsBlue,
          default: colors.manuscriptsBlueDark,
          hover: colors.manuscriptsBlue,
        },
        color: {
          active: colors.white,
          default: colors.white,
          hover: colors.white,
        },
      },
      secondary: {
        background: {
          active: 'transparent',
          default: 'transparent',
          hover: 'transparent',
        },
        border: {
          active: colors.mercuryGrey,
          default: colors.mercuryGrey,
          hover: colors.mercuryGrey,
        },
        color: {
          active: colors.manuscriptsBlueDark,
          default: colors.greyDark,
          hover: colors.manuscriptsBlueDark,
        },
      },
      error: {
        background: {
          active: colors.punchRed,
          default: colors.punchRed,
          hover: 'transparent',
        },
        border: {
          active: colors.punchRed,
          default: colors.punchRed,
          hover: colors.punchRed,
        },
        color: {
          active: colors.white,
          default: colors.white,
          hover: colors.punchRed,
        },
      },
    },
    text: {
      primary: colors.greyDark,
      secondary: colors.greyMuted,
      tertiary: colors.manuscriptsBlueDark,
      muted: colors.mercuryGrey,
      onDark: colors.white,
      onLight: colors.greyMuted,
      error: colors.punchRed,
      info: colors.jellyBeanBlue,
      success: colors.killarneyGreen,
      warning: colors.zestOrange,
    },
  },
  font: {
    family: {
      sans: fontFamily,
      serif: 'serif',
    },
    size: {
      xlarge: '20px',
      large: '18px',
      medium: '16px',
      normal: '14px',
      small: '12px',
    },
    lineHeight: {
      large: '24px',
      normal: '16px',
      small: '14px',
    },
    weight: {
      xbold: 900,
      bold: 700,
      semibold: 600,
      medium: 500,
      normal: 400,
      light: 300,
      xlight: 200,
    },
  },
  grid: {
    radius: {
      default: '8px',
      small: '4px',
      rounder: '16px',
    },
    unit: 4,
    mobile: 360,
    tablet: 768,
    smallDesktop: 1024,
    desktop: 1280,
    largeDesktop: 1920,
  },
  shadow: {
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.05)',
    dropShadow: '0 4px 9px 0 rgba(84, 83, 83, 0.3)',
  },
}
