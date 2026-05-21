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

const EyeIcon: React.FC<IconProps> = ({ color = '#0D79D0', ...props }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99971 7.44277C9.15481 7.44277 10.0912 6.50637 10.0912 5.35127C10.0912 4.19616 9.15481 3.25977 7.99971 3.25977C6.8446 3.25977 5.9082 4.19616 5.9082 5.35127C5.9082 6.50637 6.8446 7.44277 7.99971 7.44277Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.888672 5.56163C0.888672 5.56163 3.89304 0.75 8.05975 0.75C12.2265 0.75 15.1109 5.56163 15.1109 5.56163C15.1109 5.56163 12.2785 9.95261 8.10099 9.95261C3.92349 9.95261 0.888672 5.56163 0.888672 5.56163Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
)

export default EyeIcon
