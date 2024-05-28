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

const AttentionRedIcon: React.FC<IconProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_62_44)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.5C17.799 1.5 22.5 6.201 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.201 22.5 1.5 17.799 1.5 12C1.5 6.201 6.2 1.5 12 1.5ZM12 0C18.627 0 24 5.373 24 12C24 18.627 18.627 24 12 24C5.373 24 0 18.627 0 12C0 5.373 5.372 0 12 0ZM12 16.2C11.7348 16.2 11.4804 16.3054 11.2929 16.4929C11.1054 16.6804 11 16.9348 11 17.2C11 17.4652 11.1054 17.7196 11.2929 17.9071C11.4804 18.0946 11.7348 18.2 12 18.2C12.2652 18.2 12.5196 18.0946 12.7071 17.9071C12.8946 17.7196 13 17.4652 13 17.2C13 16.9348 12.8946 16.6804 12.7071 16.4929C12.5196 16.3054 12.2652 16.2 12 16.2ZM12.02 6C11.7813 6 11.5524 6.09482 11.3836 6.2636C11.2148 6.43239 11.12 6.66131 11.12 6.9V14.1C11.12 14.3387 11.2148 14.5676 11.3836 14.7364C11.5524 14.9052 11.7813 15 12.02 15C12.2587 15 12.4876 14.9052 12.6564 14.7364C12.8252 14.5676 12.92 14.3387 12.92 14.1V6.9C12.92 6.66131 12.8252 6.43239 12.6564 6.2636C12.4876 6.09482 12.2587 6 12.02 6Z"
        fill="#F35143"
      />
    </g>
    <defs>
      <clipPath id="clip0_62_44">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default AttentionRedIcon
