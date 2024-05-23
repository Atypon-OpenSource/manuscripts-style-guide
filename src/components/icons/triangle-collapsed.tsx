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

const TriangleCollapsedIcon: React.FC<IconProps> = (props) => (
  <svg
    width="5"
    height="8"
    viewBox="0 0 5 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M-3.08712e-07 0.9375L0.9375 -4.09794e-08L4.9375 4L0.9375 8L-4.09794e-08 7.0625L3.0625 4L-3.08712e-07 0.9375Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default TriangleCollapsedIcon
