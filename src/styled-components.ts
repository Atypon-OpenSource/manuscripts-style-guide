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

import React from 'react'
import * as styledComponents from 'styled-components'
import { Theme } from './theme'

// https://www.styled-components.com/docs/api#typescript

const {
  default: styled,
  css,
  createGlobalStyle,
  ThemeProvider,
  withTheme,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<Theme>

export { createGlobalStyle, css, styled, ThemeProvider, withTheme }

export type ThemedProps<V> = styledComponents.ThemedStyledProps<
  React.HTMLProps<V>,
  Theme
>

export type ThemedStyledComponent<
  C extends keyof JSX.IntrinsicElements | React.ComponentType<any>
> = styledComponents.StyledComponent<C, Theme>

export type ThemeProps = styledComponents.ThemeProps<Theme>
