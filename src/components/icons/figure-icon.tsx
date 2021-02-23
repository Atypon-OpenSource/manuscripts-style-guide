/*!
 * © 2019 Atypon Systems LLC
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

const FigureIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="11"
    height="14"
    viewBox="0 0 11 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.25 1.25H2.75C1.64543 1.25 0.75 2.14543 0.75 3.25V10.75C0.75 11.8546 1.64543 12.75 2.75 12.75H8.25C9.35457 12.75 10.25 11.8546 10.25 10.75V3.25C10.25 2.14543 9.35457 1.25 8.25 1.25Z"
      stroke="#8DD439"
      strokeWidth="1.5"
    />
    <path
      d="M5 4.75C5 4.33579 4.66421 4 4.25 4C3.83579 4 3.5 4.33579 3.5 4.75V10.25C3.5 10.6642 3.83579 11 4.25 11C4.66421 11 5 10.6642 5 10.25V4.75Z"
      fill="#8DD439"
    />
    <path
      d="M7.5 6.75C7.5 6.33579 7.16421 6 6.75 6C6.33579 6 6 6.33579 6 6.75V10.25C6 10.6642 6.33579 11 6.75 11C7.16421 11 7.5 10.6642 7.5 10.25V6.75Z"
      fill="#8DD439"
    />
  </svg>
)

export default FigureIcon
