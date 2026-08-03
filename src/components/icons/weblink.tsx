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

const WebLinkIcon: React.FC<IconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_24947_17865)">
      <path d="M6.63292 12.1949L4.74758 14.0803C3.96595 14.8619 2.70017 14.8619 1.9192 14.0804C1.13808 13.2993 1.13808 12.0334 1.91905 11.2524L5.69039 7.48109C6.47136 6.70009 7.73727 6.70009 8.51823 7.48109C8.77858 7.74143 9.2007 7.74143 9.46105 7.48109C9.72139 7.22075 9.72139 6.79862 9.46105 6.53828C8.15936 5.23659 6.04927 5.23659 4.74758 6.53828L0.976266 10.3096C-0.325422 11.6113 -0.325422 13.7214 0.976266 15.0231C2.2778 16.3254 4.38805 16.3254 5.69042 15.0231L7.57577 13.1377C7.83611 12.8774 7.83611 12.4552 7.57577 12.1949C7.31542 11.9346 6.89327 11.9346 6.63292 12.1949Z" fill="#353535"/>
      <path d="M15.023 0.976266C13.7213 -0.325422 11.6106 -0.325422 10.3089 0.976266L8.04688 3.23827C7.78654 3.49861 7.78654 3.92073 8.04688 4.18108C8.30722 4.44142 8.72935 4.44142 8.98969 4.18108L11.2517 1.91908C12.0327 1.13808 13.2992 1.13808 14.0802 1.91908C14.8612 2.70005 14.8612 3.96595 14.0802 4.74692L9.93222 8.89495C9.15122 9.67595 7.88535 9.67595 7.10438 8.89495C6.84404 8.63461 6.42191 8.63461 6.16157 8.89495C5.90122 9.1553 5.90122 9.57742 6.16157 9.83777C7.46325 11.1395 9.57335 11.1395 10.875 9.83777L15.023 5.68977C16.3247 4.38808 16.3247 2.27795 15.023 0.976266Z" fill="#353535"/>
    </g>
    <defs>
      <clipPath id="clip0_24947_17865">
        <rect width="16" height="16" fill="353535"/>
      </clipPath>
    </defs>
  </svg>
)
export default WebLinkIcon
