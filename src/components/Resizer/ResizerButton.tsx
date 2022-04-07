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
import { AnyStyledComponent } from 'styled-components'

import {
  HorizontalEndResizerButtonInner,
  HorizontalStartResizerButtonInner,
  ResizerButtonInnerProps,
  VerticalEndResizerButtonInner,
  VerticalStartResizerButtonInner,
} from './ResizerButtonInner'
import { ResizerDirection, ResizerSide } from './types'

type Inners = {
  [direction in ResizerDirection]: { [side in ResizerSide]: AnyStyledComponent }
}

const inners: Inners = {
  column: {
    end: VerticalEndResizerButtonInner,
    start: VerticalStartResizerButtonInner,
  },
  row: {
    end: HorizontalEndResizerButtonInner,
    start: HorizontalStartResizerButtonInner,
  },
}

interface Props extends React.HTMLProps<HTMLButtonElement> {
  direction: ResizerDirection
  isCollapsed: boolean
  isVisible: boolean
  side: ResizerSide
  buttonInner?: React.ComponentType<ResizerButtonInnerProps>
}

export class ResizerButton extends React.PureComponent<Props> {
  public static defaultProps = {
    isCollapsed: false,
    isVisible: false,
  }

  public render() {
    const { buttonInner, direction, side, isCollapsed, onClick, isVisible } =
      this.props

    const ResizerButtonInner = buttonInner || inners[direction][side]

    return (
      <ResizerButtonInner
        aria-expanded={!isCollapsed}
        isCollapsed={isCollapsed}
        isVisible={isVisible}
        onClick={onClick}
        onMouseDown={(event: MouseEvent) => event.preventDefault()}
      />
    )
  }
}
