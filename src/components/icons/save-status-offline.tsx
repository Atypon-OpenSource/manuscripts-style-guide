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

const SaveStatusOfflineIcon: React.FC<IconProps> = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.487 5.513C11.8612 4.67043 10.9855 4.04685 9.98458 3.73112C8.98366 3.4154 7.90863 3.42363 6.91267 3.75466C5.91672 4.08569 5.05064 4.72261 4.43787 5.57468C3.82509 6.42674 3.49687 7.45048 3.49999 8.5C3.49999 8.517 3.49999 8.533 3.49999 8.55C2.89241 8.67337 2.35235 9.0181 1.98464 9.51726C1.61694 10.0164 1.44782 10.6344 1.51013 11.2512C1.57244 11.8681 1.86172 12.4398 2.32182 12.8553C2.78192 13.2709 3.38001 13.5006 3.99999 13.5H4.49999"
      stroke="#6E6E6E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.32797 13.5H14C14.663 13.5 15.2989 13.2366 15.7677 12.7678C16.2366 12.2989 16.5 11.663 16.5 11C16.5 10.337 16.2366 9.70108 15.7677 9.23224C15.2989 8.7634 14.663 8.50001 14 8.50001C13.8304 8.50013 13.6612 8.51722 13.495 8.55101C13.495 8.53301 13.5 8.51701 13.5 8.50001C13.4987 8.14523 13.4598 7.79158 13.384 7.44501"
      stroke="#6E6E6E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.5 16.5L16.5 1.5"
      stroke="#6E6E6E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default SaveStatusOfflineIcon
