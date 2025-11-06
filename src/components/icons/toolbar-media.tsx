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

const ToolbarMediaIcon: React.FC<IconProps> = (props) => (
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="19" height="18" fill="white" />
    <path
      d="M16 5.03906C16 4.46631 15.7852 3.95919 15.4561 3.59766C15.1099 3.2176 14.644 3 14.1426 3H4.85742C4.35596 3 3.89008 3.2176 3.54395 3.59766C3.21478 3.95919 3.00002 4.46631 3 5.03906V11.9609C3.00002 12.5337 3.21478 13.0408 3.54395 13.4023C3.89008 13.7824 4.35596 14 4.85742 14H14.1426C14.644 14 15.1099 13.7824 15.4561 13.4023C15.7852 13.0408 16 12.5337 16 11.9609V5.03906ZM17.5 11.9609C17.5 12.9113 17.1437 13.7782 16.5654 14.4131C15.9556 15.0827 15.0958 15.5 14.1426 15.5H4.85742C3.90424 15.5 3.04441 15.0827 2.43457 14.4131C1.85632 13.7782 1.50002 12.9113 1.5 11.9609V5.03906C1.50002 4.08874 1.85632 3.22183 2.43457 2.58691C3.04441 1.91731 3.90424 1.5 4.85742 1.5H14.1426C15.0958 1.5 15.9556 1.91731 16.5654 2.58691C17.1437 3.22183 17.5 4.08874 17.5 5.03906V11.9609Z"
      fill="#FE8F1F"
    />
    <path
      d="M11.7088 7.66137C12.3158 8.05567 12.3158 8.94433 11.7088 9.33862L8.54462 11.3938C7.87935 11.8259 6.99992 11.3485 6.99992 10.5552L6.99992 6.44482C6.99992 5.65154 7.87935 5.17409 8.54463 5.6062L11.7088 7.66137Z"
      fill="#FE8F1F"
    />
  </svg>
)

export default ToolbarMediaIcon

