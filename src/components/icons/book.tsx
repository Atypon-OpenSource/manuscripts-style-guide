/*!
 * © 2025 Atypon Systems LLC
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

const BookIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 14.5C3.89543 14.5 3 13.6046 3 12.5V1.5C3 1.22386 2.77614 1 2.5 1C2.22386 1 2 1.22386 2 1.5V12.5C2 14.1569 3.34315 15.5 5 15.5H13C13.5523 15.5 14 15.0523 14 14.5V3C14 2.44771 13.5523 2 13 2H12.5C12.2239 2 12 2.22386 12 2.5C12 2.77614 12.2239 3 12.5 3H13V14.5H5Z"
      fill="#353535"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 0C2.67157 -3.62117e-08 2 0.671573 2 1.5C2 2.32843 2.67157 3 3.5 3L12.5 3C12.7761 3 13 2.77614 13 2.5V0.5C13 0.223858 12.7761 4.05473e-07 12.5 3.93403e-07L3.5 0ZM3 1.5C3 1.22386 3.22386 1 3.5 1L12 1V2L3.5 2C3.22386 2 3 1.77614 3 1.5Z"
      fill="#353535"
    />
  </svg>
)

export default BookIcon
