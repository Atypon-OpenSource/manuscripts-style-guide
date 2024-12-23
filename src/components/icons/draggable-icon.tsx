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

const DraggableIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <path
      d="M14 4C14 5.10457 13.1046 6 12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4Z"
      fill="#6E6E6E"
    />
    <path
      d="M22 4C22 5.10457 21.1046 6 20 6C18.8954 6 18 5.10457 18 4C18 2.89543 18.8954 2 20 2C21.1046 2 22 2.89543 22 4Z"
      fill="#6E6E6E"
    />
    <path
      d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
      fill="#6E6E6E"
    />
    <path
      d="M22 12C22 13.1046 21.1046 14 20 14C18.8954 14 18 13.1046 18 12C18 10.8954 18.8954 10 20 10C21.1046 10 22 10.8954 22 12Z"
      fill="#6E6E6E"
    />
    <path
      d="M14 20C14 21.1046 13.1046 22 12 22C10.8954 22 10 21.1046 10 20C10 18.8954 10.8954 18 12 18C13.1046 18 14 18.8954 14 20Z"
      fill="#6E6E6E"
    />
    <path
      d="M14 28C14 29.1046 13.1046 30 12 30C10.8954 30 10 29.1046 10 28C10 26.8954 10.8954 26 12 26C13.1046 26 14 26.8954 14 28Z"
      fill="#6E6E6E"
    />
    <path
      d="M22 20C22 21.1046 21.1046 22 20 22C18.8954 22 18 21.1046 18 20C18 18.8954 18.8954 18 20 18C21.1046 18 22 18.8954 22 20Z"
      fill="#6E6E6E"
    />
    <path
      d="M22 28C22 29.1046 21.1046 30 20 30C18.8954 30 18 29.1046 18 28C18 26.8954 18.8954 26 20 26C21.1046 26 22 26.8954 22 28Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default DraggableIcon
