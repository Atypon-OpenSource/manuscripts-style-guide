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

const AttentionBlueIcon: React.FC<IconProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_62_49)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.201 17.799 1.5 12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 17.799 6.2 22.5 12 22.5ZM12 24C18.627 24 24 18.627 24 12C24 5.373 18.627 0 12 0C5.373 0 0 5.373 0 12C0 18.627 5.372 24 12 24ZM12 8C11.7348 8 11.4804 7.89464 11.2929 7.70711C11.1054 7.51957 11 7.26522 11 7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7C13 7.26522 12.8946 7.51957 12.7071 7.70711C12.5196 7.89464 12.2652 8 12 8ZM12.02 18.2C11.7813 18.2 11.5524 18.1052 11.3836 17.9364C11.2148 17.7676 11.12 17.5387 11.12 17.3V10.1C11.12 9.86131 11.2148 9.63239 11.3836 9.4636C11.5524 9.29482 11.7813 9.2 12.02 9.2C12.2587 9.2 12.4876 9.29482 12.6564 9.4636C12.8252 9.63239 12.92 9.86131 12.92 10.1V17.3C12.92 17.5387 12.8252 17.7676 12.6564 17.9364C12.4876 18.1052 12.2587 18.2 12.02 18.2Z"
        fill="#1A9BC7"
      />
    </g>
    <defs>
      <clipPath id="clip0_62_49">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default AttentionBlueIcon
