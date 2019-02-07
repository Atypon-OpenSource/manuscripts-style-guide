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
    button: {
      primary: colors.manuscriptsBlue,
      secondary: colors.dustyGrey,
      danger: colors.punchRed,
    },
  },
  fontFamily,
  radius: 8,
  spacing: 4,
}
