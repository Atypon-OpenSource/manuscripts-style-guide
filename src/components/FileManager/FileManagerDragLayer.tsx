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
import React from 'react'
import { useDragLayer, XYCoord } from 'react-dnd'
import styled from 'styled-components'

import { FileContainer } from './FileContainer'
import { FileCreatedDate } from './FileCreatedDate'
import { FileName } from './FileName'

const Container = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 999;
  left: 0;
  top: 0;
  max-width: 400px;
`

const DraggableFileContainer = styled(FileContainer)`
  padding: 16px 32px;
  background: #f2fbfc;
  border: 1px solid #bce7f6;
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
`

const getItemStyles = (currentOffset: XYCoord | null) => {
  if (!currentOffset) {
    return {
      display: 'none',
    }
  }

  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
  }
}

export const FileManagerDragLayer: React.FC = () => {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    })
  )

  if (!isDragging) {
    return null
  }

  return (
    <Container style={getItemStyles(currentOffset)}>
      {itemType === 'file' && (
        <DraggableFileContainer>
          <FileName file={item.file} />
          {item.file.createdDate && <FileCreatedDate file={item.file} />}
        </DraggableFileContainer>
      )}
    </Container>
  )
}
