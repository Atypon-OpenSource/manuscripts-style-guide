/*!
 * © 2021 Atypon Systems LLC
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
import React, { ChangeEvent, Dispatch, useContext, useRef } from 'react'
import styled from 'styled-components'

import { DropdownList } from '../Dropdown'
import { MoveTarget, PermissionsContext, Replace } from './FileManager'
import { Action } from './FileSectionState'
import { FileSectionType } from './util'

/**
 * This component represents the drop-down list action for each file item.
 */
export const FileActions: React.FC<{
  sectionType: FileSectionType
  handleDownload: () => void
  handleReplace?: Replace
  handleDetach?: () => void
  moveTarget?: MoveTarget
  handleUpdateInline?: () => void
  hideActionList: (e?: React.MouseEvent) => void
  dispatch?: Dispatch<Action>
  className?: string
}> = ({
  handleDownload,
  handleReplace,
  handleDetach,
  moveTarget,
  hideActionList,
  className,
}) => {
  const can = useContext(PermissionsContext)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (handleReplace && event && event.target && event.target.files) {
      const file = event.target.files[0]
      await handleReplace(file)
      hideActionList()
    }
  }
  const openFileDialog = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  return (
    <FileActionDropdownList
      direction={'right'}
      className={className}
      width={192}
      top={5}
      onClick={hideActionList}
    >
      <FileAction onClick={handleDownload}>Download</FileAction>
      {can?.replaceFile && handleReplace && (
        <>
          <FileAction onClick={openFileDialog}>Replace</FileAction>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={handleChange}
          />
        </>
      )}
      {can?.editArticle && handleDetach && (
        <FileAction onClick={handleDetach}>Detach</FileAction>
      )}
      {can?.editArticle && moveTarget && (
        <FileAction onClick={moveTarget.handler}>
          Move to {moveTarget.sectionType}
        </FileAction>
      )}
    </FileActionDropdownList>
  )
}

export const FileActionDropdownList = styled(DropdownList)`
  border: 1px solid #e2e2e2;
  box-sizing: border-box;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  min-width: 180px;
  background: ${(props) => props.theme.colors.background.primary};
  z-index: 999;
  text-align: left;
  overflow: hidden;
`

export const FileAction = styled.div`
  font-family: ${(props) => props.theme.font.family.Lato};
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.text.primary};
  padding: 16px;
  &:hover,
  &:focus {
    background: #f2fbfc;
  }
`
