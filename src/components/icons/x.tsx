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

export const XIcon = (props: IconProps) => (
  <svg
    width={30}
    height={30}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.34921 12.4923C3.01447 12.1576 3.01447 11.6187 3.34921 11.2839L12.7654 
        1.86772C13.1001 1.53298 13.639 1.53298 13.9738 1.86772C14.3085 2.20246 
        14.3085 2.74135 13.9738 3.07609L4.55758 12.4923C4.22284 12.8271 3.68395 
        12.8271 3.34921 12.4923Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.34921 1.86667C3.01447 2.20141 3.01447 2.74029 3.34921 3.07503L12.7654 
        12.4913C13.1001 12.826 13.639 12.826 13.9738 12.4913C14.3085 12.1565 
        14.3085 11.6176 13.9738 11.2829L4.55758 1.86667C4.22284 1.53193 3.68395 
        1.53193 3.34921 1.86667Z"
    />
  </svg>
)

export default XIcon
