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

const LeadingWallpaperIcon: React.FC<IconProps> = (props) => (
  <svg
    width="104"
    height="63"
    viewBox="0 0 104 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0H104V63H0V0Z" fill="url(#paint0_linear_16_6198)" />
    <rect x="44" y="36" width="16" height="3" fill="white" />
    <rect x="29" y="42" width="46" height="4" fill="white" />
    <rect x="32" y="49" width="40" height="3" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M53.8958 55.1386C54.1736 54.934 54.5947 54.9588 54.8363 55.1941C55.078 55.4294 55.0486 55.786 54.7708 55.9906L52.043 58L49.2398 56.0208C48.957 55.8211 48.9189 55.4651 49.1546 55.2256C49.3904 54.9861 49.8108 54.9538 50.0936 55.1534L52.0247 56.5169L53.8958 55.1386Z"
      fill="white"
    />
    <defs>
      <linearGradient
        id="paint0_linear_16_6198"
        x1="31.5714"
        y1="5.57205e-08"
        x2="87.9783"
        y2="55.3638"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#898989" />
        <stop offset="0.461538" stopColor="#D9D9D9" />
        <stop offset="1" stopColor="#898989" />
      </linearGradient>
    </defs>
  </svg>
)

export default LeadingWallpaperIcon
