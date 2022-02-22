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
import {
  getModelsByType,
  hasObjectType,
} from '@manuscripts/manuscript-transform'
import {
  ExternalFile,
  Figure,
  FigureElement,
  Model,
  ObjectTypes,
  Section,
  Table,
  TableElement,
} from '@manuscripts/manuscripts-json-schema'
import React, { Dispatch, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { useDropdown } from '../../hooks/use-dropdown'
import DotsIcon from '../icons/dots-icon'
import {
  FileDescription,
  FileInfoContainer,
  FileNameTitleContainer,
  FileTitle,
} from './FileSectionItem/FileInfo'
import { ActionsIcon, Item } from './FileSectionItem/FileSectionItem'
import { ItemActions } from './FileSectionItem/ItemActions'
import { Action } from './FileSectionState'
import {
  extensionsWithFileTypesMap,
  FileType,
  fileTypesWithIconMap,
} from './util'

export interface ExternalFileRef {
  url: string
  kind?: string
  ref?: ExternalFile
}

export const InlineFilesSection: React.FC<{
  submissionId: string
  modelMap: Map<string, Model>
  handleReplace: (
    submissionId: string,
    name: string,
    file: File,
    typeId: string
  ) => Promise<boolean>
  handleDownload: (url: string) => void
  dispatch: Dispatch<Action>
}> = ({ submissionId, handleReplace, handleDownload, modelMap, dispatch }) => {
  const inlineFiles = useMemo(() => {
    const files: {
      id: string
      label: string
      type: FileType
      caption?: string
      externalFileReferences?: ExternalFileRef[]
    }[] = []

    const getCaptionText = (caption?: string) =>
      caption &&
      new DOMParser().parseFromString(caption, 'text/html').documentElement
        .innerText

    const getFigureData = (element: FigureElement) => {
      const figureId = element.containedObjectIDs.find((e) => {
        const model = modelMap.get(e)
        return model && hasObjectType(ObjectTypes.Figure)(model)
      })
      const { externalFileReferences } = (figureId &&
        (modelMap.get(figureId) as Figure)) || {
        externalFileReferences: undefined,
      }

      return {
        id: element._id,
        externalFileReferences,
        caption: getCaptionText(element.caption),
      }
    }

    getModelsByType<Section>(modelMap, ObjectTypes.Section).map((section) => {
      if (section.category === 'MPSectionCategory:abstract-graphical') {
        section.elementIDs?.some((elementId) => {
          const element = modelMap.get(elementId)
          if (element && hasObjectType(ObjectTypes.FigureElement)(element)) {
            files.unshift({
              ...getFigureData(element as FigureElement),
              label: `Graphical Abstract`,
              type: FileType.GraphicalAbstract,
            })
            return true
          }
        })
      } else {
        section.elementIDs?.map((elementId) => {
          const element = modelMap.get(elementId)
          if (!element) {
            return
          }
          switch (element.objectType) {
            case ObjectTypes.FigureElement: {
              files.push({
                ...getFigureData(element as FigureElement),
                label: `Figure`,
                type: FileType.Figure,
              })
              break
            }
            case ObjectTypes.TableElement: {
              const tableElement = element as TableElement
              const table = modelMap.get(
                tableElement.containedObjectID
              ) as Table

              files.push({
                id: element._id,
                label: `Table`,
                type: FileType.SheetsWorkbooks,
                externalFileReferences: table.externalFileReferences,
                caption: getCaptionText(tableElement.caption),
              })
              break
            }
          }
        })
      }
    })

    return files
  }, [modelMap])

  const onElementClick = useCallback((e) => {
    const { id } = e.currentTarget
    const isSelected = id == window.location.hash.substr(1)

    window.location.hash = !isSelected ? `#${id}` : '#'
    if (isSelected) {
      window.location.hash = `#${id}`
    }
  }, [])

  return (
    <div>
      {inlineFiles.map((file, index) => (
        <ElementItem
          className={'item'}
          key={index}
          id={file.id}
          onClick={onElementClick}
        >
          <FileReferences className={'refItems'}>
            {file.externalFileReferences?.map((externalFile, index) => (
              <FileReference
                key={index}
                externalFile={externalFile.ref}
                submissionId={submissionId}
                handleReplace={handleReplace}
                handleDownload={handleDownload}
                dispatch={dispatch}
              />
            ))}
          </FileReferences>
          <Element className={'element'}>
            {fileTypesWithIconMap.get(file.type)}
            <FileInfoContainer>
              <FileNameTitleContainer>
                <FileTitle>{file.label}</FileTitle>
              </FileNameTitleContainer>
              {file.caption && (
                <FileDescription>{file.caption}</FileDescription>
              )}
            </FileInfoContainer>
          </Element>
        </ElementItem>
      ))}
    </div>
  )
}

const FileReference: React.FC<{
  externalFile?: ExternalFile
  submissionId: string
  handleReplace: (
    submissionId: string,
    name: string,
    file: File,
    typeId: string
  ) => Promise<boolean>
  handleDownload: (url: string) => void
  dispatch: Dispatch<Action>
}> = ({
  externalFile,
  submissionId,
  handleReplace,
  handleDownload,
  dispatch,
}) => {
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()

  if (!externalFile || !externalFile.filename) {
    return <></>
  }

  const fileExtension = externalFile.filename.substring(
    externalFile.filename.lastIndexOf('.') + 1
  )

  return (
    <FileReferenceItem key={externalFile._id}>
      <Container>
        {fileTypesWithIconMap.get(
          extensionsWithFileTypesMap.get(fileExtension)
        )}
        <FileReferenceName>{externalFile.filename}</FileReferenceName>
      </Container>
      {handleDownload && handleReplace && submissionId && (
        <DropdownContainer ref={wrapperRef}>
          <ActionsIcon
            onClick={toggleOpen}
            type="button"
            className={'external_file_dropdown'}
            aria-label="Download or Replace"
            aria-pressed={isOpen}
          >
            <DotsIcon />
          </ActionsIcon>
          {isOpen && (
            <ItemActions
              replaceAttachmentHandler={handleReplace}
              downloadAttachmentHandler={handleDownload}
              submissionId={submissionId}
              fileName={externalFile.filename}
              designation={externalFile.designation}
              publicUrl={externalFile.publicUrl}
              hideActionList={toggleOpen}
              dispatch={dispatch}
              dropDownClassName={'ref_item_dropdown'}
            />
          )}
        </DropdownContainer>
      )}
    </FileReferenceItem>
  )
}

const ElementItem = styled(Item)`
  display: flex;
  // this will allow us to select the previous sibling node,
  // to change the background on the hover for adjacent node
  flex-direction: column-reverse;
  padding: 0;

  :hover {
    background: #f2fbfc;
  }

  .refItems:hover ~ .element {
    background: white !important;
  }

  .refItems:hover {
    background: white !important;
  }

  border-bottom: 1px dashed #f0f0f0;

  :last-child {
    border-bottom: 0;
  }
`

const Container = styled.div`
  display: flex;
`

const Element = styled.div`
  display: flex;
  padding: 20px 15px;
`

const FileReferences = styled.div``

const FileReferenceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 14px;
    height: 17px;
  }

  path {
    fill: #6e6e6e;
  }

  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 4}px;

  :hover {
    background: #f2fbfc;
  }

  .external_file_dropdown {
    opacity: 0;
  }
  :hover .external_file_dropdown {
    opacity: 1;
  }

  .ref_item_dropdown {
    top: 65%;
    right: 10px;
    width: 180px;
  }
  :last-child {
    margin-bottom: 25px;
  }
`

const FileReferenceName = styled.div`
  font-family: ${(props) => props.theme.font.family.Lato};
  font-size: ${(props) => props.theme.font.size.medium};
  line-height: ${(props) => props.theme.font.lineHeight.large};
  font-weight: ${(props) => props.theme.font.weight.normal};
  color: ${(props) => props.theme.colors.text.primary};
  margin-left: ${(props) => props.theme.grid.unit * 2}px;
`

const DropdownContainer = styled.div`
  position: relative;
`
