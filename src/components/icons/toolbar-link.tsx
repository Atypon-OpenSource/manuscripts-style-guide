/*!
 * © 2024 Atypon Systems LLC
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

const ToolbarLinkIcon: React.FC<IconProps> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 0H20V20H0V0Z" fill="white" />
    <path
      d="M0.857143 10C0.857143 7.47527 2.96232 5.42857 5.55918 5.42857H7.9102C8.34302 5.42857 8.69388 5.76969 8.69388 6.19048C8.69388 6.61127 8.34302 6.95238 7.9102 6.95238H5.55918C3.82794 6.95238 2.42449 8.31685 2.42449 10C2.42449 11.6832 3.82794 13.0476 5.55918 13.0476H7.9102C8.34302 13.0476 8.69388 13.3887 8.69388 13.8095C8.69388 14.2303 8.34302 14.5714 7.9102 14.5714H5.55918C2.96232 14.5714 0.857143 12.5247 0.857143 10ZM17.5755 10C17.5755 8.31685 16.1721 6.95238 14.4408 6.95238H12.0898C11.657 6.95238 11.3061 6.61127 11.3061 6.19048C11.3061 5.76969 11.657 5.42857 12.0898 5.42857H14.4408C17.0377 5.42857 19.1429 7.47527 19.1429 10C19.1429 12.5247 17.0377 14.5714 14.4408 14.5714H12.0898C11.657 14.5714 11.3061 14.2303 11.3061 13.8095C11.3061 13.3887 11.657 13.0476 12.0898 13.0476H14.4408C16.1721 13.0476 17.5755 11.6832 17.5755 10ZM12.8735 9.2381C13.3063 9.2381 13.6571 9.57921 13.6571 10C13.6571 10.4208 13.3063 10.7619 12.8735 10.7619H7.12653C6.69372 10.7619 6.34286 10.4208 6.34286 10C6.34286 9.57921 6.69372 9.2381 7.12653 9.2381H12.8735Z"
      fill="#0D79D0"
    />
  </svg>
)

export default ToolbarLinkIcon

