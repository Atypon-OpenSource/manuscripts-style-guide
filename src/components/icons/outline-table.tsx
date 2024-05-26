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

const OutlineTableIcon: React.FC<IconProps> = (props) => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.4615 4.25C14.9448 4.25 15.3823 4.44588 15.699 4.76256C16.0157 5.07925 16.2115 5.51675 16.2115 6V12C16.2115 12.4832 16.0157 12.9207 15.699 13.2374C15.3823 13.5541 14.9448 13.75 14.4615 13.75H5.03846C4.55521 13.75 4.11771 13.5541 3.80102 13.2374C3.48434 12.9207 3.28846 12.4832 3.28846 12V6C3.28846 5.51675 3.48434 5.07925 3.80102 4.76256C4.11771 4.44588 4.55521 4.25 5.03846 4.25H14.4615Z"
      stroke="#F35143"
      strokeWidth="1.5"
    />
    <path d="M16 7.5H3.5V8.5H16V7.5Z" fill="#F35143" stroke="#F35143" />
    <path
      d="M7.61538 4.5H6.61538V13.5H7.61538V4.5Z"
      fill="#F35143"
      stroke="#F35143"
    />
  </svg>
)

export default OutlineTableIcon
