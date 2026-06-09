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
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DefaultTheme, StyledComponent } from 'styled-components'

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
    [side in ResizerSide]: StyledComponent<'div', DefaultTheme, object, never>
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

interface ResizerProps {
  collapsed: boolean
  direction: ResizerDirection
  onResize: (resizeDelta: number) => void
  onResizeButton: () => void
  onResizeEnd: (resizeDelta: number) => void
  side: ResizerSide
  buttonInner?: React.ComponentType<ResizerButtonInnerProps>
}

const DISABLE_RESIZE_NODE_NAMES = new Set<string | null>([
  'IFRAME',
  'HTML',
  null,
])

const OUT_OF_BOUNDS_OFFSET = 32

export const Resizer: React.FC<ResizerProps> = ({
  collapsed,
  direction,
  onResize,
  onResizeButton,
  onResizeEnd,
  side,
  buttonInner,
}) => {
  const resizerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  const isResizingRef = useRef(false)
  const startPositionRef = useRef(0)
  const cleanupRef = useRef<(() => void) | null>(null)

  const onResizeRef = useRef(onResize)
  const onResizeButtonRef = useRef(onResizeButton)
  const onResizeEndRef = useRef(onResizeEnd)
  const directionRef = useRef(direction)
  const sideRef = useRef(side)

  useEffect(() => {
    onResizeRef.current = onResize
    onResizeButtonRef.current = onResizeButton
    onResizeEndRef.current = onResizeEnd
    directionRef.current = direction
    sideRef.current = side
  }, [onResize, onResizeButton, onResizeEnd, direction, side])

  const getPosition = useCallback(
    (e: MouseEvent | React.MouseEvent) =>
      directionRef.current === 'row' ? e.screenX : e.screenY,
    []
  )

  const getDelta = useCallback((position: number) => {
    return sideRef.current === 'end'
      ? position - startPositionRef.current
      : startPositionRef.current - position
  }, [])

  const detachListeners = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current()
      cleanupRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => detachListeners()
  }, [detachListeners])

  const mouseUpHandler = useCallback(
    (e: MouseEvent, outOfBounds = false) => {
      detachListeners()
      isResizingRef.current = false

      const position = getPosition(e)
      const adjustedPosition = outOfBounds
        ? position - OUT_OF_BOUNDS_OFFSET
        : position
      const delta = getDelta(adjustedPosition)

      if (delta === 0) {
        onResizeButtonRef.current()
      }

      onResizeRef.current(delta)
      onResizeEndRef.current(delta)
    },
    [detachListeners, getPosition, getDelta]
  )

  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (isResizingRef.current) {
        const delta = getDelta(getPosition(e))
        if (delta) {
          onResizeRef.current(delta)
        }
      }
    },
    [getPosition, getDelta]
  )

  const handleOutOfBounds = useCallback(
    (e: MouseEvent) => {
      if (
        isResizingRef.current &&
        DISABLE_RESIZE_NODE_NAMES.has(
          e.relatedTarget ? (e.relatedTarget as Node).nodeName : null
        )
      ) {
        mouseUpHandler(e, true)
      }
    },
    [mouseUpHandler]
  )

  const mouseDownHandler: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.preventDefault()

      if (!resizerRef.current || e.target !== resizerRef.current) {
        return
      }

      if (isResizingRef.current) {
        return
      }

      isResizingRef.current = true
      startPositionRef.current = getPosition(e)

      window.addEventListener('mousemove', mouseMoveHandler)
      window.addEventListener('mouseup', mouseUpHandler)
      window.addEventListener('mouseout', handleOutOfBounds)

      cleanupRef.current = () => {
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('mouseup', mouseUpHandler)
        window.removeEventListener('mouseout', handleOutOfBounds)
      }
    },
    [getPosition, mouseMoveHandler, mouseUpHandler, handleOutOfBounds]
  )

  const ResizerInner = inners[direction][side]

  return (
    <ResizerInner
      ref={resizerRef}
      onMouseDown={mouseDownHandler}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
