/*!
 * © 2022 Atypon Systems LLC
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

const FileGraphicalAbstractIcon: React.FC<IconProps> = (props) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.5 12.7197C20.9853 12.7197 23 10.705 23 8.21973C23 5.73445 20.9853 3.71973 18.5 3.71973C16.0147 3.71973 14 5.73445 14 8.21973C14 10.705 16.0147 12.7197 18.5 12.7197Z"
      stroke="#FFBD26"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 14.7197H6V21.7197H13V14.7197Z"
      stroke="#FFBD26"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 9.71973L6 2.71973L10 9.71973H2Z"
      stroke="#FFBD26"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default FileGraphicalAbstractIcon
