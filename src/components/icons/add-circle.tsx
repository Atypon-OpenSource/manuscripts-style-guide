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

const AddCircleIcon: React.FC<IconProps> = (props) => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.11035 0.806061C13.6843 0.806153 17.3925 4.41494 17.3926 8.86661C17.3926 13.3183 13.6843 16.9271 9.11035 16.9272C4.5363 16.9272 0.828125 13.3184 0.828125 8.86661C0.828158 4.41489 4.53632 0.806061 9.11035 0.806061ZM8.28223 4.03067V8.06094H4.14062V9.67227H8.28223V13.7025H9.93848V9.67227H14.0791V8.06094H9.93848V4.03067H8.28223Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default AddCircleIcon
