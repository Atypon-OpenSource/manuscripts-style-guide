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

import styled, { css } from 'styled-components'

const dangerBtnStyles = css`
  ${(props) =>
    btnColors(
      props.theme.colors.button.error.color.default,
      props.theme.colors.button.error.background.default,
      props.theme.colors.button.error.border.default,
      true
    )}

  &:not([disabled]):hover, &:not([disabled]):focus {
    ${(props) =>
      btnColors(
        props.theme.colors.button.error.color.hover,
        props.theme.colors.button.error.background.hover,
        props.theme.colors.button.error.border.hover,
        true
      )}
  }

  &:not([disabled]):active {
    ${(props) =>
      btnColors(
        props.theme.colors.button.error.color.active,
        props.theme.colors.button.error.background.active,
        props.theme.colors.button.error.border.active
      )}
  }
`

const disabledBtnStyles = css`
  cursor: default;
  background-color: ${(props) =>
    props.theme.colors.background.tertiary} !important;
  border-color: ${(props) => props.theme.colors.border.secondary} !important;
  color: ${(props) => props.theme.colors.text.onDark} !important;
`

const miniBtnStyles = css`
  padding: 3px 16px;
  margin: 0 ${(props) => props.theme.grid.unit}px;
  line-height: 1;
`

const btnStyles = css<{
  danger?: boolean
  disabled?: boolean
  mini?: boolean
}>`
  align-items: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${(props) => props.theme.grid.radius.small};
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.medium} /
    ${(props) => props.theme.font.lineHeight.large}
    ${(props) => props.theme.font.family.sans};
  justify-content: center;
  outline: none;
  padding: 7px ${(props) => props.theme.grid.unit * 3}px;
  transition: border 0.1s, color 0.1s, background-color 0.1s, color 0.1s,
    filter 0.1s;
  vertical-align: middle;
  white-space: nowrap;

  svg + span {
    margin-left: ${(props) => props.theme.grid.unit}px;
  }

  ${(props) => props.danger && dangerBtnStyles}
  ${(props) => props.disabled && disabledBtnStyles}
  ${(props) => props.mini && miniBtnStyles}
`

const btnColors = (
  color?: string,
  bg?: string,
  border?: string,
  important?: boolean
) => `
    ${color && 'color: ' + color}
    ${important ? ' !important;' : ';'}
    ${bg && 'background-color: ' + bg}
    ${important ? ' !important;' : ';'}
    ${border && 'border-color: ' + border}
    ${important ? ' !important;' : ';'}
`

const ButtonTemplate = styled.button.attrs((props) => ({
  type: props.type || 'button',
}))`
  ${btnStyles}
`

export const SecondaryButton = styled(ButtonTemplate)`
  ${(props) =>
    btnColors(
      props.theme.colors.button.secondary.color.default,
      props.theme.colors.button.secondary.background.default,
      props.theme.colors.button.secondary.border.default,
      false
    )}

  &:not([disabled]):hover, &:not([disabled]):focus {
    ${(props) =>
      btnColors(
        props.theme.colors.button.secondary.color.hover,
        props.theme.colors.button.secondary.background.hover,
        props.theme.colors.button.secondary.border.hover,
        false
      )}
  }

  &:not([disabled]):active {
    ${(props) =>
      btnColors(
        props.theme.colors.button.secondary.color.active,
        props.theme.colors.button.secondary.background.active,
        props.theme.colors.button.secondary.border.active,
        false
      )}
  }
`

export const PrimaryButton = styled(ButtonTemplate)`
  ${(props) =>
    btnColors(
      props.theme.colors.button.primary.color.default,
      props.theme.colors.button.primary.background.default,
      props.theme.colors.button.primary.border.default,
      false
    )}

  &:not([disabled]):hover, &:not([disabled]):focus {
    ${(props) =>
      btnColors(
        props.theme.colors.button.primary.color.hover,
        props.theme.colors.button.primary.background.hover,
        props.theme.colors.button.primary.border.hover,
        false
      )}
  }

  &:not([disabled]):active {
    ${(props) =>
      btnColors(
        props.theme.colors.button.primary.color.active,
        props.theme.colors.button.primary.background.active,
        props.theme.colors.button.primary.border.active,
        false
      )}
  }
`

export const TertiaryButton = styled(ButtonTemplate)`
  ${(props) =>
    btnColors(
      props.theme.colors.button.default.color.default,
      props.theme.colors.button.default.background.default,
      props.theme.colors.button.default.border.default,
      false
    )}

  &:not([disabled]):hover, &:not([disabled]):focus {
    ${(props) =>
      btnColors(
        props.theme.colors.button.default.color.hover,
        props.theme.colors.button.default.background.hover,
        props.theme.colors.button.default.border.hover,
        false
      )}
  }

  &:not([disabled]):active {
    ${(props) =>
      btnColors(
        props.theme.colors.button.default.color.active,
        props.theme.colors.button.default.background.active,
        props.theme.colors.button.default.border.active,
        false
      )}
  }
`

export const IconTextButton = styled(ButtonTemplate)`
  border: none;
  color: ${(props) => props.theme.colors.text.primary};
  padding: 0;

  svg {
    max-height: 18px;
    max-width: 18px;
    margin-right: ${(props) => props.theme.grid.unit * 3}px;
  }
`

export const ToggleButton = styled(ButtonTemplate)<{
  selected?: boolean
}>`
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) =>
    props.selected ? props.theme.colors.background.fifth : 'transparent'};
  border-color: ${(props) =>
    props.selected
      ? props.theme.colors.border.primary
      : props.theme.colors.border.secondary};

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: ${(props) => props.theme.colors.background.fifth};

    svg {
      path[stroke] {
        stroke: ${(props) => props.theme.colors.brand.medium};
      }
      text[fill],
      rect[fill],
      path[fill] {
        fill: ${(props) => props.theme.colors.brand.medium};
      }
    }
  }

  svg {
    path[stroke] {
      stroke: ${(props) =>
        props.selected
          ? props.theme.colors.brand.medium
          : props.theme.colors.text.primary};
    }
    text[fill],
    rect[fill],
    path[fill] {
      fill: ${(props) =>
        props.selected
          ? props.theme.colors.brand.medium
          : props.theme.colors.text.primary};
    }
  }
`
export const ToggleButtonAlt = styled(ButtonTemplate)<{
  selected?: boolean
}>`
  color: ${(props) => props.theme.colors.text.primary};
  border-color: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  border-radius: 0;
  ${(props) =>
    props.selected && 'border-color: ' + props.theme.colors.border.info};

  font-size: ${(props) => props.theme.font.size.normal};
  padding: 0 ${(props) => props.theme.grid.unit}px;

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    border-color: ${(props) => props.theme.colors.border.info};
  }
`
const svgColors = css<{
  iconColor?: string
}>`
  svg {
    g[stroke] {
      stroke: currentColor;
    }
    path[fill] {
      fill: currentColor;
    }
  }

  svg {
    path[stroke] {
      stroke: ${(props) => props.iconColor || 'currentColor'};
    }
    text[fill],
    rect[fill],
    path[fill] {
      fill: ${(props) => props.iconColor || 'currentColor'};
    }
  }
`
const IconButtonTemplate = styled(ButtonTemplate)<{
  defaultColor?: boolean
  size?: number
  iconColor?: string
}>`
  padding: 0;
  height: ${(props) => props.size || 40}px;
  width: ${(props) => props.size || 40}px;

  ${(props) => !props.defaultColor && svgColors}
`

export const IconButton = styled(IconButtonTemplate)`
  ${(props) =>
    btnColors(
      props.theme.colors.text.primary,
      props.theme.colors.button.default.background.default,
      props.theme.colors.button.default.border.default,
      false
    )}

  &:not([disabled]):hover, &:not([disabled]):focus {
    ${(props) =>
      btnColors(
        props.theme.colors.brand.medium,
        'transparent',
        'transparent',
        false
      )}
  }

  &:not([disabled]):active {
    ${(props) =>
      btnColors(
        props.theme.colors.brand.default,
        'transparent',
        'transparent',
        false
      )}
  }
`

export const RoundIconButton = styled(IconButton).attrs((props) => ({
  defaultColor: true,
}))`
  background: ${(props) => props.theme.colors.background.primary};
  border: 5px solid ${(props) => props.theme.colors.background.primary} !important;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.12);
  display: inline-block;
  height: 40px;
  padding: 0;
  position: relative;
  width: 40px;

  transition: border-color 0.25s;

  &:focus,
  &:hover {
    background: ${(props) => props.theme.colors.background.fifth} !important;
  }

  svg {
    max-height: 16px;
    max-width: 16px;
    vertical-align: middle;
  }
`

export const SecondaryIconButton = styled(IconButton)`
  ${(props) =>
    btnColors(
      props.theme.colors.text.secondary,
      props.theme.colors.background.primary,
      'transparent',
      false
    )}

  &:not([disabled]):hover, &:not([disabled]):focus {
    ${(props) =>
      btnColors(
        props.theme.colors.text.secondary,
        props.theme.colors.background.fifth,
        'transparent',
        false
      )}
  }

  &:not([disabled]).active,
  &:not([disabled]):active {
    ${(props) =>
      btnColors(
        props.theme.colors.text.secondary,
        props.theme.colors.background.fifth,
        'transparent',
        false
      )}
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button:not(:first-child) {
    margin-left: ${(props) => props.theme.grid.unit}px;
  }
`
