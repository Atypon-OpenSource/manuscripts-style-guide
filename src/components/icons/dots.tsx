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

const DotsIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="4"
    height="16"
    viewBox="0 0 4 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="2" cy="2" r="2" fill="#6E6E6E" />
    <circle cx="2" cy="8" r="2" fill="#6E6E6E" />
    <circle cx="2" cy="14" r="2" fill="#6E6E6E" />
  </svg>
)

export default DotsIcon
