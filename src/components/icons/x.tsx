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
import { IconProps } from './types'

export const XIcon = ({ fill = '#353535', ...props }: IconProps) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.89853 0.833309C10.293 0.439192 10.9322 0.439008 11.3266 0.833309C11.7209 1.22764 11.7207 1.86688 11.3266 2.26133L2.50153 11.0864C2.1071 11.4808 1.46793 11.4808 1.07351 11.0864C0.679117 10.6919 0.679116 10.0528 1.07351 9.65833L9.89853 0.833309Z"
      fill={fill}
      stroke={fill}
      stroke-width="0.1"
    />
    <path
      d="M9.89853 11.0867C10.293 11.4808 10.9322 11.481 11.3266 11.0867C11.7209 10.6924 11.7207 10.0531 11.3266 9.65868L2.50153 0.833656C2.1071 0.439254 1.46793 0.439236 1.07351 0.833656C0.679117 1.22808 0.679116 1.86726 1.07351 2.26168L9.89853 11.0867Z"
      fill={fill}
      stroke={fill}
      stroke-width="0.1"
    />
  </svg>
)

export default XIcon
