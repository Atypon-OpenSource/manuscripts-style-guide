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

const AttentionGreenIcon: React.FC<IconProps> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 3.18L8.59 14.6L4.35 10.36L5.76 8.95L8.59 11.78L18.59 1.78L20 3.18ZM17.79 8.22C17.92 8.79 18 9.39 18 10C18 14.42 14.42 18 10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C11.58 2 13.04 2.46 14.28 3.25L15.72 1.81C14.1 0.67 12.13 0 10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 8.81 19.78 7.67 19.4 6.61L17.79 8.22Z"
      fill="#31A056"
    />
  </svg>
)

export default AttentionGreenIcon
