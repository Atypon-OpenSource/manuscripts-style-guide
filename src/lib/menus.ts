/*!
 * © 2024 Atypon Systems LLC
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

import {
  ManuscriptEditorState,
  ManuscriptTransaction,
} from '@manuscripts/transform'

export type Dispatch = (tr: ManuscriptTransaction) => void

export interface MenuShortcut {
  mac: string
  pc: string
}

export type TableConfig = {
  numberOfColumns: number
  numberOfRows: number
  includeHeader: boolean
}

export interface MenuSpec {
  id: string
  label: string
  role?: string
  shortcut?: MenuShortcut
  isActive?: boolean
  isEnabled: boolean
  run?: (tableConfig?: TableConfig) => void
  submenu?: (MenuSpec | MenuSeparator)[]
  options?: {
    [key: string]: () => void
  }
}

export interface Menu extends MenuSpec {
  isOpen: boolean
  submenu?: (Menu | MenuSeparator)[]
}

export type MenuSeparator = {
  role: 'separator'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isMenuSeparator = (menu: any): menu is MenuSeparator => {
  return menu?.role === 'separator'
}

export type MenuPointer = [number, number, number]
