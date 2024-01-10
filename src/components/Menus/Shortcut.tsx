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
import styled from 'styled-components'

import { MenuShortcut } from '../../lib/menus'

const isMac = /Mac/.test(window.navigator.platform)

export const ShortcutContainer = styled.div`
  display: inline-flex;
  color: #6e6e6e;
  margin-left: 16px;
  flex-shrink: 0;
  justify-content: flex-end;
`

type Modifiers = {
  [key: string]: string
}

const macModifiers: Modifiers = {
  Option: '⌥',
  CommandOrControl: '⌘',
  Shift: '⇧',
}

const pcModifiers: Modifiers = {
  Option: 'Alt',
  CommandOrControl: 'Ctrl',
  Shift: 'Shift',
}

const modifiers = isMac ? macModifiers : pcModifiers

const system = isMac ? 'mac' : 'pc'
const separator = isMac ? '' : '-'

const Character = styled.span`
  display: inline-block;
  min-width: 1ch;
`

const parts = (shortcut: MenuShortcut): React.ReactNode[] => {
  const nodes = []

  for (const part of shortcut[system].split('+')) {
    const modifier = modifiers[part]
    if (modifier) {
      nodes.push(modifier)
      nodes.push(separator)
    } else {
      nodes.push(<Character key={part}>{part}</Character>)
    }
  }

  return nodes
}

interface ShortcutProps {
  shortcut: MenuShortcut
}

export const Shortcut: React.FC<ShortcutProps> = ({ shortcut }) => (
  <ShortcutContainer>{parts(shortcut)}</ShortcutContainer>
)
