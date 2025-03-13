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

const ManuscriptIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.5 5C6.22386 5 6 5.22386 6 5.5C6 5.77614 6.22386 6 6.5 6H11.5C11.7761 6 12 5.77614 12 5.5C12 5.22386 11.7761 5 11.5 5H6.5Z"
      fill="#353535"
    />
    <path
      d="M6.5 7.5C6.22386 7.5 6 7.72386 6 8C6 8.27614 6.22386 8.5 6.5 8.5H11.5C11.7761 8.5 12 8.27614 12 8C12 7.72386 11.7761 7.5 11.5 7.5H6.5Z"
      fill="#353535"
    />
    <path
      d="M6.5 10C6.22386 10 6 10.2239 6 10.5C6 10.7761 6.22386 11 6.5 11H11.5C11.7761 11 12 10.7761 12 10.5C12 10.2239 11.7761 10 11.5 10H6.5Z"
      fill="#353535"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 14.5025V6H2C1.72386 6 1.5 5.77614 1.5 5.5V2.5C1.5 1.67157 2.17157 1 3 1H11.5C13.1569 1 14.5 2.34315 14.5 4V14.5C14.5 14.7761 14.2761 15 14 15H4C3.72386 15 3.5 14.7786 3.5 14.5025ZM3.5 2.5C3.5 2.22386 3.27614 2 3 2C2.72386 2 2.5 2.22386 2.5 2.5V5H3.5V2.5ZM4.45718 2C4.48218 2.12491 4.5 2.26144 4.5 2.4V14H13.5V4C13.5 2.89543 12.6046 2 11.5 2H4.45718Z"
      fill="#353535"
    />
  </svg>
)

export default ManuscriptIcon
