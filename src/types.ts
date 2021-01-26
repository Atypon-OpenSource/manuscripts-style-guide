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

interface BibliographicNameValues extends Partial<BibliographicName> {
  _id: string
  objectType: 'MPBibliographicName'
  given: string
  family: string
  suffix?: string
}

export interface AffiliationGeneric
  extends Omit<Affiliation, 'manuscriptID' | 'objectType'> {
  manuscriptID?: string
}

export interface AuthorAffiliation {
  ordinal: number
  data: Affiliation | AffiliationGeneric
}

export interface AuthorValues {
  _id: string
  priority: number
  email: string
  isCorresponding: boolean
  isJointContributor: boolean
  bibliographicName: BibliographicNameValues
  role: string // e.g. 'author'
  // category: string // e.g. 'MPContributorCategory:1' (Author/Editor/Reviewer)
  roles: string[] // MPContributorRole ids
  ORCIDIdentifier: string
  contribution: string // free text contribution description
}

export interface AffiliationOption {
  value: string
  label: string
}
