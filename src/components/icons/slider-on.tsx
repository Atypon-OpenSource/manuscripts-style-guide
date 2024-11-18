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

import { IconProps } from './types'

const SliderOnIcon: React.FC<IconProps> = (props) => (
  <svg
    width="34"
    height="18"
    viewBox="0 0 34 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="34"
      y="18"
      width="34"
      height="18"
      rx="9"
      transform="rotate(180 34 18)"
      fill="#0D79D0"
    />
    <circle
      cx="25.125"
      cy="9"
      r="7.875"
      transform="rotate(180 25.125 9)"
      fill="white"
    />
  </svg>
)

export default SliderOnIcon
