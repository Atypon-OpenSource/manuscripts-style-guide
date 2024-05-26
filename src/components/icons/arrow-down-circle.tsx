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

const ArrowDownCircleIcon: React.FC<IconProps> = (props) => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.5 9.5C18.5 14.4706 14.4706 18.5 9.5 18.5C4.52944 18.5 0.5 14.4706 0.5 9.5C0.5 4.52944 4.52944 0.5 9.5 0.5C14.4706 0.5 18.5 4.52944 18.5 9.5Z"
      stroke="#E2E2E2"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.3437 8.231C12.7604 7.88994 13.3921 7.93134 13.7545 8.32348C14.117 8.71562 14.073 9.31 13.6562 9.65106L9.56451 13L5.35969 9.70134C4.93548 9.36855 4.87828 8.77516 5.23193 8.37598C5.58557 7.97679 6.21615 7.92296 6.64035 8.25575L9.53703 10.5282L12.3437 8.231Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default ArrowDownCircleIcon
