/*!
 * © 2024 Atypon Systems LLC
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
  DOMParser,
  DOMSerializer,
  Node as ProsemirrorNode,
  Schema,
} from 'prosemirror-model'

export type Nodes = 'text' | 'rich'
export type Marks =
  | 'bold'
  | 'italic'
  | 'smallcaps'
  | 'subscript'
  | 'superscript'
export type RichTextSchema = Schema<Nodes, Marks>

export const schema: RichTextSchema = new Schema<Nodes, Marks>({
  marks: {
    bold: {
      parseDOM: [
        {
          tag: 'b',
          getAttrs: (dom) =>
            (dom as HTMLElement).style.fontWeight !== 'normal' && null,
        },
        {
          tag: 'strong',
        },
        {
          style: 'font-weight',
          getAttrs: (value) =>
            /^(bold(er)?|[5-9]\d{2,})$/.test(value as string) && null,
        },
      ],
      toDOM() {
        return ['b']
      },
    },
    italic: {
      parseDOM: [
        {
          tag: 'i',
        },
        {
          tag: 'em',
        },
        {
          style: 'font-style=italic',
        },
      ],
      toDOM() {
        return ['i']
      },
    },
    smallcaps: {
      parseDOM: [
        {
          style: 'font-variant=small-caps',
        },
        {
          style: 'font-variant-caps=small-caps',
        },
      ],
      toDOM: () => [
        'span',
        {
          style: 'font-variant:small-caps',
        },
      ],
    },
    subscript: {
      excludes: 'superscript',
      group: 'position',
      parseDOM: [
        {
          tag: 'sub',
        },
        {
          style: 'vertical-align=sub',
        },
      ],
      toDOM: () => ['sub'],
    },
    superscript: {
      excludes: 'subscript',
      group: 'position',
      parseDOM: [
        {
          tag: 'sup',
        },
        {
          style: 'vertical-align=super',
        },
      ],
      toDOM: () => ['sup'],
    },
  },
  nodes: {
    text: {},
    rich: {
      content: 'text*',
      marks: 'bold italic smallcaps subscript superscript',
      parseDOM: [
        {
          tag: 'div',
        },
      ],
      toDOM: () => ['div', 0],
    },
  },
  topNode: 'rich',
})

const parser = DOMParser.fromSchema(schema)
const serializer = DOMSerializer.fromSchema(schema)

export const parseRichText = (value: string) => {
  const node = document.createElement('div')
  node.innerHTML = value
  return parser.parse(node)
}

export const serializeRichText = (node: ProsemirrorNode) => {
  const element = serializer.serializeNode(node) as HTMLElement
  return element.innerHTML
}
