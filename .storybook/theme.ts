import { createGlobalStyle } from '../src/styled-components'
import { Theme } from '../src/theme'
import * as colors from './colors'

const fontFamily =
  '"Barlow", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${fontFamily};
  }
`

export const theme: Theme = {
  colors: {
    global: {
      background: {
        default: colors.white,
        error: colors.chablisRed,
      },
      text: {
        primary: colors.manuscriptsGrey,
        secondary: colors.dustyGrey,
        link: colors.manuscriptsBlue,
        error: colors.darkCoral,
      },
    },

    textField: {
      placeholder: {
        default: '#aaa',
        hovered: '#777',
      },
      border: {
        default: '#aaa',
        error: '#d47666',
      },
    },

    button: {
      primary: colors.manuscriptsBlue,
      secondary: colors.dustyGrey,
      danger: colors.punchRed,
    },

    alertMessage: {
      success: {
        background: colors.peppermintGreen,
        text: colors.killarneyGreen,
        border: colors.springGreen,
        dismiss: colors.springGreen,
      },
      error: {
        background: colors.chablisRed,
        text: colors.punchRed,
        border: colors.mandysRed,
        dismiss: colors.mandysRed,
      },
      info: {
        background: colors.powderBlue,
        text: colors.jellyBeanBlue,
        border: colors.manuscriptsBlue,
        dismiss: colors.towerGrey,
      },
      warning: {
        background: colors.butteryYellow,
        text: colors.zestOrange,
        border: colors.wheatYellow,
        dismiss: colors.wheatYellow,
      },
    },

    dialog: {
      text: colors.dustyGrey,
      background: colors.white,
      icon: colors.butteryYellow,
      shadow: colors.altoGrey,
    },

    modal: {
      overlay: colors.aquaHaze,
      border: colors.lightGrey,
      shadow: colors.altoGrey,
    },

    profile: {
      avatar: colors.darkGrey, // dustyGrey
      date: colors.dustyGrey,
    },

    authors: {
      add: {
        hovered: colors.salomieYellow,
      },
      searchIcon: colors.manuscriptsBlue,
    },

    sidebar: {
      background: {
        default: colors.aliceBlue,
        selected: colors.powderBlue,
      },
      text: {
        primary: colors.manuscriptsGrey,
        secondary: colors.dustyGrey,
        link: colors.manuscriptsBlue,
      },
      dropLine: colors.mayaBlue,
      label: colors.manuscriptsBlue,
      border: colors.dustyGrey,
    },
  },

  fontFamily,
  radius: 8,
  spacing: 4,
}
