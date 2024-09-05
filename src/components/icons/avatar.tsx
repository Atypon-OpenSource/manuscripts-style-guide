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

const AvatarIcon: React.FC<IconProps> = (props) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M26.9862 21.4873C27.2694 21.0132 27.8833 20.8583 28.3575 21.1414C30.1323 22.2011 31.1794 22.6419 31.9682 22.9739C32.034 23.0015 32.0979 23.0285 32.1603 23.0549C33.0486 23.4313 33.7019 23.7479 34.6165 24.6815C35.2075 25.2847 35.518 26.1508 35.6977 26.9473C35.8839 27.7727 35.9622 28.6777 35.9887 29.4955C36.0154 30.3188 35.9904 31.0847 35.9592 31.6427C35.9435 31.9226 35.9261 32.1524 35.9125 32.3134C35.9057 32.394 35.8999 32.4575 35.8956 32.5017L35.8905 32.5531L35.8891 32.5675L35.8886 32.5717L35.8885 32.5731C35.8885 32.5733 35.8884 32.5739 34.894 32.4678L35.8885 32.5731C35.8775 32.6756 35.8507 32.7768 35.8091 32.8712C35.4529 33.6792 34.5926 34.174 33.7912 34.5021C32.9244 34.857 31.8215 35.1359 30.5958 35.3528C28.1361 35.788 25.021 36.0005 21.9357 36C18.8507 35.9995 15.7456 35.786 13.3064 35.3502C12.0914 35.1332 10.9995 34.8537 10.1462 34.4974C9.71919 34.3191 9.32064 34.1087 8.98894 33.8549C8.6608 33.6039 8.34607 33.2703 8.17468 32.8321C8.14227 32.7492 8.12106 32.6624 8.11162 32.5739L9.10598 32.4678C8.11162 32.5739 8.11164 32.5741 8.11162 32.5739L8.11094 32.5675L8.10947 32.5531L8.10439 32.5017C8.10014 32.4575 8.09428 32.394 8.08748 32.3134C8.07389 32.1524 8.05652 31.9226 8.04084 31.6427C8.00959 31.0847 7.98461 30.3188 8.0113 29.4955C8.03781 28.6777 8.11614 27.7727 8.30234 26.9473C8.482 26.1508 8.7925 25.2847 9.38351 24.6815C10.2981 23.7479 10.9514 23.4313 11.8397 23.0549C11.9021 23.0285 11.966 23.0015 12.0318 22.9739C12.8206 22.6419 13.8677 22.2011 15.6425 21.1414C16.1167 20.8583 16.7306 21.0132 17.0138 21.4873C17.2969 21.9615 17.142 22.5755 16.6678 22.8586C14.7744 23.9892 13.6294 24.4712 12.8103 24.8161C12.7449 24.8436 12.6815 24.8703 12.6201 24.8964C11.8656 25.2161 11.4739 25.4057 10.8121 26.0811C10.615 26.2824 10.4074 26.7043 10.2533 27.3874C10.1058 28.0415 10.0346 28.8077 10.0102 29.5603C9.98602 30.3076 10.0086 31.0117 10.0377 31.5309C10.0522 31.7897 10.0682 32.0005 10.0804 32.1452C10.0808 32.1496 10.0811 32.154 10.0815 32.1582C10.1071 32.1855 10.1461 32.222 10.2042 32.2665C10.3547 32.3816 10.5866 32.5139 10.917 32.6519C11.5787 32.9283 12.5101 33.1763 13.6581 33.3814C15.9451 33.79 18.9252 33.9995 21.936 34C24.9467 34.0005 27.9381 33.792 30.2473 33.3834C31.4061 33.1784 32.3531 32.9297 33.0334 32.6512C33.373 32.5122 33.6169 32.3774 33.7797 32.2573C33.845 32.209 33.8899 32.1687 33.9202 32.1376C33.9324 31.9931 33.948 31.7851 33.9623 31.5309C33.9914 31.0117 34.014 30.3076 33.9898 29.5603C33.9653 28.8077 33.8942 28.0415 33.7467 27.3874C33.5926 26.7043 33.385 26.2824 33.1879 26.0811C32.5261 25.4057 32.1344 25.2161 31.38 24.8964C31.3185 24.8703 31.2551 24.8436 31.1897 24.8161C30.3706 24.4712 29.2256 23.9892 27.3322 22.8586C26.858 22.5755 26.7031 21.9615 26.9862 21.4873Z"
      fill="#6E6E6E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 20C25.3137 20 28 17.3137 28 14C28 10.6863 25.3137 8 22 8C18.6863 8 16 10.6863 16 14C16 17.3137 18.6863 20 22 20ZM22 22C26.4183 22 30 18.4183 30 14C30 9.58172 26.4183 6 22 6C17.5817 6 14 9.58172 14 14C14 18.4183 17.5817 22 22 22Z"
      fill="#6E6E6E"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 42.087C33.0937 42.087 42.087 33.0937 42.087 22C42.087 10.9063 33.0937 1.91304 22 1.91304C10.9063 1.91304 1.91304 10.9063 1.91304 22C1.91304 33.0937 10.9063 42.087 22 42.087ZM22 44C34.1503 44 44 34.1503 44 22C44 9.84974 34.1503 0 22 0C9.84974 0 0 9.84974 0 22C0 34.1503 9.84974 44 22 44Z"
      fill="#6E6E6E"
    />
  </svg>
)

export default AvatarIcon
