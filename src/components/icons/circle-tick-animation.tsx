/*!
 * © 2024 Atypon Systems LLC
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
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const fillCircle = keyframes`
  from {
    stroke-dashoffset: 283;
  }
  to {
    stroke-dashoffset: 0;
  }
`

const drawTick = keyframes`
  from {
    stroke-dasharray: 0 100;
    opacity: 0;
  }
  to {
    stroke-dasharray: 100 0;
    opacity: 1;
  }
`

const Svg = styled.svg`
  position: absolute;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease-out forwards;

  @keyframes autoFadeOut {
    0%,
    90% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }
  animation: ${fadeIn} 0.3s ease-out forwards,
    autoFadeOut 3s ease-in-out forwards;
`

const Circle = styled.circle`
  stroke-dasharray: 283;
  stroke: #4caf50;
  fill: none;
  transform-origin: center;
  transform: rotate(-90deg);
  animation: ${fillCircle} 2s linear forwards;
`

const Tick = styled.polyline`
  animation: ${drawTick} 1s ease-in-out 1s forwards;
  stroke: #4caf50;
  fill: none;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
`

interface CircleTickAnimationProps {
  size: number
  style?: React.CSSProperties
}

const CircleTickAnimation: React.FC<CircleTickAnimationProps> = ({
  size,
  style,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <Circle cx="50" cy="50" r="45" strokeWidth="5" />
      <Tick points="30,50 45,65 70,40" />
    </Svg>
  )
}

export default CircleTickAnimation
