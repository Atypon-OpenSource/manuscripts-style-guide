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
import styled from 'styled-components'

const gridSize = 8
const resizerVisibleSize = 2

const toggleButtonDepth = gridSize * 4.5
const toggleArrowDepth = gridSize * 2
const toggleArrowSize = 2
const toggleArrowStartOffset = (toggleButtonDepth - toggleArrowDepth) / 2
const toggleArrowEndOffset =
  toggleArrowStartOffset - toggleArrowSize + toggleArrowDepth / 2
const opacityTransition = `opacity 200ms ease-in-out 100ms`
const transformTransition = `transform 100ms ease-in-out`

export interface ResizerButtonInnerProps {
  isCollapsed: boolean
  isVisible: boolean
}

const ResizerButtonInner = styled.button<ResizerButtonInnerProps>`
  position: relative;
  background: none;
  border: none;
  color: transparent;
  cursor: pointer;

  &:focus {
    outline: 1px solid blue;
  }

  &::before,
  &::after {
    content: '';
    background-color: #ddd;
    border-radius: ${toggleArrowDepth}px;
    position: absolute;
    opacity: ${(props) => (props.isVisible ? 1 : 0.5)};
    transition: ${transformTransition}, ${opacityTransition};
  }

  &::before {
    transform-origin: ${toggleArrowSize / 2}px
      ${toggleArrowDepth / 2 - toggleArrowSize / 2}px;
  }

  &::after {
    transform-origin: ${toggleArrowSize / 2}px ${toggleArrowSize / 2}px;
  }

  &:hover,
  &:focus {
    &::before,
    &::after {
      background-color: #2a6f9d;
      opacity: 1;
    }
  }
`

const HorizontalResizerButtonInner = styled(ResizerButtonInner)`
  top: calc(50% - ${toggleButtonDepth / 2}px);
  width: ${gridSize * 3}px;
  height: ${toggleButtonDepth}px;

  &::before,
  &::after {
    width: ${toggleArrowSize}px;
    height: ${toggleArrowDepth / 2}px;
    transform: rotate(0deg);
  }

  &::before {
    top: ${toggleArrowStartOffset}px;
  }

  &::after {
    top: ${toggleArrowEndOffset}px;
  }
`

export const HorizontalEndResizerButtonInner = styled(
  HorizontalResizerButtonInner
)`
  left: -${resizerVisibleSize / 2}px;

  &::before,
  &::after {
    left: 8px;
  }

  &:hover,
  &:focus {
    &::before {
      transform: rotate(${(props) => (props.isCollapsed ? '-40deg' : '40deg')});
    }
    &::after {
      transform: rotate(${(props) => (props.isCollapsed ? '40deg' : '-40deg')});
    }
  }
`

export const HorizontalStartResizerButtonInner = styled(
  HorizontalResizerButtonInner
)`
  right: -${resizerVisibleSize / 2}px;

  &::before,
  &::after {
    right: 16px;
  }

  &:hover,
  &:focus {
    &::before {
      transform: rotate(${(props) => (props.isCollapsed ? '40deg' : '-40deg')});
    }
    &::after {
      transform: rotate(${(props) => (props.isCollapsed ? '-40deg' : '40deg')});
    }
  }
`

const VerticalResizerButtonInner = styled(ResizerButtonInner)`
  left: calc(50% - ${toggleButtonDepth / 2}px);
  width: ${toggleButtonDepth}px;
  height: ${gridSize * 3}px;

  &::before,
  &::after {
    width: ${toggleArrowDepth / 2}px;
    height: ${toggleArrowSize}px;
  }

  &::before {
    left: ${toggleArrowStartOffset}px;
  }

  &::after {
    left: ${toggleArrowEndOffset}px;
  }
`

export const VerticalEndResizerButtonInner = styled(VerticalResizerButtonInner)`
  bottom: -${resizerVisibleSize / 2}px;

  &::before,
  &::after {
    bottom: 8px;
    transform-origin: top center;
  }

  &:hover,
  &:focus {
    &::before {
      transform: rotate(${(props) => (props.isCollapsed ? '40deg' : '-40deg')});
    }
    &::after {
      transform: rotate(${(props) => (props.isCollapsed ? '-40deg' : '40deg')});
    }
  }
`

export const VerticalStartResizerButtonInner = styled(
  VerticalResizerButtonInner
)`
  top: -${resizerVisibleSize / 2}px;

  &::before,
  &::after {
    top: 8px;
    transform: rotate(270deg);
    transform-origin: bottom center;
  }

  &:hover,
  &:focus {
    &::before {
      transform: rotate(${(props) => (props.isCollapsed ? '-40deg' : '40deg')});
    }
    &::after {
      transform: rotate(${(props) => (props.isCollapsed ? '40deg' : '-40deg')});
    }
  }
`
