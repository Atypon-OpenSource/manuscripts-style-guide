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
import { baseKeymap, toggleMark } from 'prosemirror-commands'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { parseRichText, schema, serializeRichText } from './schema'

const Container = styled.div`
  & .ProseMirror {
    font-family: ${(props) => props.theme.font.family.sans};
    font-size: ${(props) => props.theme.font.size.medium};
    line-height: 1.25;
    color: ${(props) => props.theme.colors.text.primary};
    border-radius: ${(props) => props.theme.grid.radius.small};
    border: 1px solid ${(props) => props.theme.colors.text.muted};
    padding: ${(props) => props.theme.grid.unit * 2}px
      ${(props) => props.theme.grid.unit * 3}px;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.border.field.hover};
      background-color: ${(props) => props.theme.colors.background.fifth};
    }
  }
`

export interface RichTextFieldProps {
  value: string
  onChange?: (value: string) => void
}

export const RichTextField: React.FC<RichTextFieldProps> = ({
  value,
  onChange,
}) => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dispatch = (view: EditorView, tr: Transaction) => {
      const { state, transactions } = view.state.applyTransaction(tr)
      view.updateState(state)
      if (onChange && transactions.some((tr) => tr.docChanged)) {
        const value = serializeRichText(state.doc)
        onChange(value)
      }
    }

    const state = EditorState.create({
      doc: parseRichText(value),
      plugins: [
        history(),
        keymap(baseKeymap),
        keymap({
          'Mod-b': toggleMark(schema.marks.bold),
          'Mod-i': toggleMark(schema.marks.italic),
          'Mod-y': redo,
          'Mod-z': undo,
        }),
      ],
      schema,
    })

    const view: EditorView = new EditorView(null, {
      editable: () => true,
      state,
      dispatchTransaction: (tr) => dispatch(view, tr),
    })

    editorRef.current && editorRef.current.appendChild(view.dom)
  }, [value, onChange])

  return <Container ref={editorRef}></Container>
}
