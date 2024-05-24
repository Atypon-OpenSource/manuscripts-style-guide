/*!
 * © 2019 Atypon Systems LLC
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

const FileTableIcon: React.FC<IconProps> = (props) => (
  <svg
    width="22"
    height="18"
    viewBox="0 0 22 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.5625 0.719727C20.461 0.719727 22 2.25875 22 4.15723V13.7822C22 15.6807 20.461 17.2197 18.5625 17.2197H3.4375C1.53902 17.2197 0 15.6807 0 13.7822V4.15723C0 2.25875 1.53902 0.719727 3.4375 0.719727H18.5625ZM4.8125 7.59473H2.0625V13.7822C2.0625 14.4874 2.59331 15.0685 3.27715 15.148L3.4375 15.1572H4.8125V7.59473ZM19.9375 7.59473H6.875V15.1572H18.5625C19.2676 15.1572 19.8488 14.6264 19.9282 13.9426L19.9375 13.7822V7.59473ZM4.8125 2.78223H3.4375C2.67811 2.78223 2.0625 3.39784 2.0625 4.15723V5.53223H4.8125V2.78223ZM18.5625 2.78223H6.875V5.53223H19.9375V4.15723C19.9375 3.45208 19.4067 2.8709 18.7229 2.79148L18.5625 2.78223Z"
      fill="#F35143"
    />
  </svg>
)

export default FileTableIcon
