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
import styled from 'styled-components'

export const FileContainer = styled.div`
  display: flex;
  font-family: ${(props) => props.theme.font.family.Lato};
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  padding: 24px 18px;
  height: 72px;

  &.dragging {
    opacity: 0.2;
  }

  .file-icon {
    min-width: 20px;
    width: 20px;
  }

  .show-on-hover {
    display: none;
  }

  &:hover .show-on-hover {
    display: block;
  }

  &:hover,
  &:focus {
    background: #f2fbfc;
  }
`
