/*!
 * © 2020 Atypon Systems LLC
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

import { ManuscriptNode } from '@manuscripts/manuscript-transform'
import {
  BibliographicName,
  CommentAnnotation,
  ManuscriptNote,
} from '@manuscripts/manuscripts-json-schema'

export type CommentType = ManuscriptNote | CommentAnnotation

export interface CommentData {
  comment: CommentType
  children: CommentType[]
}

const oldestFirst = (a: CommentType, b: CommentType) =>
  Number(a.createdAt) - Number(b.createdAt)

type CommentsMap = Map<string, CommentData>

const buildCommentsMap = (comments: CommentType[]) => {
  const map: CommentsMap = new Map()

  for (const comment of comments.sort(oldestFirst)) {
    const data = map.get(comment.target)

    if (data) {
      // child
      map.set(comment.target, {
        comment: data.comment,
        children: data.children.concat(comment),
      })
    } else {
      // parent
      map.set(comment._id, {
        comment,
        children: [],
      })
    }
  }

  return map
}

type TargetsMap = Map<string, CommentData[]>

const buildTargetsMap = (commentsMap: CommentsMap) => {
  const map: TargetsMap = new Map()

  for (const commentData of commentsMap.values()) {
    const { target } = commentData.comment

    const data = map.get(target)

    if (data) {
      map.set(target, data.concat(commentData))
    } else {
      map.set(target, [commentData])
    }
  }

  return map
}

type CommentsTreeMap = Map<string, CommentData[]>

const buildCommentsTreeMap = (doc: ManuscriptNode, targetsMap: TargetsMap) => {
  const map: CommentsTreeMap = new Map()

  doc.descendants((node: ManuscriptNode) => {
    const targetID = node.attrs.rid || node.attrs.id

    if (targetID) {
      const target = targetsMap.get(targetID)

      if (target) {
        map.set(targetID, target)
      }
    }
  })

  // TODO: what does this do?
  if (map.size < targetsMap.size) {
    for (const commentsData of targetsMap.values()) {
      const comments = commentsData
      if (
        !map.has(comments[0].comment.target) &&
        comments[0].comment.target.startsWith('MPHighlight') &&
        comments[0].comment.originalText
      ) {
        map.set(comments[0].comment.target, comments)
      }
    }
  }
  return map
}

const buildNotesTreeMap = (doc: ManuscriptNode, targetsMap: TargetsMap) => {
  const map: CommentsTreeMap = new Map()

  for (const notesData of targetsMap.values()) {
    const notes = notesData
    map.set(notes[0].comment.target, notes)
  }
  return map
}

export const buildCommentTree = (
  doc: ManuscriptNode,
  comments: CommentType[]
): CommentsTreeMap => {
  const commentsMap = buildCommentsMap(comments)
  const targetsMap = buildTargetsMap(commentsMap)

  return buildCommentsTreeMap(doc, targetsMap)
}

export const buildNoteTree = (
  doc: ManuscriptNode,
  comments: CommentType[]
): CommentsTreeMap => {
  const commentsMap = buildCommentsMap(comments)
  const targetsMap = buildTargetsMap(commentsMap)

  return buildNotesTreeMap(doc, targetsMap)
}

export const buildName = (
  name: Pick<BibliographicName, 'given' | 'family'>
): string => [name.given, name.family].filter((item) => item).join(' ')