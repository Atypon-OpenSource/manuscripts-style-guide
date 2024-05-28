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

const ToolbarUnderlineIcon: React.FC<IconProps> = (props) => (
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
      d="M13.75 12.4551C14.1642 12.4551 14.5 12.7909 14.5 13.2051C14.5 13.6193 14.1642 13.9551 13.75 13.9551H5.25C4.83579 13.9551 4.5 13.6193 4.5 13.2051C4.5 12.7909 4.83579 12.4551 5.25 12.4551H13.75ZM7.57227 2.5V7.90234C7.57227 9.04492 8.28711 9.8125 9.54102 9.8125C10.7949 9.8125 11.5039 9.04492 11.5039 7.90234V2.5H13.0156V8.04297C13.0156 9.88867 11.6797 11.166 9.54102 11.166C7.40234 11.166 6.06641 9.88867 6.06641 8.04297V2.5H7.57227Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default ToolbarUnderlineIcon
