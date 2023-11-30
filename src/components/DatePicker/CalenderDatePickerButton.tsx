/*!
 * © 2023 Atypon Systems LLC
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
import AttentionOrange from '@manuscripts/assets/react/AttentionOrange'
import AttentionRed from '@manuscripts/assets/react/AttentionRed'
import { format } from 'date-fns'
import React, { RefObject } from 'react'
import { RenderInputProps } from 'react-modern-calendar-datepicker'
import ReactTooltip from 'react-tooltip'
import styled, { css } from 'styled-components'

import { IconTextButton } from '../Button'
import { SubmissionCriticality } from '../SubmissionInspector/types'

export type { RenderInputProps }
export type CalenderDatePickerButtonProps = {
  id: string
  criticality: SubmissionCriticality
  disabled?: boolean
  disableToolTip?: boolean
  tooltip?: string
  dateFormat?: string
  dueDate: Date
  alert?: 'warning' | 'danger'
}

export const CalenderDatePickerButton = React.forwardRef<
  HTMLElement,
  CalenderDatePickerButtonProps
>(
  (
    {
      id,
      criticality,
      disabled,
      disableToolTip,
      dueDate,
      dateFormat = 'd MMM, EEEE',
      alert,
      tooltip,
    },
    ref
  ) => {
    return (
      <Container>
        <div data-tip={true} data-for={id}>
          <DateButton
            ref={ref as RefObject<HTMLButtonElement>}
            criticality={criticality}
            disabled={disabled}
          >
            {format(dueDate, dateFormat)}
            {alert === 'warning' && <AttentionOrange />}
            {alert === 'danger' && <AttentionRed />}
          </DateButton>
        </div>
        {tooltip && (
          <ReactTooltip
            id={id}
            place="bottom"
            effect="solid"
            offset={{ top: 10 }}
            className="tooltip"
            disable={disableToolTip}
          >
            {tooltip}
          </ReactTooltip>
        )}
      </Container>
    )
  }
)

const DateButton = styled(IconTextButton)<{
  criticality: SubmissionCriticality
}>`
  border: 1px solid ${(props) => props.theme.colors.border.secondary}!important;
  box-sizing: border-box;
  border-radius: 6px;
  font-weight: ${(props) => props.theme.font.weight.normal};
  font-size: ${(props) => props.theme.font.size.normal};
  line-height: ${(props) => props.theme.font.lineHeight.large};
  color: ${(props) =>
    props.criticality === SubmissionCriticality.OVERDUE &&
    props.theme.colors.text.error}!important;
  width: 100%;
  height: ${(props) => props.theme.grid.unit * 7.5}px;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.grid.unit * 2}px 0
    ${(props) => props.theme.grid.unit * 4}px;

  ${(props) => props.disabled && disabledStyle}

  &:focus {
    border-color: ${(props) => props.theme.colors.border.field.hover}!important;
    background-color: ${(props) => props.theme.colors.background.fifth};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.background.fifth};
  }

  svg {
    margin-right: 0;
  }
`

const disabledStyle = css`
  background-color: ${(props) =>
    props.theme.colors.background.secondary} !important;
  color: ${(props) => props.theme.colors.text.secondary} !important;
`

const Container = styled.div`
  .tooltip {
    border-radius: 6px;
    padding: ${(props) => props.theme.grid.unit * 2}px;
  }
`
