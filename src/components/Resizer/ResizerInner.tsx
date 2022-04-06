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

const ResizerInner = styled.div`
  display: block;
  z-index: 2;
  overflow: visible;
  position: absolute;

  &::before {
    content: '';
    position: absolute;
    transition: background-color 200ms ease-in-out 100ms;
    background: rgb(240, 240, 240);
  }

  &:hover::before {
    background: #e2e2e2;
  }
`

const HorizontalResizerInner = styled(ResizerInner)`
  cursor: ew-resize;
  top: 0;
  height: 100%;
  width: 16px;

  &::before {
    height: 100%;
    width: 1px;
  }
`

export const HorizontalStartResizerInner = styled(HorizontalResizerInner)`
  left: -16px;

  &::before {
    right: -1px;
  }
`

export const HorizontalEndResizerInner = styled(HorizontalResizerInner)`
  right: -16px;

  &::before {
    left: -1px;
  }
`

const VerticalResizerInner = styled(ResizerInner)`
  cursor: ns-resize;
  left: 0;
  height: 16px;
  width: 100%;

  &::before {
    width: 100%;
    height: 1px;
  }
`

export const VerticalStartResizerInner = styled(VerticalResizerInner)`
  top: -16px;

  &::before {
    bottom: -1px;
  }
`

export const VerticalEndResizerInner = styled(VerticalResizerInner)`
  bottom: -16px;

  &::before {
    top: -1px;
  }
`
