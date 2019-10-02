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
      secondary: colors.aliceBlue,
      tertiary: colors.jellyBeanBlue,
      fifth: colors.blue,
      dark: 'rgba(0,0,0,0.5)',
      error: colors.chablisRed,
      info: colors.powderBlue,
      success: colors.peppermintGreen,
      warning: colors.butteryYellow,
    },
    border: {
      error: colors.mandysRed,
      info: colors.manuscriptsBlue,
      success: colors.springGreen,
      warning: colors.wheatYellow,
      primary: colors.dustyGrey,
      secondary: colors.mercuryGrey,
      tertiary: 'rgba(0, 0, 0, 0.1)',
      field: {
        active: colors.manuscriptsBlue,
        default: colors.warmGrey,
        hover: colors.manuscriptsBlue,
      },
    },
    brand: {
      dark: colors.manuscriptsBlueDark,
      medium: colors.manuscriptsBlueDark,
      default: colors.manuscriptsBlue,
      light: colors.iceBlue,
      xlight: colors.linkWaterBlue,
      secondary: colors.manuscriptsYellow,
    },
    button: {
      default: {
        background: {
          active: 'transparent',
          default: 'transparent',
          hover: colors.seashellGrey,
        },
        border: {
          active: 'transparent',
          default: 'transparent',
          hover: colors.seashellGrey,
        },
        color: {
          active: colors.manuscriptsBlue,
          default: colors.manuscriptsGrey,
          hover: colors.manuscriptsGrey,
        },
      },
      primary: {
        background: {
          active: colors.manuscriptsBlueDark,
          default: colors.manuscriptsBlue,
          hover: 'transparent',
        },
        border: {
          active: colors.manuscriptsBlueDark,
          default: colors.manuscriptsBlue,
          hover: colors.manuscriptsBlueDark,
        },
        color: {
          active: colors.white,
          default: colors.white,
          hover: colors.manuscriptsBlueDark,
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
          active: colors.manuscriptsBlue,
          default: colors.manuscriptsGrey,
          hover: colors.manuscriptsBlue,
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
      primary: colors.manuscriptsGrey,
      secondary: colors.dustyGrey,
      tertiary: colors.scorpionGrey,
      muted: colors.altoGrey,
      onDark: colors.white,
      onLight: colors.manuscriptsGrey,
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
      xlight: 100,
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
