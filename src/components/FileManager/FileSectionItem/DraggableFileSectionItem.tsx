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
import React, { useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import styled from 'styled-components'

import { FileSectionItem, FileSectionItemProps } from './FileSectionItem'

const itemPlaceHolderDraggingStyle: React.CSSProperties = {
  background: '#FAFAFA',
  borderRadius: '6px',
  height: '104px',
}

const draggingItemStyle: React.CSSProperties = {
  opacity: 0,
  height: 0,
}

/**
 * This component will allow the "FileSectionItem" component to be draggable.
 */
export const DraggableFileSectionItem: React.FC<FileSectionItemProps> = (
  props
) => {
  const [draggingItemWidth, setDraggingItemWidth] = useState('100%')

  const itemPlaceholderRef = useRef() as React.MutableRefObject<HTMLDivElement>

  const [{ isDragging }, dragRef, preview] = useDrag({
    item: {
      id: props.title,
      title: props.title,
      externalFile: props.externalFile,
      showAttachmentName: props.showAttachmentName,
      width: draggingItemWidth,
      type: 'FileSectionItem',
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // Here we set the width of the draggable item to be the same as the item width in the inspector when the user drag it.
  useEffect(() => {
    if (itemPlaceholderRef && itemPlaceholderRef.current) {
      setDraggingItemWidth(itemPlaceholderRef.current.offsetWidth + 'px')
    }
  }, [])

  useEffect(() => {
    preview(getEmptyImage())
  }, [preview])

  return (
    <ItemDraggingPlaceholderContainer
      style={isDragging ? itemPlaceHolderDraggingStyle : {}}
      ref={itemPlaceholderRef}
    >
      <FileSectionItem
        style={isDragging ? draggingItemStyle : {}}
        dragRef={dragRef}
        {...props}
      />
    </ItemDraggingPlaceholderContainer>
  )
}

const ItemDraggingPlaceholderContainer = styled.div`
  background: ${(props) => props.theme.colors.background.primary};
  width: 100%;
  position: relative;
`
