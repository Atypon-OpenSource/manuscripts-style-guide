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
import React, { useCallback } from 'react'
import { useDragLayer, XYCoord } from 'react-dnd'
import styled from 'styled-components'

import { FileSectionItem } from './FileSectionItem'

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
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

/**
 * This component used to style the "DraggableFileSectionItem" component.
 */
export const DragLayer: React.FC = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  const renderItem = useCallback(() => {
    switch (itemType) {
      case 'FileSectionItem':
        return (
          <CustomFileSectionItem
            title={item.title}
            externalFile={item.externalFile}
            showAttachmentName={item.showAttachmentName}
            withDot={item.withDot}
            showSecondaryActions={false}
            showDesignationActions={false}
            style={{ width: item.width }}
          />
        )
      default:
        return null
    }
  }, [itemType, item])

  if (!isDragging) {
    return null
  }

  return (
    <Container>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`
const CustomFileSectionItem = React.memo(styled(FileSectionItem)`
  padding: 16px 32px;
  background: #f2fbfc;
  border: 1px solid #bce7f6;
  box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
`)
