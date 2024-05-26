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

const AddAuthorIcon = (props: IconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="24" height="24" rx="12" fill="#0D79D0" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 8C12.2515 8 12.05 8.20147 12.05 8.45V12.05H8.45C8.20147 12.05 8 12.2515 8 12.5C8 12.7485 8.20147 12.95 8.45 12.95H12.05V16.55C12.05 16.7985 12.2515 17 12.5 17C12.7485 17 12.95 16.7985 12.95 16.55V12.95H16.55C16.7985 12.95 17 12.7485 17 12.5C17 12.2515 16.7985 12.05 16.55 12.05H12.95V8.45C12.95 8.20147 12.7485 8 12.5 8Z"
      fill="white"
    />
    <path
      d="M12.05 12.05V12.55H12.55V12.05H12.05ZM12.05 12.95H12.55V12.45H12.05V12.95ZM12.95 12.95V12.45H12.45V12.95H12.95ZM12.95 12.05H12.45V12.55H12.95V12.05ZM12.55 8.45C12.55 8.47761 12.5276 8.5 12.5 8.5V7.5C11.9753 7.5 11.55 7.92533 11.55 8.45H12.55ZM12.55 12.05V8.45H11.55V12.05H12.55ZM8.45 12.55H12.05V11.55H8.45V12.55ZM8.5 12.5C8.5 12.5276 8.47761 12.55 8.45 12.55V11.55C7.92533 11.55 7.5 11.9753 7.5 12.5H8.5ZM8.45 12.45C8.47761 12.45 8.5 12.4724 8.5 12.5H7.5C7.5 13.0247 7.92533 13.45 8.45 13.45V12.45ZM12.05 12.45H8.45V13.45H12.05V12.45ZM12.55 16.55V12.95H11.55V16.55H12.55ZM12.5 16.5C12.5276 16.5 12.55 16.5224 12.55 16.55H11.55C11.55 17.0747 11.9753 17.5 12.5 17.5V16.5ZM12.45 16.55C12.45 16.5224 12.4724 16.5 12.5 16.5V17.5C13.0247 17.5 13.45 17.0747 13.45 16.55H12.45ZM12.45 12.95V16.55H13.45V12.95H12.45ZM16.55 12.45H12.95V13.45H16.55V12.45ZM16.5 12.5C16.5 12.4724 16.5224 12.45 16.55 12.45V13.45C17.0747 13.45 17.5 13.0247 17.5 12.5H16.5ZM16.55 12.55C16.5224 12.55 16.5 12.5276 16.5 12.5H17.5C17.5 11.9753 17.0747 11.55 16.55 11.55V12.55ZM12.95 12.55H16.55V11.55H12.95V12.55ZM12.45 8.45V12.05H13.45V8.45H12.45ZM12.5 8.5C12.4724 8.5 12.45 8.47761 12.45 8.45H13.45C13.45 7.92533 13.0247 7.5 12.5 7.5V8.5Z"
      fill="white"
    />
  </svg>
)

export default AddAuthorIcon
