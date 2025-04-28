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
import React, { useCallback, useState } from 'react'
import { IStyledComponent } from 'styled-components'

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
  [direction in ResizerDirection]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [side in ResizerSide]: IStyledComponent<'web', any>
  }
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

export const Resizer: React.FC<Props> = ({
  buttonInner,
  direction,
  side,
  collapsed,
  onResize,
  onResizeButton,
  onResizeEnd,
}) => {
  const resizerRef = React.useRef<HTMLDivElement | null>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [startPosition, setStartPosition] = useState(0)

  const getPosition = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      return direction === 'row' ? e.screenX : e.screenY
    },
    [direction]
  )

  const getDelta = useCallback(
    (delta: number) => {
      return side === 'end' ? delta - startPosition : startPosition - delta
    },
    [side, startPosition]
  )

  const scheduleResize = useCallback(
    (delta: number) => {
      if (isResizing && delta) {
        onResize(delta)
      }
    },
    [isResizing, onResize]
  )

  const mouseUpHandler = useCallback(
    (e: MouseEvent, outOfBounds = false) => {
      window.removeEventListener('mousemove', mouseMoveHandler)
      window.removeEventListener('mouseup', mouseUpHandler)
      window.removeEventListener('mouseout', handleOutofBounds)

      setIsResizing(false)

      const position = getPosition(e)

      // If we have gone out of bounds, reduce the nav width so the resizer is still visible
      const adjustedPosition = outOfBounds ? position - 32 : position

      const delta = getDelta(adjustedPosition)

      if (delta === 0) {
        onResizeButton() // click
      }

      // Perform one final resize before ending
      onResize(delta)
      onResizeEnd(delta)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getPosition, getDelta, onResize, onResizeButton, onResizeEnd]
  )

  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      const position = getPosition(e)
      const delta = getDelta(position)
      scheduleResize(delta)
    },
    [getPosition, getDelta, scheduleResize]
  )

  const handleOutofBounds = useCallback(
    (e: MouseEvent) => {
      const disableResizeNodes = [
        'IFRAME', // Moving into an iframe
        'HTML', // Moving out of an iframe or root window - Safari
        null, // Moving out of an iframe or root window - Other browsers
      ]

      if (
        isResizing &&
        disableResizeNodes.includes(
          e.relatedTarget && (e.relatedTarget as Node).nodeName
        )
      ) {
        mouseUpHandler(e, true)
      }
    },
    [isResizing, mouseUpHandler]
  )

  const mouseDownHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault()

      if (!resizerRef.current || e.target !== resizerRef.current) {
        return
      }

      if (isResizing) {
        return
      }

      setIsResizing(true)
      setStartPosition(getPosition(e))

      window.addEventListener('mousemove', mouseMoveHandler)
      window.addEventListener('mouseup', mouseUpHandler)
      window.addEventListener('mouseout', handleOutofBounds)
    },
    [
      isResizing,
      getPosition,
      mouseMoveHandler,
      mouseUpHandler,
      handleOutofBounds,
    ]
  )

  const mouseEnterHandler = useCallback(() => {
    setIsHovering(true)
  }, [])

  const mouseLeaveHandler = useCallback(() => {
    setIsHovering(false)
  }, [])

  const ResizerInner = inners[direction][side]

  return (
    <ResizerInner
      ref={resizerRef}
      onMouseDown={mouseDownHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <ResizerButton
        direction={direction}
        isCollapsed={collapsed}
        isVisible={isHovering}
        onClick={onResizeButton}
        side={side}
        buttonInner={buttonInner}
      />
    </ResizerInner>
  )
}

Resizer.displayName = 'Resizer'
