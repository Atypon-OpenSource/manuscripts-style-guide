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

const NonPreviewableImageIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 0.5H3C1.61929 0.5 0.5 1.61929 0.5 3V15C0.5 16.3807 1.61929 17.5 3 17.5H13C14.3807 17.5 15.5 16.3807 15.5 15V3C15.5 1.61929 14.3807 0.5 13 0.5ZM2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V11.6375L10.4714 8.19526C10.211 7.93491 9.78891 7.93491 9.52857 8.19526L2.28764 15.7018C2.10976 15.5213 2 15.2735 2 15V3ZM3.85011 16H13C13.5523 16 14 15.5523 14 15V13.5C14 13.5 14 13.5 14 13.5L9.99997 9.60948L3.85011 16ZM4.66664 7.66667C4.66664 7.48257 4.81588 7.33333 4.99997 7.33333C5.18407 7.33333 5.3333 7.48257 5.3333 7.66667C5.3333 7.85076 5.18407 8 4.99997 8C4.81588 8 4.66664 7.85076 4.66664 7.66667ZM4.99997 6C4.0795 6 3.3333 6.74619 3.3333 7.66667C3.3333 8.58714 4.0795 9.33333 4.99997 9.33333C5.92044 9.33333 6.66664 8.58714 6.66664 7.66667C6.66664 6.74619 5.92044 6 4.99997 6Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default NonPreviewableImageIcon
