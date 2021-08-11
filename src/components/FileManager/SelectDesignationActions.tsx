/*!
 * © 2021 Atypon Systems LLC
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
import React, { Dispatch, useContext } from 'react'
import {
  IndicatorContainerProps,
  SelectComponentsConfig,
  ValueType,
} from 'react-select'
import CreatableSelect from 'react-select/creatable'
import styled from 'styled-components'

import BottomArrowIcon from '../icons/BottomArrowIcon'
import { PermissionsContext } from './FileManager'
import { Action, actions } from './FileSectionState'
import { FileSectionType, getUploadFileDesignationList } from './util'

/**
 * This list represents the transition options per item based on the allowed designation and allowed media types.
 */

export interface DesignationOption {
  value: number
  label: string
}
export const SelectDesignationActions: React.FC<{
  fileExtension: string
  fileSection: FileSectionType
  dispatch: Dispatch<Action>
}> = ({ fileExtension, fileSection, dispatch }) => {
  const DropdownIndicator: React.FC<IndicatorContainerProps<
    DesignationOption
  >> = () => (
    <SelectDesignationContainer>
      <BottomArrowIcon />
    </SelectDesignationContainer>
  )
  const reactSelectComponents: SelectComponentsConfig<DesignationOption> = {
    IndicatorsContainer: DropdownIndicator,
  }

  const can = useContext(PermissionsContext)

  const handleInputChange = (value: ValueType<DesignationOption>) => {
    if (value) {
      const selectedDesignation = value as ValueType<DesignationOption>
      if (selectedDesignation && 'value' in selectedDesignation) {
        dispatch(actions.SELECT_DESIGNATION(selectedDesignation.value))
      }
    }
  }

  if (fileExtension) {
    const designationActionsList = getUploadFileDesignationList(
      fileExtension,
      fileSection,
      can
    )

    return (
      <CreatableSelect<DesignationOption>
        closeMenuOnSelect={true}
        options={designationActionsList}
        onChange={handleInputChange}
        placeholder="Select Designation"
        components={reactSelectComponents}
      />
    )
  } else {
    return null
  }
}

const SelectDesignationContainer = styled.div`
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  circle,
  use {
    fill: ${(props) => props.theme.colors.brand.default};
  }

  path {
    mask: none;
  }
`
