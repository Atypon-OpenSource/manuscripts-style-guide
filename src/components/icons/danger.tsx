/*!
 * © 2025 Atypon Systems LLC
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

const DangerIcon = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_32980_20006)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1C11.866 1 15 4.134 15 8C15 11.866 11.866 15 8 15C4.134 15 1 11.866 1 8C1 4.134 4.13333 1 8 1ZM8 0C12.418 0 16 3.582 16 8C16 12.418 12.418 16 8 16C3.582 16 0 12.418 0 8C0 3.582 3.58133 0 8 0ZM8 10.8C7.82319 10.8 7.65362 10.8702 7.5286 10.9953C7.40357 11.1203 7.33333 11.2899 7.33333 11.4667C7.33333 11.6435 7.40357 11.813 7.5286 11.9381C7.65362 12.0631 7.82319 12.1333 8 12.1333C8.17681 12.1333 8.34638 12.0631 8.47141 11.9381C8.59643 11.813 8.66667 11.6435 8.66667 11.4667C8.66667 11.2899 8.59643 11.1203 8.47141 10.9953C8.34638 10.8702 8.17681 10.8 8 10.8ZM8.01333 4C7.8542 4 7.70159 4.06321 7.58907 4.17574C7.47655 4.28826 7.41333 4.44087 7.41333 4.6V9.4C7.41333 9.55913 7.47655 9.71174 7.58907 9.82426C7.70159 9.93679 7.8542 10 8.01333 10C8.17246 10 8.32508 9.93679 8.4376 9.82426C8.55012 9.71174 8.61333 9.55913 8.61333 9.4V4.6C8.61333 4.44087 8.55012 4.28826 8.4376 4.17574C8.32508 4.06321 8.17246 4 8.01333 4Z"
        fill="#353535"
      />
    </g>
    <defs>
      <clipPath id="clip0_32980_20006">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export default DangerIcon
