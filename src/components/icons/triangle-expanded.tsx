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

const TriangleExpandedIcon: React.FC<IconProps> = (props) => (
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
      d="M10.8437 6.231C11.2604 5.88994 11.8921 5.93134 12.2545 6.32348C12.617 6.71562 12.573 7.31 12.1562 7.65106L8.06451 11L3.85969 7.70134C3.43548 7.36855 3.37828 6.77516 3.73193 6.37598C4.08557 5.97679 4.71615 5.92296 5.14035 6.25575L8.03703 8.52818L10.8437 6.231Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default TriangleExpandedIcon
