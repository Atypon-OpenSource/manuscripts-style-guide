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
