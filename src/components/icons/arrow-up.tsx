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

const ArrowUpIcon: React.FC<IconProps> = (props) => (
  <svg
    width="9"
    height="5"
    viewBox="0 0 9 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.65627 4.769C1.23955 5.11006 0.607922 5.06866 0.24548 4.67652C-0.116961 4.28438 -0.0729634 3.69 0.343752 3.34894L4.43549 7.75526e-07L8.64031 3.29867C9.06452 3.63145 9.12172 4.22484 8.76807 4.62403C8.41443 5.02321 7.78385 5.07704 7.35965 4.74425L4.46297 2.47182L1.65627 4.769Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default ArrowUpIcon
