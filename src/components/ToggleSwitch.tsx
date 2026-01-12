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
}

const Track = styled.button<{ checked: boolean; disabled?: boolean }>`
  position: relative;
  width: 36px;
  height: 20px;
  border-radius: 999px;
  border: 1.5px solid
    ${(props) =>
      props.checked
        ? props.theme.colors.brand.medium
        : props.theme.colors.border.field.default};
  background: ${(props) =>
    props.checked
      ? props.theme.colors.brand.medium
      : props.theme.colors.background.primary};
  padding: 0;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    box-shadow 120ms ease;
  outline: none;

  &:hover {
    border-color: ${(props) =>
      props.checked
        ? props.theme.colors.brand.dark
        : props.theme.colors.border.field.hover};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.outline.focus};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.background.fifth};
    border-color: ${(props) => props.theme.colors.border.field.default};
  }
`

const Thumb = styled.span<{ checked: boolean; disabled?: boolean }>`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.checked ? '18px' : '2px')};
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${(props) =>
    props.disabled
      ? props.theme.colors.border.field.default
      : props.theme.colors.background.primary};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transition:
    left 120ms ease,
    background-color 120ms ease;
`

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  disabled,
  onChange,
  label,
  id,
}) => {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {label && (
        <span
          style={{
            color: disabled ? '#aaa' : undefined,
            fontSize: '14px',
          }}
        >
          {label}
        </span>
      )}
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
    </label>
  )
}
