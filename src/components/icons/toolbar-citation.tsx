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

const ToolbarCitationIcon: React.FC<IconProps> = (props) => (
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
      d="M10.018 6.842L13.656 5.482L14.336 7.114L10.63 8.406L12.874 11.5L11.48 12.554L9.134 9.29L6.924 12.554L5.394 11.5L7.604 8.406L4 7.114L4.612 5.482L8.216 6.842V3H10.018V6.842Z"
      fill="#1A9BC7"
    />
  </svg>
)

export default ToolbarCitationIcon
