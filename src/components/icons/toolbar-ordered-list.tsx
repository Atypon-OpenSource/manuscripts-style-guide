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

const ToolbarOrderedListIcon: React.FC<IconProps> = (props) => (
  <svg
    width="19"
    height="16"
    viewBox="0 0 19 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.87165 9C4.95312 9 5.67634 9.57924 5.67634 10.433C5.67634 10.9688 5.36161 11.4442 4.50446 12.2076L3.70759 12.9408V13.0045H5.7433V13.9621H2.07031V13.1417L3.5971 11.7054C4.30692 11.0491 4.48772 10.8047 4.48772 10.5201C4.48772 10.1652 4.22656 9.92745 3.82812 9.92745C3.41295 9.92745 3.125 10.2087 3.125 10.6071V10.6306H2V10.6105C2 9.64955 2.75 9 3.87165 9ZM15.8583 11C16.2725 11 16.6083 11.3358 16.6083 11.75C16.6083 12.1642 16.2725 12.5 15.8583 12.5H9.35826C8.94405 12.5 8.60826 12.1642 8.60826 11.75C8.60826 11.3358 8.94405 11 9.35826 11H15.8583ZM4.47433 2.25V7.08147H3.24554V3.35826H3.18192L2.01674 4.14509V3.08705L3.24554 2.25H4.47433ZM15.8583 4C16.2725 4 16.6083 4.33579 16.6083 4.75C16.6083 5.16421 16.2725 5.5 15.8583 5.5H9.35826C8.94405 5.5 8.60826 5.16421 8.60826 4.75C8.60826 4.33579 8.94405 4 9.35826 4H15.8583Z"
      fill="#0B6BB8"
    />
  </svg>
)

export default ToolbarOrderedListIcon
