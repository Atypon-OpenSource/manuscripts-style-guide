/*!
 * © 2025 Atypon Systems LLC
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

const SupplementsIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="13"
    viewBox="0 0 11 13"
    fill="none"
    {...props}
  >
    <path
      d="M5.83594 0.75C6.29734 0.75 6.73768 0.932179 7.06445 1.25488L9.72949 3.88672C10.0624 4.21544 10.2499 4.66403 10.25 5.13184V10.5C10.25 11.4665 9.4665 12.25 8.5 12.25H2.5C1.5335 12.25 0.75 11.4665 0.75 10.5V2.5C0.75 1.53371 1.5333 0.75 2.5 0.75H5.83594Z"
      stroke="#6E6E6E"
      strokeWidth="1.5"
    />
    <path d="M6.1665 1.5V5.07143H9.49984" stroke="#6E6E6E" strokeWidth="1.5" />
  </svg>
)

export default SupplementsIcon
