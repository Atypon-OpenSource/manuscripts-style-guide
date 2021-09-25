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

const CloseOIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 10C7.76142 10 10 7.76142 10 5C10 2.23858 7.76142 0 5 0C2.23858 0 0 2.23858 0 5C0 7.76142 2.23858 10 5 10Z"
      fill={props.color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.36918 6.68558C3.24421 6.56062 3.24421 6.358 3.36918 6.23304L6.31074 3.29147C6.43571 3.1665 6.63832 3.1665 6.76329 3.29147C6.88826 3.41644 6.88826 3.61905 6.76329 3.74402L3.82173 6.68558C3.69676 6.81055 3.49415 6.81055 3.36918 6.68558Z"
      fill="#FFFFFF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.36918 3.29098C3.24421 3.41595 3.24421 3.61856 3.36918 3.74353L6.31074 6.68509C6.43571 6.81006 6.63832 6.81006 6.76329 6.68509C6.88826 6.56012 6.88826 6.35751 6.76329 6.23254L3.82173 3.29098C3.69676 3.16601 3.49415 3.16601 3.36918 3.29098Z"
      fill="#FFFFFF"
    />
  </svg>
)

export default CloseOIcon
