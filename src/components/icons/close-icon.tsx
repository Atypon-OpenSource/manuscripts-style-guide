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

const CloseIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.10851 11.0499C0.733607 10.675 0.733607 10.0672 1.10851 9.69227L9.9332 0.867578C10.3081 0.492675 10.9159 0.492676 11.2908 0.867579C11.6658 1.24248 11.6658 1.85032 11.2908 2.22522L2.46615 11.0499C2.09125 11.4248 1.48341 11.4248 1.10851 11.0499Z"
      fill={props.color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.10851 0.868053C0.733607 1.24296 0.733607 1.85079 1.10851 2.2257L9.9332 11.0504C10.3081 11.4253 10.9159 11.4253 11.2908 11.0504C11.6658 10.6755 11.6658 10.0676 11.2908 9.69274L2.46615 0.868052C2.09125 0.493149 1.48341 0.493149 1.10851 0.868053Z"
      fill={props.color}
    />
  </svg>
)
export default CloseIcon
