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

const ScrollIcon: React.FC<IconProps> = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="14.5"
      y="1.5"
      width="13"
      height="13"
      transform="rotate(90 14.5 1.5)"
    />
    <rect
      x="14.5"
      y="1.5"
      width="13"
      height="13"
      transform="rotate(90 14.5 1.5)"
    />
    <path
      d="M15 12.5161V3.48387C15 2.82511 14.7383 2.19332 14.2725 1.72751C13.8067 1.26169 13.1749 1 12.5161 1H3.48387C2.82511 1 2.19333 1.26169 1.72751 1.72751C1.26169 2.19332 1 2.82511 1 3.48387V12.5161C1 13.1749 1.26169 13.8067 1.72751 14.2725C2.19333 14.7383 2.82511 15 3.48387 15H12.5161C13.1749 15 13.8067 14.7383 14.2725 14.2725C14.7383 13.8067 15 13.1749 15 12.5161ZM3.48387 13.6452C3.18443 13.6452 2.89726 13.5262 2.68552 13.3145C2.47379 13.1027 2.35484 12.8156 2.35484 12.5161V3.48387C2.35484 3.18443 2.47379 2.89726 2.68552 2.68552C2.89726 2.47379 3.18443 2.35484 3.48387 2.35484H12.5161C12.8156 2.35484 13.1027 2.47379 13.3145 2.68552C13.5262 2.89726 13.6452 3.18443 13.6452 3.48387V12.5161C13.6452 12.8156 13.5262 13.1027 13.3145 13.3145C13.1027 13.5262 12.8156 13.6452 12.5161 13.6452H3.48387Z"
      fill="#6E6E6E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1786 11.1966C10.9227 11.4511 10.5089 11.45 10.2543 11.1941L5.03979 5.95182C4.78524 5.69592 4.78634 5.28211 5.04224 5.02756C5.29815 4.77301 5.71196 4.77411 5.9665 5.03002L11.181 10.2723C11.4356 10.5282 11.4345 10.942 11.1786 11.1966Z"
      fill="#6E6E6E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.7311 5.99911C10.3702 5.99811 10.0768 6.2899 10.0758 6.65084L10.0662 10.0778L6.6399 10.0688C6.27896 10.0679 5.98558 10.3597 5.98464 10.7207C5.98369 11.0816 6.27553 11.375 6.63647 11.3759L10.7162 11.3866C11.0771 11.3876 11.3705 11.0958 11.3715 10.7349L11.3829 6.65449C11.3839 6.29354 11.0921 6.00012 10.7311 5.99911Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default ScrollIcon
