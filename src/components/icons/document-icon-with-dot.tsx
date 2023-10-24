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

/*!
 * © 2022 Atypon Systems LLC
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
const DocumentIconWithDot: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="28"
    height="33"
    style={{ marginLeft: -7, marginTop: -4 }}
    viewBox="0 0 28 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-for="dot"
    data-tip={true}
  >
    <rect
      x="9"
      y="9.71973"
      width="18"
      height="22"
      rx="2"
      stroke="#1A9BC7"
      strokeWidth="2"
    />
    <rect
      x="13.167"
      y="14.0771"
      width="5.66667"
      height="1.14286"
      rx="0.5"
      fill="#1A9BC7"
      stroke="#1A9BC7"
    />
    <rect
      x="13.167"
      y="19.791"
      width="9.66667"
      height="1.14286"
      rx="0.5"
      fill="#1A9BC7"
      stroke="#1A9BC7"
    />
    <rect
      x="13.167"
      y="25.5059"
      width="9.66667"
      height="1.14286"
      rx="0.5"
      fill="#1A9BC7"
      stroke="#1A9BC7"
    />
    <circle
      cx="8"
      cy="8.71973"
      r="7"
      fill="#1A9BC7"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
)
export default DocumentIconWithDot
