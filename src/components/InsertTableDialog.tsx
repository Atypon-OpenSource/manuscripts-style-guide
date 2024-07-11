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

import React, { useState } from 'react'
import Select, { OptionProps } from 'react-select'
import styled from 'styled-components'

import { TableConfig } from '../lib/menus'
import { CheckboxField, CheckboxLabel } from './Checkbox'
import { Category, Dialog } from './Dialog'

const Label = styled.div`
  padding-right: 16px;
  width: 150px;
`
const SelectContainer = styled.div`
  width: 182px;
  height: 30px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
`
const OptionWrapper = styled.div<{ focused?: boolean }>`
  padding-left: ${(props) => props.theme.grid.unit * 4}px;
  padding-top: ${(props) => props.theme.grid.unit * 2}px;
  padding-bottom: ${(props) => props.theme.grid.unit * 2}px;

  background-color: ${(props) =>
    props.focused ? props.theme.colors.background.fifth : 'transparent'};

  &:hover {
    background-color: ${(props) => props.theme.colors.background.fifth};
  }
`

export const InsertTableDialog: React.FC<{
  run: (tableConfig: TableConfig) => void
  open: boolean
  onClose: () => void
}> = ({ run, open, onClose }) => {
  const [numberOfColumns, setNumColumns] = useState({ value: 4, label: `4` })
  const [numberOfRows, setNumRows] = useState({ value: 4, label: `4` })
  const [includeHeader, setIncludeHeader] = useState(true)

  type OptionType = { value: number; label: string }

  const handleColumnChange = (newValue: OptionType) => {
    setNumColumns(newValue)
  }

  const handleRowChange = (newValue: OptionType) => {
    setNumRows(newValue)
  }

  const options: OptionType[] = Array.from({ length: 20 }, (_, index) => ({
    value: index + 1,
    label: `${index + 1}`,
  }))

  const OptionComponent: React.FC<OptionProps<OptionType, false>> = ({
    innerProps,
    data,
  }) => {
    return (
      <OptionWrapper {...innerProps} ref={null}>
        {data.label}
      </OptionWrapper>
    )
  }

  const insertTableDialogActions = {
    primary: {
      action: () => {
        const tableConfig = {
          numberOfColumns: numberOfColumns.value,
          numberOfRows: numberOfRows.value,
          includeHeader,
        }
        run(tableConfig)
        onClose()
      },
      title: 'Create table',
    },
    secondary: {
      action: onClose,
      title: 'Cancel',
    },
  }

  return (
    <Dialog
      isOpen={open}
      actions={insertTableDialogActions}
      category={Category.confirmation}
      header={'Insert table'}
      message={''}
    >
      <>
        <>
          <Container>
            <Label>Number of columns:</Label>
            <SelectContainer>
              <Select<OptionType>
                onChange={(newValue) =>
                  handleColumnChange(newValue as OptionType)
                }
                value={numberOfColumns}
                options={options}
                components={{
                  Option: OptionComponent,
                }}
                menuPosition="fixed"
                maxMenuHeight={150}
              />
            </SelectContainer>
          </Container>
          <Container>
            <Label>Number of rows:</Label>
            <SelectContainer>
              <Select<OptionType>
                onChange={(newValue) => handleRowChange(newValue as OptionType)}
                value={numberOfRows}
                options={options}
                components={{
                  Option: OptionComponent,
                }}
                menuPosition="fixed"
                maxMenuHeight={150}
              />
            </SelectContainer>
          </Container>
        </>
        <CheckboxLabel>
          <CheckboxField
            name={'include-header'}
            checked={includeHeader}
            onChange={(e) => {
              setIncludeHeader(e.target.checked)
            }}
          />
          <div>Include header row</div>
        </CheckboxLabel>
      </>
    </Dialog>
  )
}
