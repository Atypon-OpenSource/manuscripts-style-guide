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

const LeadingHalfLeftIcon: React.FC<IconProps> = (props) => (
  <svg
    width="104"
    height="34"
    viewBox="0 0 104 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M52 0H104V34H52V0Z" fill="url(#paint0_linear_16_6209)" />
    <path d="M0 0H52V34H0V0Z" fill="#6F6F6F" />
    <rect x="4" y="9" width="16" height="3" fill="white" />
    <rect x="4" y="15" width="43" height="4" fill="white" />
    <rect x="4" y="22" width="36" height="3" fill="white" />
    <defs>
      <linearGradient
        id="paint0_linear_16_6209"
        x1="67.7857"
        y1="3.00714e-08"
        x2="98.0958"
        y2="27.5621"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#898989" />
        <stop offset="0.461538" stopColor="#D9D9D9" />
        <stop offset="1" stopColor="#898989" />
      </linearGradient>
    </defs>
  </svg>
)

export default LeadingHalfLeftIcon
