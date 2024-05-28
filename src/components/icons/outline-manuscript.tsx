/*!
 * © 2024 Atypon Systems LLC
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

const OutlineManuscriptIcon: React.FC<IconProps> = (props) => (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x="1.25"
      y="1.25"
      width="13.5"
      height="15.5"
      rx="1.75"
      stroke="#FFBD26"
      strokeWidth="1.5"
    />
    <rect
      x="4.375"
      y="4.375"
      width="4.25"
      height="0.75"
      rx="0.375"
      stroke="#FFBD26"
      strokeWidth="0.75"
    />
    <rect
      x="4.375"
      y="8.375"
      width="7.25"
      height="0.75"
      rx="0.375"
      stroke="#FFBD26"
      strokeWidth="0.75"
    />
    <rect
      x="4.375"
      y="12.375"
      width="7.25"
      height="0.75"
      rx="0.375"
      stroke="#FFBD26"
      strokeWidth="0.75"
    />
  </svg>
)

export default OutlineManuscriptIcon
