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

const ArrowDownIcon: React.FC<IconProps> = (props) => (
  <svg
    width="9"
    height="6"
    viewBox="0 0 9 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.34373 0.731003C7.76045 0.389937 8.39208 0.43134 8.75452 0.823479C9.11696 1.21562 9.07296 1.81 8.65625 2.15106L4.56451 5.5L0.35969 2.20134C-0.0645159 1.86855 -0.121718 1.27516 0.231927 0.875976C0.585572 0.476788 1.21615 0.42296 1.64035 0.755748L4.53703 3.02818L7.34373 0.731003Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default ArrowDownIcon
