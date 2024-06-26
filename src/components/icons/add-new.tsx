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

const AddNewIcon: React.FC<IconProps> = (props) => (
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
      fill="white"
      stroke="#6E6E6E"
      strokeWidth="1.5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 6.5C9 6.08579 8.66421 5.75 8.25 5.75H7.25V4.75C7.25 4.33579 6.91421 4 6.5 4C6.08579 4 5.75 4.33579 5.75 4.75V5.75H4.75C4.33579 5.75 4 6.08579 4 6.5C4 6.91421 4.33579 7.25 4.75 7.25H5.75V8.25C5.75 8.66421 6.08579 9 6.5 9C6.91421 9 7.25 8.66421 7.25 8.25V7.25H8.25C8.66421 7.25 9 6.91421 9 6.5Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default AddNewIcon
