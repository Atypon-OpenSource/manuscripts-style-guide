/*!
 * © 2022 Atypon Systems LLC
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

const BlockQuoteIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.9098 2C12.5223 2 13.0801 2.28215 13.4826 2.74866C13.8647 3.19156 14.1053 3.80224 14.1053 4.47925V10.6319C14.1053 11.3089 13.8647 11.9196 13.4826 12.3624C13.0801 12.829 12.5223 13.1111 11.9098 13.1111H4.09026C3.47778 13.1111 2.91998 12.829 2.51747 12.3624C2.13533 11.9196 1.89478 11.3089 1.89478 10.6319V4.47925C1.89478 3.80224 2.13533 3.19156 2.51747 2.74866C2.91998 2.28215 3.47778 2 4.09026 2H11.9098Z"
      stroke="#F474AE"
      strokeWidth="1.5"
    />
    <path
      d="M9.68858 9.77734C10.3827 9.77734 10.9475 9.15104 10.9475 8.38111C10.9475 7.63837 10.4219 7.02917 9.76151 6.98709C9.75008 6.85028 9.75875 6.47781 10.0808 5.9591C10.1051 5.92 10.1007 5.86726 10.0705 5.83373C9.93925 5.68818 9.858 5.59633 9.80101 5.53206C9.72609 5.44732 9.69187 5.4087 9.64181 5.35836C9.62492 5.34145 9.60353 5.3329 9.58222 5.3329C9.56143 5.3329 9.54073 5.34097 9.52402 5.35711C8.99417 5.8685 8.40886 6.89482 8.42134 8.16213L8.42988 8.38832C8.48289 9.19312 9.01228 9.77734 9.68858 9.77734Z"
      fill="#F474AE"
    />
    <path
      d="M6.32017 9.77734C7.01431 9.77734 7.57905 9.15104 7.57905 8.38111C7.57905 7.63837 7.05346 7.02917 6.39311 6.98709C6.38167 6.85028 6.39034 6.47781 6.71237 5.9591C6.73671 5.92 6.73229 5.86726 6.70207 5.83373C6.57084 5.68818 6.4896 5.59633 6.4326 5.53206C6.35768 5.44732 6.32346 5.4087 6.2734 5.35836C6.25652 5.34145 6.23512 5.3329 6.21381 5.3329C6.19302 5.3329 6.17232 5.34097 6.15561 5.35711C5.5946 5.89858 4.97139 7.01735 5.06147 8.38822C5.11448 9.19312 5.64388 9.77734 6.32017 9.77734Z"
      fill="#F474AE"
    />
  </svg>
)

export default BlockQuoteIcon
