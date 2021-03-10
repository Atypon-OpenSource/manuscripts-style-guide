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

import { Color } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import styled from 'styled-components'

import { ColorSelector } from './ColorSelector'

type ColorReq = Partial<Color> & { value: string }

interface Props {
  options: ColorReq[]
  value: string
  handleChange: (color?: string) => void
}

export const ColorField: React.FC<Props> = ({
  options,
  value,
  handleChange,
}) => (
  <Container>
    {options.map((color) => (
      <ItemButton
        key={color.value}
        type="button"
        color={color.value}
        isActive={value === color.value}
        onClick={() => handleChange(color.value)}
      />
    ))}
    <ColorSelector handleChange={handleChange} />
  </Container>
)

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const ItemButton = styled.button<{
  color?: string
  isActive: boolean
}>`
  background: ${(props) => props.color};
  box-shadow: ${(props) => (props.isActive ? '0 0 1px 1px #000' : 'none')};
  height: ${(props) => props.theme.grid.unit * 3}px;
  width: ${(props) => props.theme.grid.unit * 3}px;
  border-radius: 50%;
  margin: 2px;
  padding: 0;
  border: 1px solid ${(props) => props.theme.colors.border.tertiary};
  cursor: pointer;
  flex-shrink: 0;

  /*  &:focus {
    outline: none;
  }*/
`
