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
import React, { useCallback, useContext } from 'react'
import styled from 'styled-components'

import { ElementFiles, ModelFile } from '../../lib/files'
import { FileActions } from './FileActions'
import { FileContainer } from './FileContainer'
import { FileCreatedDate } from './FileCreatedDate'
import { Replace } from './FileManager'
import { FileManagerContext } from './FileManagerProvider'
import { FileName } from './FileName'
import { FileSectionType, getFileTypeIcon } from './util'

const trackedJoint = ':dataTracked:'

export const InlineFilesSection: React.FC<{
  elements: ElementFiles[]
  isEditor: boolean
}> = ({ elements, isEditor }) => {
  const { modelMap, fileManagement, saveModel } = useContext(FileManagerContext)

  const navigateToElement = (id: string) => {
    const clearedId = id.split(trackedJoint)[0]
    const isSelected = clearedId == window.location.hash.substring(1)

    window.location.hash = !isSelected ? `#${clearedId}` : '#'
  }

  const onElementClick = useCallback(
    (e) => {
      if (!isEditor) {
        return
      }
      navigateToElement(e.currentTarget.id)
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

  const detach = async (element: ElementFiles, file: ModelFile) => {
    await updateFigureSrc(file.modelId, '')
    navigateToElement(element.modelId)
  }

  const replace = async (
    element: ElementFiles,
    model: ModelFile,
    file: File
  ) => {
    const uploaded = await fileManagement.upload(file)
    await updateFigureSrc(model.modelId, uploaded.id)
    navigateToElement(element.modelId)
  }

  return (
    <>
      {elements.map((element, index) => (
        <Element key={index} id={element.modelId} onClick={onElementClick}>
          <ElementLabelContainer>
            {getFileTypeIcon(element.type)}
            <ElementLabel>{element.label}</ElementLabel>
          </ElementLabelContainer>
          <ElementFilesContainer>
            {element.files?.map((file) => (
              <ElementFile
                key={file.modelId}
                file={file}
                handleReplace={async (f) => await replace(element, file, f)}
                handleDetach={async () => await detach(element, file)}
                handleDownload={() => fileManagement.download(file)}
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
}> = ({ file, handleReplace, handleDownload, handleDetach }) => {
  return (
    <ModelFileContainer>
      <FileName file={file} />
      <FileCreatedDate file={file} className="show-on-hover" />
      <FileActions
        sectionType={FileSectionType.Inline}
        handleDownload={file.id ? handleDownload : undefined}
        handleDetach={file.id ? handleDetach : undefined}
        handleReplace={handleReplace}
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
  cursor: pointer;
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
