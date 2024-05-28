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

const ToolbarTableIcon: React.FC<IconProps> = (props) => (
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
      d="M15 2C16.3807 2 17.5 3.11929 17.5 4.5V11.5C17.5 12.8807 16.3807 14 15 14H4C2.61929 14 1.5 12.8807 1.5 11.5V4.5C1.5 3.11929 2.61929 2 4 2H15ZM5 7H3V11.5C3 12.0128 3.38604 12.4355 3.88338 12.4933L4 12.5H5V7ZM16 7H6.5V12.5H15C15.5128 12.5 15.9355 12.114 15.9933 11.6166L16 11.5V7ZM5 3.5H4C3.44772 3.5 3 3.94772 3 4.5V5.5H5V3.5ZM15 3.5H6.5V5.5H16V4.5C16 3.98716 15.614 3.56449 15.1166 3.50673L15 3.5Z"
      fill="#F35143"
    />
  </svg>
)

export default ToolbarTableIcon
