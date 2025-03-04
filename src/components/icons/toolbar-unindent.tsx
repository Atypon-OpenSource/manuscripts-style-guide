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

const ToolbarUnindentIcon: React.FC<IconProps> = (props) => (
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
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="13"
      y1="10.25"
      x2="20"
      y2="10.25"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="13"
      y1="14"
      x2="20"
      y2="14"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="5.5"
      y1="17.75"
      x2="20"
      y2="17.75"
      stroke="#333333"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.14258 10.4998C5.14258 9.61219 5.51157 8.89265 5.96675 8.89265L9.67555 8.89265C10.1307 8.89265 10.4997 9.61219 10.4997 10.4998C10.4997 11.3874 10.1307 12.1069 9.67555 12.1069L5.96675 12.1069C5.51157 12.1069 5.14258 11.3874 5.14258 10.4998Z"
      fill="#333333"
    />
    <path
      d="M3.55069 10.6355C3.4831 10.5675 3.4831 10.4325 3.55069 10.3645L6.61649 7.28013C6.64139 7.25508 6.65798 7.25155 6.66414 7.25059C6.673 7.2492 6.68713 7.24979 6.70517 7.25839C6.73862 7.27433 6.78571 7.31919 6.78571 7.41561L6.78571 13.5844C6.78571 13.6808 6.73862 13.7257 6.70517 13.7416C6.68713 13.7502 6.673 13.7508 6.66414 13.7494C6.65798 13.7484 6.64139 13.7449 6.61649 13.7199L3.55069 10.6355Z"
      fill="#333333"
      stroke="#333333"
    />
  </svg>
)

export default ToolbarUnindentIcon
