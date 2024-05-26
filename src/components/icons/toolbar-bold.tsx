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

const ToolbarBoldIcon: React.FC<IconProps> = (props) => (
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
      d="M10.0757 13.5688H5V3H9.9292C12.0386 3 13.2837 3.99609 13.2837 5.63672C13.2837 6.77197 12.4341 7.73145 11.3135 7.88525V8.02441C12.6978 8.09766 13.7671 9.17432 13.7671 10.522C13.7671 12.375 12.3389 13.5688 10.0757 13.5688ZM7.68799 4.89697V7.30664H9.10889C10.0903 7.30664 10.6616 6.85254 10.6616 6.10547C10.6616 5.35107 10.127 4.89697 9.21143 4.89697H7.68799ZM7.68799 11.6719H9.31396C10.4272 11.6719 11.0352 11.1812 11.0352 10.2876C11.0352 9.42334 10.4126 8.93994 9.29932 8.93994H7.68799V11.6719Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default ToolbarBoldIcon
