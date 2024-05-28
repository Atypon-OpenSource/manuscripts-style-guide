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

const FileFigureIcon: React.FC<IconProps> = (props) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.0435 2.72021H7.47826C5.55727 2.72021 4 4.27748 4 6.19848V19.242C4 21.163 5.55727 22.7202 7.47826 22.7202H17.0435C18.9645 22.7202 20.5217 21.163 20.5217 19.242V6.19848C20.5217 4.27748 18.9645 2.72021 17.0435 2.72021Z"
      stroke="#8DD439"
      strokeWidth="2"
    />
    <path
      d="M11.3909 8.80728C11.3909 8.08691 10.8069 7.50293 10.0866 7.50293C9.36621 7.50293 8.78223 8.08691 8.78223 8.80728V18.3725C8.78223 19.0928 9.36621 19.6768 10.0866 19.6768C10.8069 19.6768 11.3909 19.0928 11.3909 18.3725V8.80728Z"
      fill="#8DD439"
    />
    <path
      d="M15.7396 12.2853C15.7396 11.5649 15.1556 10.981 14.4352 10.981C13.7148 10.981 13.1309 11.5649 13.1309 12.2853V18.3723C13.1309 19.0926 13.7148 19.6766 14.4352 19.6766C15.1556 19.6766 15.7396 19.0926 15.7396 18.3723V12.2853Z"
      fill="#8DD439"
    />
  </svg>
)

export default FileFigureIcon
