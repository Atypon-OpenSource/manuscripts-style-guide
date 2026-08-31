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

// Deliberately decoupled from `../../colors.ts` (kept untouched) - this is the
// deduped palette for the experimental MUI track: dead tokens are dropped and
// the greyMutedText/greyLight duplicate is collapsed to one value. Hex values
// are copied manually so visuals stay identical to the existing theme.
export const palette = {
  primary: {
    dark: '#0b6bb8', // manuscriptsBlueDark
    main: '#0d79d0', // manuscriptsBlue
    light: '#bce7f6', // manuscriptsLight
    contrastText: '#fff',
  },
  secondary: {
    main: '#353535', // manuscriptsSecondary
  },
  error: {
    dark: '#c74237', // darkRed
    main: '#e1200e', // punchRed
    light: '#f5c1b7', // mandysRed
    contrastText: '#fff',
  },
  success: {
    dark: '#31a056', // contrastGreen
    main: '#36b260', // killarneyGreen
    light: '#eefbe9', // veryLightGreen
    contrastText: '#fff',
  },
  warning: {
    dark: '#fa5700', // contrastOrange
    main: '#fe8f1f', // zestOrange (only survivor of the yellow/orange family)
    light: '#fffcdb', // butteryYellow
    contrastText: '#353535',
  },
  info: {
    main: '#1a9bc7', // manuscriptsIcons
    light: '#f5fbfc', // manuscriptsXLight2
    contrastText: '#fff',
  },
  grey: {
    50: '#fafafa', // alabasterGrey
    100: '#f2f2f2', // seashellGrey
    200: '#f5f5f5', // disabled
    300: '#e2e2e2', // mercuryGrey
    400: '#c9c9c9', // greyLight (greyMutedText duplicate dropped)
    700: '#6e6e6e', // greyMuted
    900: '#353535', // greyDark
  },
  common: {
    black: '#000',
    white: '#fff',
  },
  focus: '#3DADFF', // focusBlue, used for the focus-visible outline
  // hover/active accents not covered by the palette entries above (used by
  // consumers building selected/active nav-style states on top of Button)
  brand: {
    medium: '#1a9bc7', // manuscriptsIcons, same value as info.main
    xlight: '#ddf3fa', // manuscriptsXLight
  },
} as const
