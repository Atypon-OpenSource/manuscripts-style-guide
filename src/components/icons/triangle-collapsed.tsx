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
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.731 5.65627C5.38994 5.23955 5.43134 4.60792 5.82348 4.24548C6.21562 3.88304 6.81 3.92704 7.15106 4.34375L10.5 8.43549L7.20134 12.6403C6.86855 13.0645 6.27516 13.1217 5.87597 12.7681C5.47679 12.4144 5.42296 11.7839 5.75575 11.3596L8.02818 8.46297L5.731 5.65627Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default TriangleCollapsedIcon
