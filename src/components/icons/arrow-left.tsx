/*!
 * © 2020 Atypon Systems LLC
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

const ArrowLeftIcon: React.FC<IconProps> = (props) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.769 9.34373C8.11006 9.76045 8.06866 10.3921 7.67652 10.7545C7.28438 11.117 6.69 11.073 6.34894 10.6562L3 6.56451L6.29866 2.35969C6.63145 1.93548 7.22484 1.87828 7.62403 2.23193C8.02321 2.58557 8.07704 3.21615 7.74425 3.64035L5.47182 6.53703L7.769 9.34373Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default ArrowLeftIcon
