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

const ToolbarIndentIcon: React.FC<IconProps> = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line
      x1="13"
      y1="6.5"
      x2="20"
      y2="6.5"
      stroke="#6E6E6E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="13"
      y1="10.25"
      x2="20"
      y2="10.25"
      stroke="#6E6E6E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="13"
      y1="14"
      x2="20"
      y2="14"
      stroke="#6E6E6E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="5.5"
      y1="17.75"
      x2="20"
      y2="17.75"
      stroke="#6E6E6E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.35742 10.5002C8.35742 11.3878 7.98843 12.1074 7.53325 12.1074L3.82445 12.1074C3.36927 12.1074 3.00028 11.3878 3.00028 10.5002C3.00028 9.61261 3.36927 8.89307 3.82445 8.89307L7.53325 8.89307C7.98843 8.89307 8.35742 9.61261 8.35742 10.5002Z"
      fill="#6E6E6E"
    />
    <path
      d="M9.94931 10.3645C10.0169 10.4325 10.0169 10.5675 9.94931 10.6355L6.88351 13.7199C6.85861 13.7449 6.84202 13.7484 6.83586 13.7494C6.827 13.7508 6.81287 13.7502 6.79482 13.7416C6.76137 13.7257 6.71429 13.6808 6.71429 13.5844L6.71429 7.41561C6.71429 7.31919 6.76137 7.27433 6.79482 7.25839C6.81287 7.24979 6.827 7.2492 6.83586 7.25059C6.84202 7.25156 6.85861 7.25508 6.88351 7.28013L9.94931 10.3645Z"
      fill="#6E6E6E"
      stroke="#6E6E6E"
    />
  </svg>
)

export default ToolbarIndentIcon
