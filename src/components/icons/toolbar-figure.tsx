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

const ToolbarFigureIcon: React.FC<IconProps> = (props) => (
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
      d="M12.5 0.5C14.433 0.5 16 2.067 16 4V12C16 13.933 14.433 15.5 12.5 15.5H6.5C4.567 15.5 3 13.933 3 12V4C3 2.067 4.567 0.5 6.5 0.5H12.5ZM12.5 2H6.5C5.39543 2 4.5 2.89543 4.5 4V12C4.5 13.1046 5.39543 14 6.5 14H12.5C13.6046 14 14.5 13.1046 14.5 12V4C14.5 2.89543 13.6046 2 12.5 2ZM7.25 5C7.66421 5 8 5.33579 8 5.75V11.25C8 11.6642 7.66421 12 7.25 12C6.83579 12 6.5 11.6642 6.5 11.25V5.75C6.5 5.33579 6.83579 5 7.25 5ZM10.25 7C10.6642 7 11 7.33579 11 7.75V11.25C11 11.6642 10.6642 12 10.25 12C9.83579 12 9.5 11.6642 9.5 11.25V7.75C9.5 7.33579 9.83579 7 10.25 7Z"
      fill="#8DD439"
    />
  </svg>
)

export default ToolbarFigureIcon
