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
import React, { useState } from 'react'
import styled from 'styled-components'

import BottomArrowIcon from '../../icons/BottomArrowIcon'
import {
  Designation,
  designationWithReadableNamesMap,
  getDesignationActionsList,
} from '../util'
import { DesignationActionsList } from './DesignationActionsList'

/**
 * This list represents the transition options per item based on the allowed designation and allowed media types.
 */
export const DesignationActions: React.FC<{
  designation?: Designation
  fileExtension?: string
  changeDesignationHandler?: (
    submissionId: string,
    file: File,
    designation: string | undefined
  ) => void
}> = ({ designation, fileExtension, changeDesignationHandler }) => {
  const [isActionsShown, setIsActionsShown] = useState(false)

  const toggleActionsList = () => {
    setIsActionsShown((prevState) => {
      return !prevState
    })
  }

  const hideActionsList = () => {
    setIsActionsShown(false)
  }

  if (designation && fileExtension) {
    const designationActionsList = getDesignationActionsList(
      designation,
      fileExtension
    )

    return (
      <SecondaryActionsContainer
        onClick={toggleActionsList}
        onBlur={hideActionsList}
      >
        <SecondaryActionsText>
          {designationWithReadableNamesMap.get(designation)}
        </SecondaryActionsText>
        <BottomArrowIcon />
        {isActionsShown && (
          <ActionsListContainer>
            <DesignationActionsList
              changeDesignationHandler={changeDesignationHandler}
              designationActionsList={designationActionsList}
            />
          </ActionsListContainer>
        )}
      </SecondaryActionsContainer>
    )
  } else {
    return null
  }
}

const SecondaryActionsContainer = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  font-family: Lato;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #6e6e6e;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`
const SecondaryActionsText = styled.div`
  margin-right: 8px;
`
const ActionsListContainer = styled.div`
  position: absolute;
  top: 40px;
  z-index: 999;
`
