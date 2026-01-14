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

import React from 'react'
import styled from 'styled-components'

export interface ToggleSwitchProps {
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
  label?: string
  id?: string
  labelPosition?: 'left' | 'right'
}

const Track = styled.button<{ checked: boolean; disabled?: boolean }>`
  position: relative;
  width: 30px;
  height: 16px;
  border-radius: 999px;
  border: 1px solid ${(props) => (props.checked ? '#0d79d0' : '#6E6E6E')};
  background: ${(props) =>
    props.checked ? '#0d79d0' : '#6E6E6E'};
  padding: 0;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    box-shadow 120ms ease;
  outline: none;
  flex-shrink: 0;

  &:focus-visible {
    box-shadow: 0 0 0 2px #0d79d04d;
  }

  &:disabled {
    background: #c9c9c9;
    border-color: #c9c9c9;
  }
`

const Thumb = styled.span<{ checked: boolean; disabled?: boolean }>`
  position: absolute;
  top: 0;
  left: ${(props) => (props.checked ? '14px' : '0px')};
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: left 120ms ease;

  ${(props) =>
    props.disabled &&
    `
    background: #fdfdfd;
    box-shadow: none;
  `}
`

const LabelText = styled.span<{ disabled?: boolean }>`
  color: ${(props) =>
    props.disabled ? '#b3b3b3' : props.theme.colors.text.primary};
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.medium} / 1
    ${(props) => props.theme.font.family.sans};
  line-height: 20px;
`

const Container = styled.label<{ labelPosition: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  flex-direction: ${(props) =>
    props.labelPosition === 'left' ? 'row' : 'row-reverse'};
`

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  disabled,
  onChange,
  label,
  id,
  labelPosition = 'left',
}) => {
  return (
    <Container labelPosition={labelPosition}>
      {label && <LabelText disabled={disabled}>{label}</LabelText>}
      <Track
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
      >
        <Thumb checked={checked} disabled={disabled} />
      </Track>
    </Container>
  )
}
