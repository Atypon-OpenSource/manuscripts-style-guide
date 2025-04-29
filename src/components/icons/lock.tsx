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

const LockIcon: React.FC<IconProps> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.5 8C2.5 7.17158 3.17157 6.5 4 6.5H12C12.8284 6.5 13.5 7.17158 13.5 8V14C13.5 14.8284 12.8284 15.5 12 15.5H4C3.17157 15.5 2.5 14.8284 2.5 14V8ZM4 7.5C3.72386 7.5 3.5 7.72386 3.5 8V14C3.5 14.2761 3.72386 14.5 4 14.5H12C12.2761 14.5 12.5 14.2761 12.5 14V8C12.5 7.72386 12.2761 7.5 12 7.5H4Z"
      fill="#6E6E6E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.5 6.75V4.5C10.5 3.11929 9.38071 2 8 2C6.61929 2 5.5 3.11929 5.5 4.5V7C5.5 7.27614 5.27614 7.5 5 7.5C4.72386 7.5 4.5 7.27614 4.5 7V4.5C4.5 2.567 6.067 1 8 1C9.933 1 11.5 2.567 11.5 4.5V6.75C11.5 7.02614 11.2761 7.25 11 7.25C10.7239 7.25 10.5 7.02614 10.5 6.75Z"
      fill="#6E6E6E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 10.5C8.27614 10.5 8.5 10.7239 8.5 11V13C8.5 13.2761 8.27614 13.5 8 13.5C7.72386 13.5 7.5 13.2761 7.5 13V11C7.5 10.7239 7.72386 10.5 8 10.5Z"
      fill="#6E6E6E"
    />
    <path
      d="M9.5 10.5C9.5 11.3284 8.82843 12 8 12C7.17157 12 6.5 11.3284 6.5 10.5C6.5 9.67158 7.17157 9 8 9C8.82843 9 9.5 9.67158 9.5 10.5Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default LockIcon
