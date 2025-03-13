/*!
 * © 2025 Atypon Systems LLC
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

const CommentIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.94841 4.18311C7.98238 3.9602 8 3.73191 8 3.49951C8 3.22073 7.97465 2.94787 7.92613 2.68311H13.5C14.8854 2.68311 16.25 3.6425 16.25 5.09977V9.02453L19.1086 12.9949C19.2731 13.2233 19.2958 13.5245 19.1675 13.775C19.0392 14.0255 18.7814 14.1831 18.5 14.1831H5.5C4.11463 14.1831 2.75 13.2237 2.75 11.7664V7.93729C2.9939 7.97821 3.24446 7.99951 3.5 7.99951C3.75553 7.99951 4.00609 7.97821 4.25 7.93729V11.7664C4.25 12.1508 4.67537 12.6831 5.5 12.6831H17.0358L14.8913 9.70467C14.7994 9.57703 14.75 9.42372 14.75 9.26644V5.09977C14.75 4.71538 14.3246 4.18311 13.5 4.18311H7.94841Z"
      fill="#353535"
    />
    <path
      d="M11.5 6.99951H8.5"
      stroke="#353535"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 9.99951H7"
      stroke="#353535"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 1L3.5 6"
      stroke="#353535"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 3.5L1 3.5"
      stroke="#353535"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CommentIcon
