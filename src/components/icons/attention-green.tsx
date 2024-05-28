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
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.9998 0C5.38278 0 0 5.3832 0 12C0 18.6168 5.38278 24 11.9998 24C18.6167 24 24 18.6168 24 12C24 5.3832 18.6167 0 11.9998 0ZM11.9998 22.4262C6.2508 22.4262 1.5738 17.749 1.5738 12C1.5738 6.25098 6.25074 1.57386 11.9998 1.57386C17.7488 1.57386 22.426 6.25104 22.426 12C22.4261 17.749 17.7487 22.4262 11.9998 22.4262Z"
      fill="#36B260"
    />
    <path
      d="M16.3444 8.07156L10.1565 14.2591L7.65515 11.7583C7.34777 11.4513 6.84983 11.4511 6.54245 11.7585C6.23495 12.066 6.23495 12.564 6.54245 12.8714L9.60023 15.9287C9.75389 16.0822 9.95519 16.159 10.1565 16.159C10.3578 16.159 10.5596 16.0822 10.7132 15.9284L10.7149 15.9263L17.457 9.18426C17.7645 8.87706 17.7645 8.3787 17.457 8.0715C17.1497 7.76412 16.6514 7.76412 16.3444 8.07156Z"
      fill="#36B260"
    />
  </svg>
)

export default AttentionGreenIcon
