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

const ImageIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="20"
    height="25"
    viewBox="0 0 20 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 0.719727H3C1.34315 0.719727 0 2.06287 0 3.71973V21.7197C0 23.3766 1.34315 24.7197 3 24.7197H17C18.6569 24.7197 20 23.3766 20 21.7197V3.71973C20 2.06287 18.6569 0.719727 17 0.719727ZM2 3.71973C2 3.16744 2.44772 2.71973 3 2.71973H17C17.5523 2.71973 18 3.16744 18 3.71973V16.4876L13.2952 11.5701C12.948 11.1982 12.3852 11.1982 12.0381 11.5701L2.27769 22.4113C2.10568 22.2317 2 21.988 2 21.7197V3.71973ZM4.46682 22.7197H17C17.5523 22.7197 18 22.272 18 21.7197V19.1483C18 19.1483 18 19.1483 18 19.1483L12.6666 13.5904L4.46682 22.7197ZM5.55552 10.815C5.55552 10.552 5.7545 10.3388 5.99996 10.3388C6.24542 10.3388 6.44441 10.552 6.44441 10.815C6.44441 11.078 6.24542 11.2912 5.99996 11.2912C5.7545 11.2912 5.55552 11.078 5.55552 10.815ZM5.99996 8.43401C4.77266 8.43401 3.77774 9.5 3.77774 10.815C3.77774 12.1299 4.77266 13.1959 5.99996 13.1959C7.22726 13.1959 8.22218 12.1299 8.22218 10.815C8.22218 9.5 7.22726 8.43401 5.99996 8.43401Z"
      fill="#36B260"
    />
  </svg>
)

export default ImageIcon
