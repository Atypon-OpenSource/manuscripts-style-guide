import {
  Affiliation,
  BibliographicName,
  Contributor,
} from '@manuscripts/manuscripts-json-schema'

import { ConnectDragSource, ConnectDropTarget } from 'react-dnd'

export type AffiliationMap = Map<string, Affiliation>

export interface AuthorItem {
  _id: string
  index: number
  priority: number | null
}

export type DropSide = 'before' | 'after' | null

export type DropHandler = (
  source: AuthorItem,
  target: AuthorItem,
  position: DropSide,
  authors: Contributor[]
) => void

export interface DragSourceProps {
  authorItem: AuthorItem
  position: DropSide
}

export interface ConnectedDragSourceProps {
  connectDragSource: ConnectDragSource
  isDragging: boolean
  // canDrag: boolean
  item: DragSourceProps
}

export interface ConnectedDropTargetProps {
  connectDropTarget: ConnectDropTarget
  isOver: boolean
  isOverCurrent: boolean
  canDrop: boolean
}

export interface AuthorAffiliation {
  ordinal: number
  data: Affiliation
}

interface BibliographicNameValues extends Partial<BibliographicName> {
  _id: string
  objectType: 'MPBibliographicName'
  given: string
  family: string
  suffix?: string
}

interface AffiliationValues extends Partial<Affiliation> {
  _id: string
  address?: string
  city?: string
  institution?: string
  department?: string
}

export interface AuthorValues {
  _id: string
  priority: number
  email: string
  isCorresponding: boolean
  isJointContributor: boolean
  bibliographicName: BibliographicNameValues
  affiliations: AffiliationValues[]
  // grants: GrantValues[]
}
