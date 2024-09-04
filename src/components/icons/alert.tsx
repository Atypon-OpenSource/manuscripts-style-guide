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

const AlertIcon: React.FC<IconProps> = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 12C2.68629 12 1.18852e-06 9.31371 1.47821e-06 6C1.7679e-06 2.68629 2.68629 1.39444e-07 6 4.29138e-07C9.31371 7.18831e-07 12 2.68629 12 6C12 9.31371 9.31371 12 6 12ZM6.74998 2.99996L6.75 6.37462C6.75 6.78819 6.41522 7.12243 6.00166 7.12334C5.58681 7.12426 5.25001 6.78821 5.25001 6.37335L5.25 3.00082C5.25 2.58629 5.58629 2.25037 6.00082 2.25083C6.4147 2.25128 6.74998 2.58607 6.74998 2.99996ZM6.75 8.99263C6.75 9.46884 6.47288 9.75 5.99853 9.75C5.52419 9.75 5.25 9.47179 5.25 8.99558C5.25 8.51937 5.52421 8.25 5.99855 8.25C6.47289 8.25 6.75 8.51642 6.75 8.99263Z"
      fill="#FE8F1F"
    />
  </svg>
)

export default AlertIcon
