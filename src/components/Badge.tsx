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

import styled from 'styled-components'

export const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 50px;
`
export const WarningBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background-color: #fe8f1f;
  color: white;
  border-radius: 50%;
  min-width: 14px;
  height: 14px;
  font-family: 'Lato', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 9px;
  font-weight: 400;
  line-height: 1;
  z-index: 10;
`
export const ErrorBadge = styled(WarningBadge)`
  background-color: #f35143;
`
export const IconWrapper = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
