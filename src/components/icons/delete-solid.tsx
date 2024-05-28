/*!
 * © 2023 Atypon Systems LLC
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

const DeleteSolidIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.494 3.375H11.955C11.93 3.165 11.714 3 11.451 3H8.548C8.286 3 8.07 3.165 8.045 3.375H4.506C4.226 3.375 4 3.561 4 3.792V4.583C4 4.813 4.227 5 4.506 5H15.494C15.774 5 16 4.814 16 4.583V3.792C16 3.562 15.773 3.375 15.494 3.375ZM5 6V16.491C5 16.772 5.23 17 5.513 17H14.487C14.5541 17.0004 14.6207 16.9875 14.6829 16.9621C14.745 16.9367 14.8015 16.8993 14.8492 16.852C14.8969 16.8048 14.9347 16.7485 14.9606 16.6866C14.9865 16.6246 14.9999 16.5581 15 16.491V6H5ZM8.753 13.874C8.753 14.184 8.5 14.435 8.188 14.435C8.03886 14.4355 7.89559 14.3769 7.78966 14.2719C7.68373 14.1669 7.62379 14.0241 7.623 13.875V8.311C7.623 8.001 7.876 7.75 8.188 7.75C8.5 7.75 8.753 8 8.753 8.31V13.873V13.874ZM12.377 13.874C12.377 14.184 12.124 14.435 11.812 14.435C11.6629 14.4355 11.5196 14.3769 11.4137 14.2719C11.3077 14.1669 11.2478 14.0241 11.247 13.875V8.311C11.247 8.001 11.5 7.75 11.812 7.75C12.124 7.75 12.377 8 12.377 8.31V13.873V13.874Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default DeleteSolidIcon
