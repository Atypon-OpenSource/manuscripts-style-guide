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

const InfoCircleIcon: React.FC<IconProps> = (props) => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.25 26.25H22.75V29.75H19.25V26.25ZM19.25 12.25H22.75V22.75H19.25V12.25ZM20.9912 3.5C11.3225 3.5 3.5 11.3312 3.5 21C3.5 30.6688 11.3225 38.5 20.9912 38.5C30.66 38.5 38.5 30.6688 38.5 21C38.5 11.3312 30.66 3.5 20.9912 3.5ZM21 35C13.265 35 7 28.735 7 21C7 13.265 13.265 7 21 7C28.735 7 35 13.265 35 21C35 28.735 28.735 35 21 35Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default InfoCircleIcon
