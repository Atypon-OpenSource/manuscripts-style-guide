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

import { createTheme } from '@mui/material/styles'

import { palette } from './palette'

export const muiTheme = createTheme({
  palette: {
    primary: palette.primary,
    secondary: palette.secondary,
    error: palette.error,
    success: palette.success,
    warning: palette.warning,
    info: palette.info,
    grey: palette.grey,
    common: palette.common,
  },
  typography: {
    fontFamily: '"Lato", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 360,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
        outlined: {
          borderColor: palette.grey[300],
        },
        outlinedError: {
          color: palette.error.main,
          borderColor: palette.error.main,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: `3px solid ${palette.focus}`,
            outlineOffset: '4px',
          },
        },
      },
    },
  },
})
