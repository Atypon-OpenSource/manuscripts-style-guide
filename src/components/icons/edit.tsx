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

const EditIcon: React.FC<IconProps> = (props) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7145 1.64621L12.4444 0.369929C11.9536 -0.12331 11.1566 -0.12331 10.6641 0.369929L9.44748 1.59248L12.2954 4.45434L13.7145 3.02831C14.0952 2.64572 14.0952 2.02877 13.7145 1.64621ZM8.70555 2.33642L11.5535 5.19826L4.3446 12.4424L1.4983 9.58059L8.70555 2.33642ZM0.399974 13.9906C0.166693 14.0476 -0.0439034 13.8375 0.00792508 13.6031L0.727197 10.3555L3.5735 13.2173L0.399974 13.9906Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default EditIcon
