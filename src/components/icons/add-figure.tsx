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

const AddFigureIcon = (props: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.5 15.5H1.5C0.948 15.5 0.5 15.052 0.5 14.5V1.5C0.5 0.948 0.948 0.5 1.5 0.5H14.5C15.052 0.5 15.5 0.948 15.5 1.5V14.5C15.5 15.052 15.052 15.5 14.5 15.5Z"
      stroke="#353535"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 12.5L9.5 7.5L13.5 11.5"
      stroke="#353535"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.5 7C5.32843 7 6 6.32843 6 5.5C6 4.67157 5.32843 4 4.5 4C3.67157 4 3 4.67157 3 5.5C3 6.32843 3.67157 7 4.5 7Z"
      fill="#353535"
    />
  </svg>
)

export default AddFigureIcon
