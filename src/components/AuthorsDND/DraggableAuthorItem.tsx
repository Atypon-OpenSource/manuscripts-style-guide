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

import CorrespondingAuthorBadge from '@manuscripts/assets/react/CorrespondingAuthorBadge'
import JointFirstAuthorBadge from '@manuscripts/assets/react/FirstAuthorBadge'
import VerticalEllipsis from '@manuscripts/assets/react/VerticalEllipsis'
import { Contributor } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import {
  DragSource,
  DragSourceCollector,
  DragSourceSpec,
  DropTarget,
  DropTargetCollector,
  DropTargetMonitor,
  DropTargetSpec,
} from 'react-dnd'
import { findDOMNode } from 'react-dom'
import { isJointFirstAuthor } from '../../lib/authors'
import { styled, ThemedProps, withTheme } from '../../styled-components'
import { Theme } from '../../theme'
import {
  AuthorItem,
  ConnectedDragSourceProps,
  ConnectedDropTargetProps,
  DragSourceProps,
  DropSide,
} from '../../types'
import { Avatar } from '../Avatar'
import {
  AuthorItemComponentOverrides,
  defaultAuthorItemComponents,
} from './AuthorItemComponents'

type ThemedDivProps = ThemedProps<HTMLDivElement>

const AuthorItemComponent = styled.div<{
  opacity: number
}>`
  padding: ${props => props.theme.grid.unit}px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.25s;
  opacity: ${props => props.opacity};

  &:hover,
  &.active {
    background: ${(props: ThemedDivProps) =>
      props.theme.colors.background.fifth};
  }
`

const AuthorMetadata = styled.div`
  display: flex;
  align-items: center;
`

const AvatarContainer = styled.span`
  display: inline-flex;
  position: relative;
`

const AuthorBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const AuthorNotes = styled.span`
  position: absolute;
  top: 0;
  right: 0;

  & ${AuthorBadge}:not(:last-child) {
    right: -20%;
  }
`

const AuthorNameSpace = styled.span`
  margin-left: 12px;
`

const InvitedContainer = styled.div`
  display: flex;
  align-items: center;
`

const AuthorDropPreview = styled.div`
  width: 100%;
  background: ${(props: ThemedDivProps) => props.theme.colors.brand.dark};
  height: 1px;
  position: relative;
`

const DragHandle = styled.div`
  margin-left: 12px;

  &:hover {
    cursor: move;
  }
`

type ConnectedProps = ConnectedDragSourceProps & ConnectedDropTargetProps

interface DragObject {
  authorItem: AuthorItem
}

interface Props {
  authorItem: AuthorItem
  onDrop: (oldIndex: number, newIndex: number) => void
  author: Contributor
  authors: Contributor[]
  user: Partial<UserProfileWithAvatar>
  selectedAuthor: Contributor | null
  selectAuthor: (item: Contributor) => void
  sidebarItemDecorator?: JSX.Element | null
  theme: Theme
  components?: AuthorItemComponentOverrides
}

interface State {
  dragPosition: DropSide
}

interface UserProfileWithAvatar {
  _id: string
  avatar: string
}

const dragSourceSpec: DragSourceSpec<Props, DragObject> = {
  beginDrag(props: Props) {
    return {
      authorItem: props.authorItem,
    }
  },
}

const dropTargetSpec: DropTargetSpec<Props> = {
  hover(
    _props: Props,
    monitor: DropTargetMonitor,
    component: React.Component<Props>
  ) {
    if (!monitor.isOver({ shallow: true })) return

    const hoveredNode = findDOMNode(component) as Element
    const { top, bottom } = hoveredNode.getBoundingClientRect()
    const offset = monitor.getClientOffset()

    if (!offset) return

    const verticalMiddle = (bottom - top) / 2
    const verticalHover = offset.y - top

    const item = monitor.getItem() as DragSourceProps

    item.position = verticalHover < verticalMiddle ? 'before' : 'after'

    component.setState({
      dragPosition: item.position,
    })
  },

  canDrop(props: Props, monitor: DropTargetMonitor) {
    const item = monitor.getItem() as DragSourceProps

    return props.authorItem._id !== item.authorItem._id
  },

  drop(props: Props, monitor: DropTargetMonitor) {
    if (monitor.didDrop()) return // already dropped on something else

    const item = monitor.getItem() as DragSourceProps

    const oldIndex = item.authorItem.index
    const newIndex =
      props.authorItem.index + (item.position === 'after' ? 0.5 : -0.5)

    props.onDrop(oldIndex, newIndex)
  },
}

class AuthorComponent extends React.Component<Props & ConnectedProps, State> {
  public state: State = {
    dragPosition: null,
  }

  public render() {
    const { dragPosition } = this.state

    const {
      isDragging,
      connectDragSource,
      connectDropTarget,
      selectAuthor,
      author,
      authors,
      user,
      authorItem,
      sidebarItemDecorator,
      theme,
      components,
    } = this.props

    const opacity = isDragging ? 0 : 1

    const { AuthorName } = {
      ...defaultAuthorItemComponents,
      ...components,
    }

    return connectDragSource(
      <div>
        <AuthorDropPreview
          style={this.topPreviewStyles(this.mightDrop(), dragPosition)}
        />
        {connectDropTarget(
          <div>
            <AuthorItemComponent
              key={author._id}
              onClick={() => selectAuthor(author)}
              className={this.selectedAuthorClass()}
              opacity={opacity}
            >
              <AuthorMetadata>
                <AvatarContainer>
                  <Avatar src={user.avatar} size={36} />
                  <AuthorNotes>
                    {author.isCorresponding && (
                      <AuthorBadge>
                        <CorrespondingAuthorBadge />
                      </AuthorBadge>
                    )}
                    {isJointFirstAuthor(authors, authorItem.index) && (
                      <AuthorBadge>
                        <JointFirstAuthorBadge />
                      </AuthorBadge>
                    )}
                  </AuthorNotes>
                </AvatarContainer>

                <AuthorNameSpace>
                  <AuthorName name={author.bibliographicName} />
                </AuthorNameSpace>
              </AuthorMetadata>

              <InvitedContainer>
                {sidebarItemDecorator}
                {this.selectedAuthorClass() && (
                  <DragHandle>
                    <VerticalEllipsis color={theme.colors.brand.default} />
                  </DragHandle>
                )}
              </InvitedContainer>
            </AuthorItemComponent>
          </div>
        )}
        <AuthorDropPreview
          style={this.bottomPreviewStyles(this.mightDrop(), dragPosition)}
        />
      </div>
    )
  }

  private mightDrop = () =>
    this.props.item && this.props.isOverCurrent && this.props.canDrop

  private selectedAuthorClass = () => {
    const { selectedAuthor, author } = this.props

    return selectedAuthor && selectedAuthor._id === author._id ? 'active' : ''
  }

  private topPreviewStyles = (
    mightDrop: boolean,
    dragPosition: DropSide
  ): React.CSSProperties => ({
    top: '0px',
    visibility: mightDrop && dragPosition === 'before' ? 'visible' : 'hidden',
  })

  private bottomPreviewStyles = (
    mightDrop: boolean,
    dragPosition: DropSide
  ): React.CSSProperties => ({
    bottom: '-1px',
    visibility: mightDrop && dragPosition === 'after' ? 'visible' : 'hidden',
  })
}

const dragSourceCollector: DragSourceCollector<ConnectedDragSourceProps, {}> = (
  connect,
  monitor
) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  item: monitor.getItem() as DragSourceProps,
})

const dropTargetCollector: DropTargetCollector<ConnectedDropTargetProps, {}> = (
  connect,
  monitor
) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
})

const dragType = 'authorItem'

const dragSource = DragSource<Props, ConnectedDragSourceProps, DragObject>(
  dragType,
  dragSourceSpec,
  dragSourceCollector
)

const dropTarget = DropTarget<Props, ConnectedDropTargetProps>(
  dragType,
  dropTargetSpec,
  dropTargetCollector
)

const DraggableAuthorItem = dragSource(dropTarget(AuthorComponent))

export default withTheme(DraggableAuthorItem)
