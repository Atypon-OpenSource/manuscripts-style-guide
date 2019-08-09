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

export interface Theme {
  colors: Palette
  fontFamily: string
  radius: number
  spacing: number
}

export interface PrimaryColorStyle {
  primary: string
}

export interface SecondaryColorStyle {
  secondary: string
}

export interface DefaultColorStyle {
  default: string
}

export interface FocusColorStyle {
  focused: string
}

export interface HoverableColorStyle {
  hovered: string
}

export interface ErrorColorStyle {
  error: string
}

export interface LinkColorStyle {
  link: string
}

export interface SelectableColorStyle {
  selected: string
}

export interface AlertMessageColorStyle {
  background: string
  text: string
  border: string
  dismiss: string
}

export type TextColorStyle = PrimaryColorStyle & SecondaryColorStyle

export interface Palette {
  global: {
    background: {
      default: string
      error: string
    }
    text: {
      primary: string
      secondary: string
      tertiary: string
      error: string
      link: string
    }
  }
  button: {
    primary: string
    secondary: string
    danger: string
  }
  textField: {
    placeholder: DefaultColorStyle & HoverableColorStyle
    border: DefaultColorStyle & ErrorColorStyle & FocusColorStyle
  }
  alertMessage: {
    success: AlertMessageColorStyle
    error: AlertMessageColorStyle
    info: AlertMessageColorStyle
    warning: AlertMessageColorStyle
  }
  modal: {
    overlay: string
    border: string
    shadow: string
  }
  profile: {
    avatar: {
      default: string
      hovered: string
    }
    date: string
  }
  authors: {
    add: HoverableColorStyle
    searchIcon: string
  }
  sidebar: {
    background: DefaultColorStyle & SelectableColorStyle
    text: TextColorStyle & LinkColorStyle
    dropLine: string
    label: string
    border: string
  }
  dialog: {
    text: string
    background: string
    icon: string
    shadow: string
  }
}
