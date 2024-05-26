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

const ToolbarSymbolIcon: React.FC<IconProps> = (props) => (
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
      d="M7.93411 4.5L10.3289 6.8948L10.3309 6.89282L11.4033 7.96526L7.86861 11.5H13.38V13H5.38V11.5H5.72371L9.25647 7.96725L5.78922 4.5H5.35V3H13.35V4.5H7.93411Z"
      fill="#FFBD26"
    />
  </svg>
)

export default ToolbarSymbolIcon
