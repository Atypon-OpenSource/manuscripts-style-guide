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
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { useEffect, useRef } from 'react'

import { parseRichText, schema } from './schema'

export interface RichTextProps {
  className?: string
  value: string
}

export const RichText: React.FC<RichTextProps> = ({ className, value }) => {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const state = EditorState.create({
      doc: parseRichText(value),
      schema,
    })

    const view = new EditorView(null, {
      editable: () => false,
      state,
    })

    editorRef.current && editorRef.current.replaceChildren(view.dom)
  }, [value])

  return <div className={className} ref={editorRef}></div>
}
