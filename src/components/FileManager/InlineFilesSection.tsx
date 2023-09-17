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
import { Figure } from '@manuscripts/json-schema'
import React, { Dispatch, useCallback, useContext } from 'react'
import styled from 'styled-components'

import { ElementFiles, ModelFile } from '../../lib/files'
import { FileActions } from './FileActions'
import { FileContainer } from './FileContainer'
import { FileCreatedDate } from './FileCreatedDate'
import { Replace, UpdateInline } from './FileManager'
import { FileManagerContext } from './FileManagerProvider'
import { FileName } from './FileName'
import { Action } from './FileSectionState'
import { FileSectionType, fileTypesWithIconMap } from './util'

const trackedJoint = ':dataTracked:'

export const InlineFilesSection: React.FC<{
  elements: ElementFiles[]
  handleUpdateInline?: UpdateInline
  isEditor: boolean
  dispatch: Dispatch<Action>
}> = ({ elements, handleUpdateInline, isEditor, dispatch }) => {
  const { modelMap, store, saveModel } = useContext(FileManagerContext)

  const onElementClick = useCallback(
    (e) => {
      if (!isEditor) {
        return
      }
      const { id } = e.currentTarget
      const clearedId = id.split(trackedJoint)[0]
      const isSelected = clearedId == window.location.hash.substring(1)

      window.location.hash = !isSelected ? `#${clearedId}` : '#'
    },
    [isEditor]
  )

  const updateFigureSrc = async (modelId: string, src: string) => {
    const figure = modelMap.get(modelId) as Figure
    if (figure) {
      await saveModel({
        ...figure,
        src: src,
      })
    }
  }

  const detach = async (modelId: string) => {
    await updateFigureSrc(modelId, '')
  }

  const replace = async (modelId: string, file: File) => {
    const uploaded = await store.upload(file)
    //TODO
    await updateFigureSrc(modelId, 'attachment:' + uploaded.id)
  }

  return (
    <>
      {elements.map((element, index) => (
        <Element key={index} id={element.modelId} onClick={onElementClick}>
          <ElementLabelContainer>
            {fileTypesWithIconMap.get(element.type)}
            <ElementLabel>{element.label}</ElementLabel>
          </ElementLabelContainer>
          <ElementFilesContainer>
            {element.files?.map((file) => (
              <ElementFile
                key={file.modelId}
                file={file}
                handleReplace={async (f) => await replace(file.modelId, f)}
                handleUpdateInline={
                  handleUpdateInline && (() => handleUpdateInline())
                }
                handleDetach={async () => await detach(file.modelId)}
                handleDownload={() => store.download(file)}
                dispatch={dispatch}
              />
            ))}
          </ElementFilesContainer>
        </Element>
      ))}
    </>
  )
}

const ElementFile: React.FC<{
  file: ModelFile
  handleDownload: () => void
  handleReplace?: Replace
  handleDetach?: () => void
  handleUpdateInline?: () => void
  dispatch: Dispatch<Action>
}> = ({
  file,
  handleReplace,
  handleDownload,
  handleUpdateInline,
  handleDetach,
  dispatch,
}) => {
  return (
    <ModelFileContainer>
      <FileName file={file} />
      {file.createdDate && <FileCreatedDate file={file} />}
      <FileActions
        sectionType={FileSectionType.Inline}
        handleDownload={handleDownload}
        handleUpdateInline={handleUpdateInline}
        handleDetach={handleDetach}
        handleReplace={handleReplace}
        dispatch={dispatch}
      />
    </ModelFileContainer>
  )
}

const Element = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;

  border-bottom: 1px dashed #f0f0f0;

  svg {
    width: 24px;
  }

  :last-child {
    border-bottom: 0;
  }
`

const ElementLabelContainer = styled.div`
  display: flex;
  padding: 20px 16px;
`

const ElementLabel = styled.div`
  color: ${(props) => props.theme.colors.text.primary};
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;
  margin-left: ${(props) => props.theme.grid.unit * 2}px;
`

const ElementFilesContainer = styled.div`
  width: 100%;
  > :last-child {
    margin-bottom: 25px;
  }
`

const ModelFileContainer = styled(FileContainer)`
  padding: 8px 16px;
  height: 40px;

  path {
    fill: #6e6e6e;
  }
`
