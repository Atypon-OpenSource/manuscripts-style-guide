/*!
 * © 2020 Atypon Systems LLC
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
  name: string
  colors: Colors
  font: Font
  grid: Grid
  shadow: Shadow
}

interface Colors {
  background: Background & Alerts & Variations
  border: Border & Alerts & Variations
  brand: Brand
  button: Button
  text: Text & Alerts & Variations
}
interface Font {
  family: FontFamily
  lineHeight: LineHeight
  size: FontSize
  weight: FontWeight
}
interface Radius {
  default: string
  small: string
  rounder: string
}
interface Grid {
  radius: Radius
  unit: number
  mobile: number
  tablet: number
  smallDesktop: number
  desktop: number
  largeDesktop: number
}
interface Shadow {
  boxShadow: string
  dropShadow: string
}

interface Alerts {
  error: string
  info: string
  success: string
  warning: string
}
interface Elements {
  background: States
  border: States
  color: States
}
interface States {
  active: string
  default: string
  hover: string
}
interface Variations {
  primary: string
  secondary: string
  tertiary: string
  fifth?: string
}

interface Background {
  dark: string
}
interface Border {
  field: States
}
interface Brand {
  dark: string
  default: string
  medium: string
  light: string
  xlight: string
  secondary: string
}
interface Button {
  default: Elements
  primary: Elements
  secondary: Elements
  error: Elements
}
interface Text {
  muted: string
  onDark: string
  onLight: string
}

interface FontFamily {
  sans: string
  serif: string
  Lato: string
}
interface FontSize {
  xlarge: string
  large: string
  medium: string
  normal: string
  small: string
}
interface LineHeight {
  large: string
  normal: string
  small: string
}
interface FontWeight {
  xbold: number
  bold: number
  semibold: number
  medium: number
  normal: number
  light: number
  xlight: number
}
