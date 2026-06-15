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

const LeadingHeroImageIcon: React.FC<IconProps> = (props) => (
  <svg
    width="104"
    height="26"
    viewBox="0 0 104 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0H104V26H0V0Z" fill="url(#paint0_linear_16_6153)" />
    <rect x="4" y="5" width="16" height="3" fill="white" />
    <rect x="4" y="11" width="64" height="4" fill="white" />
    <rect x="4" y="18" width="40" height="3" fill="white" />
    <defs>
      <linearGradient
        id="paint0_linear_16_6153"
        x1="31.5714"
        y1="2.29958e-08"
        x2="48.2097"
        y2="39.5702"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#898989" />
        <stop offset="0.461538" stopColor="#D9D9D9" />
        <stop offset="1" stopColor="#898989" />
      </linearGradient>
    </defs>
  </svg>
)

export default LeadingHeroImageIcon
