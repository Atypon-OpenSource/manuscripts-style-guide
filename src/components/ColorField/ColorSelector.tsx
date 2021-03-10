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

import React, { useCallback, useState } from 'react'
import { ChromePicker, ColorResult } from 'react-color'
import { Manager, Popper, Reference } from 'react-popper'
import styled from 'styled-components'

import { PrimaryButton, SecondaryButton } from '../Button'

export const ColorSelector: React.FC<{
  handleChange: (value: string) => void
}> = ({ handleChange }) => {
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('#ffffff')

  const toggleOpen = useCallback(() => {
    setOpen((open) => !open)
  }, [setOpen])

  const handleSave = useCallback(() => {
    if (color) {
      handleChange(color)
    }

    setOpen(false)
  }, [color, handleChange, setOpen])

  const handleColorChange = useCallback(
    (color: ColorResult) => {
      setColor(color.hex)
    },
    [setColor]
  )

  const handleCancel = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <AddButton ref={ref} type={'button'} onClick={toggleOpen}>
            +
          </AddButton>
        )}
      </Reference>

      {open && (
        <Popper placement={'left'}>
          {({ ref, style, placement }) => (
            <div
              ref={ref}
              style={{
                ...style,
                zIndex: 10,
              }}
              data-placement={placement}
            >
              <PopperContent>
                <ChromePicker
                  onChangeComplete={handleColorChange}
                  color={color}
                />

                <Actions>
                  <PrimaryButton mini={true} onClick={handleSave}>
                    Add color
                  </PrimaryButton>

                  <SecondaryButton mini={true} onClick={handleCancel}>
                    Cancel
                  </SecondaryButton>
                </Actions>
              </PopperContent>
            </div>
          )}
        </Popper>
      )}
    </Manager>
  )
}

const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PopperContent = styled.div`
  border: 1px solid ${(props) => props.theme.colors.text.muted};
  border-radius: ${(props) => props.theme.grid.radius.small};
  box-shadow: ${(props) => props.theme.shadow.dropShadow};
  background: ${(props) => props.theme.colors.background.primary};
  padding: ${(props) => props.theme.grid.unit * 2}px;

  .chrome-picker {
    box-shadow: none !important;
  }
`

const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 50%;
  width: ${(props) => props.theme.grid.unit * 4}px;
  height: ${(props) => props.theme.grid.unit * 4}px;
  margin: 2px;
  cursor: pointer;
  line-height: 0;
  font-size: ${(props) => props.theme.font.size.medium};

  :hover {
    border-color: ${(props) => props.theme.colors.border.secondary};
  }

  :focus {
    outline: none;
  }
`
