/*!
 * © 2026 Atypon Systems LLC
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

const LeadingLargeFloatIcon: React.FC<IconProps> = (props) => (
  <svg
    width="104"
    height="77"
    viewBox="0 0 104 77"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0H104V55H0V0Z" fill="#6F6F6F" />
    <path d="M10 25H94V77H10V25Z" fill="url(#paint0_linear_16_6175)" />
    <rect x="44" y="5" width="16" height="3" fill="white" />
    <rect x="29" y="11" width="46" height="4" fill="white" />
    <rect x="32" y="18" width="40" height="3" fill="white" />
    <defs>
      <linearGradient
        id="paint0_linear_16_6175"
        x1="35.5"
        y1="25"
        x2="82.0283"
        y2="69.6883"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#898989" />
        <stop offset="0.461538" stopColor="#D9D9D9" />
        <stop offset="1" stopColor="#898989" />
      </linearGradient>
    </defs>
  </svg>
)

export default LeadingLargeFloatIcon
