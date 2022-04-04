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

const FigureIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="19"
    height="23"
    viewBox="0 0 19 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.0435 1.71973H4.47826C2.55727 1.71973 1 3.277 1 5.19799V18.2415C1 20.1625 2.55727 21.7197 4.47826 21.7197H14.0435C15.9645 21.7197 17.5217 20.1625 17.5217 18.2415V5.19799C17.5217 3.277 15.9645 1.71973 14.0435 1.71973Z"
      stroke="#8DD439"
      strokeWidth="2"
    />
    <path
      d="M8.39092 7.8063C8.39092 7.08594 7.80694 6.50195 7.08657 6.50195C6.36621 6.50195 5.78223 7.08594 5.78223 7.8063V17.3715C5.78223 18.0919 6.36621 18.6759 7.08657 18.6759C7.80694 18.6759 8.39092 18.0919 8.39092 17.3715V7.8063Z"
      fill="#8DD439"
    />
    <path
      d="M12.7396 11.2848C12.7396 10.5645 12.1556 9.98047 11.4352 9.98047C10.7148 9.98047 10.1309 10.5645 10.1309 11.2848V17.3718C10.1309 18.0921 10.7148 18.6761 11.4352 18.6761C12.1556 18.6761 12.7396 18.0921 12.7396 17.3718V11.2848Z"
      fill="#8DD439"
    />
  </svg>
)

export default FigureIcon
