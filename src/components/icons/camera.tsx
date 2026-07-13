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

import {IconProps} from './types'

export const CameraIcon: React.FC<IconProps> = (props) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
       xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_41915_16038)">
      <path
        d="M20.9086 8.33386C20.9086 8.05391 20.7984 7.785 20.6023 7.58704C20.4063 7.38925 20.1405 7.2778 19.8634 7.2778H16.727C16.4168 7.2778 16.1224 7.13886 15.9238 6.89821L13.6236 4.11117H9.37617L7.07596 6.89821C6.87739 7.1388 6.58291 7.27772 6.27273 7.2778H3.13637C2.85909 7.2778 2.59275 7.38909 2.39669 7.58704C2.20062 7.785 2.0904 8.05391 2.0904 8.33386V17.8338C2.09047 18.1136 2.20076 18.3819 2.39669 18.5798C2.59275 18.7778 2.85909 18.889 3.13637 18.889H19.8634C20.1406 18.889 20.4063 18.7777 20.6023 18.5798C20.7983 18.3819 20.9085 18.1136 20.9086 17.8338V8.33386ZM22.9998 17.8338C22.9997 18.6735 22.669 19.4789 22.0809 20.0727C21.4927 20.6664 20.6951 21.0004 19.8634 21.0004H3.13637C2.30455 21.0004 1.50627 20.6665 0.918091 20.0727C0.330049 19.4789 6.73245e-05 18.6734 0 17.8338V8.33386C0 7.49402 0.329909 6.68804 0.918091 6.09418C1.50627 5.50032 2.30455 5.16723 3.13637 5.16723H5.78267L8.08288 2.38019C8.28151 2.13953 8.57584 2.0006 8.88611 2.0006H14.1136L14.2285 2.00678C14.4955 2.03663 14.743 2.16953 14.9169 2.38019L17.2171 5.16723H19.8634C20.6951 5.16723 21.4927 5.50048 22.0809 6.09418C22.6691 6.68804 22.9998 7.49402 22.9998 8.33386V17.8338Z"
        fill="#6E6E6E"/>
      <path
        d="M13.7503 12.5005C13.7503 11.2578 12.7427 10.2501 11.5 10.2501C10.2572 10.2501 9.24956 11.2578 9.24956 12.5005C9.24956 13.7432 10.2572 14.7509 11.5 14.7509C12.7427 14.7509 13.7503 13.7432 13.7503 12.5005ZM15.9999 12.5005C15.9999 14.9859 13.9854 17.0004 11.5 17.0004C9.01455 17.0004 7 14.9859 7 12.5005C7 10.0151 9.01455 8.00053 11.5 8.00053C13.9854 8.00053 15.9999 10.0151 15.9999 12.5005Z"
        fill="#6E6E6E"/>
    </g>
    <defs>
      <clipPath id="clip0_41915_16038">
        <rect width="23" height="23" fill="white"/>
      </clipPath>
    </defs>
  </svg>
)

export default CameraIcon
