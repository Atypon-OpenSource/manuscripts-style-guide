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

const ToolbarImageIcon: React.FC<IconProps> = (props) => (
  <svg
    width="13"
    height="15"
    viewBox="0 0 13 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5 0C11.433 0 13 1.567 13 3.5V11.5C13 13.433 11.433 15 9.5 15H3.5C1.567 15 0 13.433 0 11.5V3.5C0 1.567 1.567 0 3.5 0H9.5ZM9.5 1.5H3.5C2.39543 1.5 1.5 2.39543 1.5 3.5V11.5C1.5 12.6046 2.39543 13.5 3.5 13.5H9.5C10.6046 13.5 11.5 12.6046 11.5 11.5V3.5C11.5 2.39543 10.6046 1.5 9.5 1.5Z"
      fill="#01872E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.13607 5.57739C3.98419 5.57739 3.86107 5.69798 3.86107 5.84673C3.86107 5.99549 3.98419 6.11608 4.13607 6.11608C4.28795 6.11608 4.41107 5.99549 4.41107 5.84673C4.41107 5.69798 4.28795 5.57739 4.13607 5.57739ZM2.76106 5.84673C2.76106 5.10295 3.37667 4.5 4.13607 4.5C4.89546 4.5 5.51107 5.10295 5.51107 5.84673C5.51107 6.59051 4.89546 7.19346 4.13607 7.19346C3.37667 7.19346 2.76106 6.59051 2.76106 5.84673Z"
      fill="#01872E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.87217 6.27386C8.08696 6.06349 8.4352 6.06349 8.64999 6.27386L12.3389 9.79847C12.5537 10.0088 12.5537 10.3499 12.3389 10.5603C12.1241 10.7707 11.7759 10.7707 11.5611 10.5603L8.26108 7.4166L2.4389 13.3422C2.22411 13.5526 1.87587 13.5526 1.66108 13.3422C1.44629 13.1318 1.44629 12.7908 1.66108 12.5804L7.87217 6.27386Z"
      fill="#01872E"
    />
  </svg>
)

export default ToolbarImageIcon

