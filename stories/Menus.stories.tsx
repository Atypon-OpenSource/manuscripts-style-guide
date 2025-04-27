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
import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Menus } from '../src/components/Menus/Menus'
import { useMenus } from '../src/hooks/use-menus'
import { MenuSpec } from '../src/lib/menus'

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
      run: action('edit-undo'),
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
      run: action('edit-redo'),
    },
    {
      role: 'separator',
    },
    {
      id: 'edit-delete',
      role: 'delete',
      label: 'Delete',
      isEnabled: false,
      run: action('edit-delete'),
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
      run: action('insert-section'),
    },
    {
      id: 'insert-graphical-abstract',
      label: 'Graphical Abstract',
      isEnabled: true,
      run: action('insert-graphical-abstract'),
    },
    {
      id: 'insert-subsection',
      label: 'Subsection',
      shortcut: {
        mac: 'Shift+CommandOrControl+Enter',
        pc: 'Shift+CommandOrControl+Enter',
      },
      isEnabled: true,
      run: action('insert-subsection'),
    },
    {
      id: 'insert-paragraph',
      label: 'Paragraph',
      isEnabled: true,
      run: action('insert-paragraph'),
    },
    {
      role: 'separator',
    },
    {
      id: 'insert-blockquote',
      label: 'Block Quote',
      isEnabled: true,
      run: action('insert-blockquote'),
    },
    {
      id: 'insert-pullquote',
      label: 'Pull Quote',
      isEnabled: true,
      run: action('insert-pullquote'),
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
      run: action('insert-figure-element'),
    },
    {
      id: 'insert-table-element',
      label: 'Table',
      shortcut: {
        mac: 'Option+CommandOrControl+T',
        pc: 'CommandOrControl+Option+T',
      },
      isEnabled: true,
      run: action('insert-table-element'),
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
      run: action('insert-link'),
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
      run: action('insert-equation'),
    },
    {
      id: 'insert-inline-equation',
      label: 'Inline Equation',
      shortcut: {
        mac: 'Shift+Option+CommandOrControl+E',
        pc: 'Shift+CommandOrControl+Option+E',
      },
      isEnabled: true,
      run: action('insert-inline-equation'),
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
      run: action('insert-citation'),
    },
    {
      id: 'insert-cross-reference',
      label: 'Cross-reference',
      shortcut: {
        mac: 'Option+CommandOrControl+R',
        pc: 'CommandOrControl+Option+R',
      },
      isEnabled: true,
      run: action('insert-cross-reference'),
    },
    {
      id: 'insert-footnote',
      label: 'Footnote',
      shortcut: {
        mac: 'Option+CommandOrControl+F',
        pc: 'CommandOrControl+Option+F',
      },
      isEnabled: true,
      run: action('insert-footnote'),
    },
    {
      id: 'insert-comment',
      label: 'Comment',
      isEnabled: true,
      run: action('insert-comment'),
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
      run: action('format-bold'),
    },
    {
      id: 'format-italic',
      label: 'Italic',
      shortcut: {
        mac: 'CommandOrControl+I',
        pc: 'CommandOrControl+I',
      },
      isEnabled: true,
      run: action('format-italic'),
    },
    {
      id: 'format-strikethrough',
      label: 'Strikethrough',
      shortcut: {
        mac: 'CommandOrControl+Shift+X',
        pc: 'CommandOrControl+Shift+X',
      },
      isEnabled: true,
      run: action('format-strikethrough'),
    },
    {
      id: 'format-underline',
      label: 'Underline',
      shortcut: {
        mac: 'CommandOrControl+U',
        pc: 'CommandOrControl+U',
      },
      isEnabled: true,
      run: action('format-underline'),
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
      run: action('format-superscript'),
    },
    {
      id: 'format-subscript',
      label: 'Subscript',
      shortcut: {
        mac: 'Option+CommandOrControl+-',
        pc: 'CommandOrControl+Option+-',
      },
      isEnabled: true,
      run: action('format-subscript'),
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
          run: action('format-table-add-row-before'),
        },
        {
          id: 'format-table-add-row-after',
          label: 'Add Row Below',
          isEnabled: true,
          run: action('format-table-add-row-after'),
        },
        {
          id: 'format-table-delete-row',
          label: 'Delete Row',
          isEnabled: true,
          run: action('format-table-delete-row'),
        },
        {
          role: 'separator',
        },
        {
          id: 'format-table-add-column-before',
          label: 'Add Column Before',
          isEnabled: true,
          run: action('format-table-add-column-before'),
        },
        {
          id: 'format-table-add-column-after',
          label: 'Add Column After',
          isEnabled: true,
          run: action('format-table-add-column-after'),
        },
        {
          id: 'format-table-delete-column',
          label: 'Delete Column',
          isEnabled: true,
          run: action('format-table-delete-column'),
        },
        {
          role: 'separator',
        },
        {
          id: 'merge-cells',
          label: 'Merge Cells',
          isEnabled: true,
          run: action('merge-cells'),
        },
        {
          id: 'split-cells',
          label: 'Split Cell',
          isEnabled: true,
          run: action('split-cells'),
        },
      ],
    },
  ],
}

const MenusDemo = () => {
  const { menus, ref, handleClick } = useMenus([edit, insert, format])
  return <Menus menus={menus} innerRef={ref} handleClick={handleClick} />
}

const meta = {
  title: 'Menus',
  component: MenusDemo,
  tags: ['autodocs'],
} satisfies Meta<typeof MenusDemo>

export default meta
type Story = StoryObj<typeof MenusDemo>

export const Default: Story = {}
