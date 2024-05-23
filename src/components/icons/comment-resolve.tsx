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

const ResolveCommentIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.64608 13.144C8.08269 12.5841 7.17265 12.5695 6.60236 13.1222L6.92419 12.8103C6.35886 13.3582 6.35977 14.2553 6.91993 14.808L10.7334 18.5701C11.2964 19.1255 12.2245 19.1439 12.8024 18.615L21.0556 11.0609C21.6353 10.5303 21.6519 9.66087 21.0816 9.10819L21.4034 9.42008C20.8381 8.8722 19.9037 8.85872 19.322 9.3849L11.7527 16.2314L8.64608 13.144Z"
      fill="#353535"
    />
  </svg>
)

export default ResolveCommentIcon
