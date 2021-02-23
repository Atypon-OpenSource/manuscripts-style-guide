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

const TableIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0511 4.04102C12.4538 4.04102 12.8184 4.20425 13.0823 4.46815C13.3462 4.73206 13.5095 5.09664 13.5095 5.49935V10.4993C13.5095 10.9021 13.3462 11.2666 13.0823 11.5305C12.8184 11.7945 12.4538 11.9577 12.0511 11.9577H4.19857C3.79586 11.9577 3.43128 11.7945 3.16737 11.5305C2.90346 11.2666 2.74023 10.9021 2.74023 10.4993V5.49935C2.74023 5.09664 2.90346 4.73206 3.16737 4.46815C3.43128 4.20425 3.79586 4.04102 4.19857 4.04102H12.0511Z"
      stroke="#F35143"
      strokeWidth="1.5"
    />
    <path
      d="M13.3337 6.75H2.91699V7.58333H13.3337V6.75Z"
      fill="#DC5030"
      stroke="#F35143"
    />
    <path
      d="M6.34603 4.25H5.5127V11.75H6.34603V4.25Z"
      fill="#DC5030"
      stroke="#F35143"
    />
  </svg>
)

export default TableIcon
