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

const AddedIcon: React.FC<IconProps> = (props) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.538 0.721074L18.6149 3.57386C20.1857 4.45652 21.1534 6.08774 21.1534 7.85305V13.5586C21.1534 15.3239 20.1857 16.9552 18.6149 17.8378L13.538 20.6906C11.9672 21.5733 10.0319 21.5733 8.46109 20.6906L3.38416 17.8378C1.81336 16.9552 0.845703 15.3239 0.845703 13.5586V7.85305C0.845703 6.08774 1.81336 4.45652 3.38416 3.57386L8.46109 0.721074C10.0319 -0.161582 11.9672 -0.161582 13.538 0.721074Z"
      fill="#80BE86"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.83268 10.9309C7.49327 10.6199 6.94679 10.6344 6.62336 10.9522L6.53347 11.0406C6.20499 11.3634 6.21569 11.8788 6.55357 12.1884L9.46864 14.8597L16.5368 8.29962C16.8769 7.98396 16.8719 7.47082 16.5372 7.16418L16.4442 7.07895C16.1044 6.76753 15.5537 6.76749 15.2148 7.07833L9.42434 12.3895L7.83268 10.9309Z"
      fill="white"
    />
  </svg>
)

export default AddedIcon
