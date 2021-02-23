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

const DatasetIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M2.33301 3V13.6667C2.33301 14.8 4.99967 15.6667 8.33301 15.6667C11.6663 15.6667 14.333 14.8 14.333 13.6667V3"
        stroke="#B3A1FC"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
      <path
        d="M8.33301 5C11.6467 5 14.333 4.10457 14.333 3C14.333 1.89543 11.6467 1 8.33301 1C5.0193 1 2.33301 1.89543 2.33301 3C2.33301 4.10457 5.0193 5 8.33301 5Z"
        stroke="#B3A1FC"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <path
        d="M14.333 8.33398C14.333 9.46732 11.6663 10.334 8.33301 10.334C4.99967 10.334 2.33301 9.46732 2.33301 8.33398"
        stroke="#B3A1FC"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <circle
        cx="10.5"
        cy="7.5"
        r="0.5"
        transform="rotate(-180 10.5 7.5)"
        fill="white"
        stroke="#B3A1FC"
        strokeWidth="1.5"
      />
      <circle
        cx="10.5"
        cy="12.5"
        r="0.5"
        fill="white"
        stroke="#B3A1FC"
        strokeWidth="1.5"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default DatasetIcon
