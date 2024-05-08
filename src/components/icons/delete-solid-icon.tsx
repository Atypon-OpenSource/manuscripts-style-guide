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

export const DeleteSolidIcon: React.FC<IconProps> = (props: IconProps) => (
  <svg
    className={props.className}
    width="12"
    height="14"
    viewBox="0 0 12 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.494 0.375H7.955C7.93 0.165 7.714 0 7.451 0H4.548C4.286 0 4.07 0.165 4.045 0.375H0.506C0.226 0.375 0 0.561 0 0.792V1.583C0 1.813 0.227 2 0.506 2H11.494C11.774 2 12 1.814 12 1.583V0.792C12 0.562 11.773 0.375 11.494 0.375ZM1 3V13.491C1 13.772 1.23 14 1.513 14H10.487C10.5541 14.0004 10.6207 13.9875 10.6829 13.9621C10.745 13.9367 10.8015 13.8993 10.8492 13.852C10.8969 13.8047 10.9347 13.7485 10.9606 13.6866C10.9865 13.6246 10.9999 13.5581 11 13.491V3H1ZM4.753 10.874C4.753 11.184 4.5 11.435 4.188 11.435C4.03886 11.4355 3.89559 11.3769 3.78966 11.2719C3.68373 11.1669 3.62379 11.0241 3.623 10.875V5.311C3.623 5.001 3.876 4.75 4.188 4.75C4.5 4.75 4.753 5 4.753 5.31V10.873V10.874ZM8.377 10.874C8.377 11.184 8.124 11.435 7.812 11.435C7.66286 11.4355 7.51959 11.3769 7.41366 11.2719C7.30773 11.1669 7.24779 11.0241 7.247 10.875V5.311C7.247 5.001 7.5 4.75 7.812 4.75C8.124 4.75 8.377 5 8.377 5.31V10.873V10.874Z"
      fill="#6E6E6E"
    />
  </svg>
)
