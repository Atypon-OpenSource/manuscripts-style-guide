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

const AffiliationIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M13.65 4.50004C13.65 5.41131 12.9113 6.15004 12 6.15004C11.0888 6.15004 10.35 5.41131 10.35 4.50004C10.35 3.58877 11.0888 2.85004 12 2.85004C12.9113 2.85004 13.65 3.58877 13.65 4.50004Z"
      fill="#6E6E6E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 19.5C0.675 19.5 0 20.175 0 21V22.5C0 23.325 0.675 24 1.5 24H22.5C23.325 24 24 23.325 24 22.5V21C24 20.175 23.325 19.5 22.5 19.5V9C23.325 9 24 8.325 24 7.5V6C24 5.4 23.625 4.875 23.1 4.65L12.6 0.15C12.45 0.075 12.225 0 12 0C11.775 0 11.625 0 11.4 0.075L0.9 4.575C0.375 4.875 0 5.4 0 6V7.5C0 8.325 0.675 9 1.5 9V19.5ZM22.5 6L12 1.5L1.5 6V7.5H22.5V6ZM4.5 9H3V19.5H4.5V9ZM6 19.5H9.75V9H6V19.5ZM1.5 21V22.5H22.5V21H1.5ZM12.75 9V19.5H11.25V9H12.75ZM14.25 19.5H18V9H14.25V19.5ZM21 19.5H19.5V9H21V19.5Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default AffiliationIcon
