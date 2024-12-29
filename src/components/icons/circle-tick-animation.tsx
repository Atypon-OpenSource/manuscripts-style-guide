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

// Animations
const fillCircle = keyframes`
  from {
    stroke-dashoffset: 283;
  }
  to {
    stroke-dashoffset: 0;
  }
`

const Svg = styled.svg`
  position: absolute;
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

const Circle = styled.circle<{ color?: string }>`
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  animation: ${fillCircle} 2s linear forwards;
  stroke: ${(props) => props.color || '#4CAF50'};
  fill: none;
  transform-origin: center;
  transform: rotate(-90deg);
`

const Tick = styled.polyline<{ color?: string }>`
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: ${drawTick} 1s ease-in-out 2s forwards;
  stroke: ${(props) => props.color || '#4CAF50'};
  fill: none;
  stroke-width: 5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
`

interface CircleTickAnimationProps {
  size: number
  color?: string
}

const CircleTickAnimation: React.FC<CircleTickAnimationProps> = ({
  color,
  size,
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle border */}
      <Circle cx="50" cy="50" r="45" strokeWidth="5" color={color} />

      {/* Tick */}
      <Tick points="30,50 45,65 70,40" color={color} />
    </Svg>
  )
}

export default CircleTickAnimation
