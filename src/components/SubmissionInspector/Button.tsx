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

import React from 'react'
import styled from 'styled-components'

import { ButtonGroup, IconButton } from '../Button'

export const ZoomButton = styled(IconButton)`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: ${(props) => props.theme.grid.unit * 8}px;
`

export const ZoomButtonGroup = styled(ButtonGroup)`
  width: ${(props) => props.theme.grid.unit * 22}px;
  justify-content: space-between;
`
