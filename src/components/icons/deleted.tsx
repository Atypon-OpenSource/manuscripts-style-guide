/*!
 * © 2023 Atypon Systems LLC
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

const DeleteIcon: React.FC<IconProps> = (props) => (
  <svg
    width="13"
    height="16"
    viewBox="0 0 13 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      className="icon_element"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.00001 2.99995C2 3.0013 2 3.00265 2 3.00399V13.004C2 13.5563 2.44772 14.004 3 14.004H10C10.5523 14.004 11 13.5563 11 13.004V3.00399C11 3.00265 11 3.0013 11 2.99995C11.5978 3.34576 12 3.99211 12 4.73239V13.004C12 14.1086 11.1046 15.004 10 15.004H3C1.89543 15.004 1 14.1086 1 13.004V4.73239C1 3.99211 1.4022 3.34576 2.00001 2.99995Z"
      fill="#F35143"
    />
    <path
      className="icon_element"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.5 0C3.67157 0 3 0.671573 3 1.5V3.5C3 4.32843 3.67157 5 4.5 5H8.5C9.32843 5 10 4.32843 10 3.5V1.5C10 0.671573 9.32843 0 8.5 0H4.5ZM9 1.5C9 1.22386 8.77614 1 8.5 1H4.5C4.22386 1 4 1.22386 4 1.5C4 1.77614 4.22386 2 4.5 2H8.5C8.77614 2 9 1.77614 9 1.5Z"
      fill="#F35143"
    />
    <rect
      className="icon_element"
      y="2"
      width="13"
      height="3"
      rx="1.5"
      fill="#F35143"
    />
    <path
      className="icon_element"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 7.5C8 7.22386 8.22386 7 8.5 7C8.77614 7 9 7.22386 9 7.5V11.5C9 11.7761 8.77614 12 8.5 12C8.22386 12 8 11.7761 8 11.5V7.5Z"
      fill="#F35143"
    />
    <path
      className="icon_element"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 7.5C4 7.22386 4.22386 7 4.5 7C4.77614 7 5 7.22386 5 7.5V11.5C5 11.7761 4.77614 12 4.5 12C4.22386 12 4 11.7761 4 11.5V7.5Z"
      fill="#F35143"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.5 3C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4L1.5 4C1.22386 4 1 3.77614 1 3.5C1 3.22386 1.22386 3 1.5 3L11.5 3Z"
      fill="white"
    />
  </svg>
)

export default DeleteIcon
