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

import { ResizerButton } from './ResizerButton'
import { ResizerButtonInnerProps } from './ResizerButtonInner'
import {
  HorizontalEndResizerInner,
  HorizontalStartResizerInner,
  VerticalEndResizerInner,
  VerticalStartResizerInner,
} from './ResizerInner'
import { ResizerDirection, ResizerSide } from './types'

type Inners = {
  [direction in ResizerDirection]: { [side in ResizerSide]: AnyStyledComponent }
}

const inners: Inners = {
  column: {
    end: VerticalEndResizerInner,
    start: VerticalStartResizerInner,
  },
  row: {
    end: HorizontalEndResizerInner,
    start: HorizontalStartResizerInner,
  },
}

interface Props {
  collapsed: boolean
  direction: ResizerDirection
  onResize: (resizeDelta: number) => void
  onResizeButton: () => void
  onResizeEnd: (resizeDelta: number) => void
  side: ResizerSide
  buttonInner?: React.ComponentType<ResizerButtonInnerProps>
}

interface State {
  isHovering: boolean
  isResizing: boolean
  startPosition: number
}

export class Resizer extends React.Component<Props, State> {
  public resizerRef: React.RefObject<HTMLDivElement | null> = React.createRef()

  public state = {
    isHovering: false,
    isResizing: false,
    startPosition: 0,
  }

  public render() {
    const { buttonInner, direction, side } = this.props

    const ResizerInner = inners[direction][side]

    return (
      <ResizerInner
        // @ts-ignore: styled
        ref={this.resizerRef}
        onMouseDown={this.mouseDownHandler}
        onMouseEnter={this.mouseEnterHandler}
        onMouseLeave={this.mouseLeaveHandler}
      >
        <ResizerButton
          direction={direction}
          isCollapsed={this.props.collapsed}
          isVisible={this.state.isHovering}
          onClick={this.props.onResizeButton}
          side={side}
          buttonInner={buttonInner}
        />
      </ResizerInner>
    )
  }

  private scheduleResize = (delta: number) => {
    if (this.state.isResizing && delta) {
      this.props.onResize(delta)
    }
  }

  private mouseDownHandler: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()

    if (!this.resizerRef.current || e.target !== this.resizerRef.current) {
      return
    }

    if (this.state.isResizing) {
      return
    }

    this.setState({
      isResizing: true,
      startPosition: this.getPosition(e),
    })

    window.addEventListener('mousemove', this.mouseMoveHandler)
    window.addEventListener('mouseup', this.mouseUpHandler)
    window.addEventListener('mouseout', this.handleOutofBounds)
  }

  private mouseUpHandler = (e: MouseEvent, outOfBounds = false) => {
    window.removeEventListener('mousemove', this.mouseMoveHandler)
    window.removeEventListener('mouseup', this.mouseUpHandler)
    window.removeEventListener('mouseout', this.handleOutofBounds)

    this.setState({
      isResizing: false,
    })

    const position = this.getPosition(e)

    // If we have gone out of bounds, reduce the nav width so the resizer is still visible
    const adjustedPosition = outOfBounds ? position - 32 : position

    const delta = this.getDelta(adjustedPosition)

    if (delta === 0) {
      this.props.onResizeButton() // click
    }

    // Perform one final resize before ending
    this.props.onResize(delta)

    this.props.onResizeEnd(delta)
  }

  private mouseMoveHandler = (e: MouseEvent) => {
    const position = this.getPosition(e)
    const delta = this.getDelta(position)

    this.scheduleResize(delta)
  }

  private mouseEnterHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      isHovering: true,
    })
  }

  private mouseLeaveHandler: React.MouseEventHandler<HTMLDivElement> = () => {
    this.setState({
      isHovering: false,
    })
  }

  // Handle when mouse moves over an element that won't fire mouse events.
  // Fires a mouseup immediately to prevent mouseup not being fired at all.
  private handleOutofBounds = (e: MouseEvent) => {
    const disableResizeNodes = [
      'IFRAME', // Moving into an iframe
      'HTML', // Moving out of an iframe or root window - Safari
      null, // Moving out of an iframe or root window - Other browsers
    ]

    if (
      this.state.isResizing &&
      disableResizeNodes.includes(
        e.relatedTarget && (e.relatedTarget as Node).nodeName
      )
    ) {
      this.mouseUpHandler(e, true)
    }
  }

  private getDelta = (delta: number) => {
    const { startPosition } = this.state

    return this.props.side === 'end'
      ? delta - startPosition
      : startPosition - delta
  }

  private getPosition = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    return this.props.direction === 'row' ? e.screenX : e.screenY
  }
}
