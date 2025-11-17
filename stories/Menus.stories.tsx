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
import type { Meta, StoryObj } from '@storybook/react'

import { Menus } from '../src/components/Menus/Menus'
import { useMenus } from '../src/hooks/use-menus'
import { MenuSpec } from '../src/lib/menus'

const meta: Meta = {
  title: 'Menus',
}

export default meta
type Story = StoryObj

const MenusComponent = () => {
  const edit: MenuSpec = {
    id: 'edit',
    label: 'Edit',
    isEnabled: true,
    submenu: [
      {
        id: 'edit-undo',
        role: 'undo',
        label: 'Undo',
        shortcut: {
          mac: 'CommandOrControl+Z',
          pc: 'CommandOrControl+Z',
        },
        isEnabled: true,
        run: () => console.log('undo'),
      },
      {
        id: 'edit-redo',
        role: 'redo',
        label: 'Redo',
        shortcut: {
          mac: 'Shift+CommandOrControl+Z',
          pc: 'CommandOrControl+Y',
        },
        isEnabled: true,
        run: () => console.log('redo'),
      },
      {
        role: 'separator',
      },
      {
        id: 'edit-delete',
        role: 'delete',
        label: 'Delete',
        isEnabled: false,
        run: () => console.log('delete'),
      },
    ],
  }

  const insert: MenuSpec = {
    id: 'insert',
    label: 'Insert',
    isEnabled: true,
    submenu: [
      {
        id: 'insert-section',
        label: 'Section',
        shortcut: {
          mac: 'CommandOrControl+Enter',
          pc: 'CommandOrControl+Enter',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'insert-graphical-abstract',
        label: 'Graphical Abstract',
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'insert-subsection',
        label: 'Subsection',
        shortcut: {
          mac: 'Shift+CommandOrControl+Enter',
          pc: 'Shift+CommandOrControl+Enter',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'insert-paragraph',
        label: 'Paragraph',
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        role: 'separator',
      },
      {
        id: 'insert-blockquote',
        label: 'Block Quote',
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'insert-pullquote',
        label: 'Pull Quote',
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        role: 'separator',
      },
      {
        id: 'insert-figure-element',
        label: 'Figure Panel',
        shortcut: {
          mac: 'Option+CommandOrControl+P',
          pc: 'CommandOrControl+Option+P',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'insert-table-element',
        label: 'Table',
        shortcut: {
          mac: 'Option+CommandOrControl+T',
          pc: 'CommandOrControl+Option+T',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        role: 'separator',
      },
      {
        id: 'insert-link',
        label: 'Link',
        shortcut: {
          mac: 'Option+CommandOrControl+H',
          pc: 'CommandOrControl+Option+H',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        role: 'separator',
      },
      {
        id: 'insert-equation',
        label: 'Equation',
        shortcut: {
          mac: 'Option+CommandOrControl+E',
          pc: 'CommandOrControl+Option+E',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'insert-inline-equation',
        label: 'Inline Equation',
        shortcut: {
          mac: 'Shift+Option+CommandOrControl+E',
          pc: 'Shift+CommandOrControl+Option+E',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        role: 'separator',
      },
      {
        id: 'insert-citation',
        label: 'Citation',
        shortcut: {
          mac: 'Option+CommandOrControl+C',
          pc: 'CommandOrControl+Option+C',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'insert-cross-reference',
        label: 'Cross-reference',
        shortcut: {
          mac: 'Option+CommandOrControl+R',
          pc: 'CommandOrControl+Option+R',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'insert-footnote',
        label: 'Footnote',
        shortcut: {
          mac: 'Option+CommandOrControl+F',
          pc: 'CommandOrControl+Option+F',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'insert-comment',
        label: 'Comment',
        isEnabled: true,
        run: () => console.log(''),
      },
    ],
  }

  const format: MenuSpec = {
    id: 'format',
    label: 'Format',
    isEnabled: true,
    submenu: [
      {
        id: 'format-bold',
        label: 'Bold',
        shortcut: {
          mac: 'CommandOrControl+B',
          pc: 'CommandOrControl+B',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'format-italic',
        label: 'Italic',
        shortcut: {
          mac: 'CommandOrControl+I',
          pc: 'CommandOrControl+I',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'format-strikethrough',
        label: 'Strikethrough',
        shortcut: {
          mac: 'CommandOrControl+Shift+X',
          pc: 'CommandOrControl+Shift+X',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'format-underline',
        label: 'Underline',
        shortcut: {
          mac: 'CommandOrControl+U',
          pc: 'CommandOrControl+U',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        role: 'separator',
      },
      {
        id: 'format-superscript',
        label: 'Superscript',
        shortcut: {
          mac: 'Option+CommandOrControl+=',
          pc: 'CommandOrControl+Option+=',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        id: 'format-subscript',
        label: 'Subscript',
        shortcut: {
          mac: 'Option+CommandOrControl+-',
          pc: 'CommandOrControl+Option+-',
        },
        isEnabled: true,
        run: () => console.log(''),
      },
      {
        role: 'separator',
      },
      {
        role: 'separator',
      },
      {
        id: 'format-table',
        label: 'Table',
        isEnabled: true,
        submenu: [
          {
            id: 'format-table-add-row-before',
            label: 'Add Row Above',
            isEnabled: true,
            run: () => console.log(''),
          },
          {
            id: 'format-table-add-row-after',
            label: 'Add Row Below',
            isEnabled: true,
            run: () => console.log(''),
          },
          {
            id: 'format-table-delete-row',
            label: 'Delete Row',
            isEnabled: true,
            run: () => console.log(''),
          },
          {
            role: 'separator',
          },
          {
            id: 'format-table-add-column-before',
            label: 'Add Column Before',
            isEnabled: true,
            run: () => console.log(''),
          },
          {
            id: 'format-table-add-column-after',
            label: 'Add Column After',
            isEnabled: true,
            run: () => console.log(''),
          },
          {
            id: 'format-table-delete-column',
            label: 'Delete Column',
            isEnabled: true,
            run: () => console.log(''),
          },
          {
            role: 'separator',
          },
          {
            id: 'merge-cells',
            label: 'Merge Cells',
            isEnabled: true,
            run: () => console.log(''),
          },
          {
            id: 'split-cells',
            label: 'Split Cell',
            isEnabled: true,
            run: () => console.log(''),
          },
        ],
      },
    ],
  }

  const { menus, ref, handleClick } = useMenus([edit, insert, format])

  return <Menus menus={menus} innerRef={ref} handleClick={handleClick} />
}

export const Menus_: Story = {
  render: () => <MenusComponent />,
}
