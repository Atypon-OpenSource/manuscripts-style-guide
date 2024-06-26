/*!
 * © 2023 Atypon Systems LLC
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

const LinkIcon: React.FC<IconProps> = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.63317 12.1949L4.74782 14.0803C3.9662 14.8619 2.70042 14.8619 1.91945 14.0804C1.13832 13.2993 1.13832 12.0334 1.91929 11.2524L5.69063 7.48109C6.4716 6.70009 7.73751 6.70009 8.51848 7.48109C8.77882 7.74143 9.20095 7.74143 9.46129 7.48109C9.72163 7.22075 9.72163 6.79862 9.46129 6.53828C8.1596 5.23659 6.04951 5.23659 4.74782 6.53828L0.97651 10.3096C-0.325178 11.6113 -0.325178 13.7214 0.97651 15.0231C2.27804 16.3254 4.38829 16.3254 5.69067 15.0231L7.57601 13.1377C7.83635 12.8774 7.83635 12.4552 7.57601 12.1949C7.31567 11.9346 6.89351 11.9346 6.63317 12.1949Z"
      fill="#6E6E6E"
    />
    <path
      d="M15.0235 0.976266C13.7218 -0.325422 11.6111 -0.325422 10.3094 0.976266L8.04737 3.23827C7.78702 3.49861 7.78702 3.92073 8.04737 4.18108C8.30771 4.44142 8.72984 4.44142 8.99018 4.18108L11.2522 1.91908C12.0331 1.13808 13.2997 1.13808 14.0807 1.91908C14.8617 2.70005 14.8617 3.96595 14.0807 4.74692L9.93271 8.89495C9.15171 9.67595 7.88584 9.67595 7.10487 8.89495C6.84452 8.63461 6.4224 8.63461 6.16205 8.89495C5.90171 9.1553 5.90171 9.57742 6.16205 9.83777C7.46374 11.1395 9.57384 11.1395 10.8755 9.83777L15.0235 5.68977C16.3252 4.38808 16.3252 2.27795 15.0235 0.976266Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default LinkIcon
