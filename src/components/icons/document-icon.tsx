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
const DocumentIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="20"
    height="25"
    viewBox="0 0 20 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="1"
      y="1.71973"
      width="18"
      height="22"
      rx="2"
      stroke={props.color}
      strokeWidth="2"
    />
    <rect
      x="5.16699"
      y="6.07715"
      width="5.66667"
      height="1.14286"
      rx="0.5"
      fill="#1A9BC7"
      stroke={props.color}
    />
    <rect
      x="5.16699"
      y="11.791"
      width="9.66667"
      height="1.14286"
      rx="0.5"
      fill="#1A9BC7"
      stroke={props.color}
    />
    <rect
      x="5.16699"
      y="17.5059"
      width="9.66667"
      height="1.14286"
      rx="0.5"
      fill="#1A9BC7"
      stroke={props.color}
    />
  </svg>
)
export default DocumentIcon
