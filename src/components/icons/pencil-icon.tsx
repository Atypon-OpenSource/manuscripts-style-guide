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

const PencilIcon: React.FC<IconProps> = ({ color = '#0D79D0', ...props }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      d="M9.68101 4.26899L11.8502 6.55859L6.35835 12.3538L4.1892 10.065L9.68101 4.26899ZM13.4966 3.71699L12.529 2.69619C12.4401 2.60244 12.3344 2.52804 12.2181 2.47728C12.1017 2.42652 11.9769 2.40039 11.8509 2.40039C11.7249 2.40039 11.6001 2.42652 11.4838 2.47728C11.3674 2.52804 11.2617 2.60244 11.1728 2.69619L10.2456 3.67379L12.4155 5.96339L13.4974 4.82259C13.6365 4.67569 13.7146 4.47695 13.7146 4.26979C13.7146 4.06263 13.6365 3.86389 13.4974 3.71699H13.4966ZM3.05397 13.2826C3.04468 13.3256 3.04599 13.3705 3.05776 13.4128C3.06954 13.4552 3.0914 13.4938 3.12128 13.5248C3.15116 13.5559 3.18807 13.5784 3.22855 13.5903C3.26903 13.6023 3.31173 13.6032 3.35263 13.593L5.77016 12.9738L3.60178 10.6842L3.0532 13.2826H3.05397Z"
      fill="currentColor"
    />
  </svg>
)

export default PencilIcon
