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
import React, { Dispatch, useState } from 'react'
import styled from 'styled-components'

import BottomArrowIcon from '../../icons/BottomArrowIcon'
import { ConfirmationPopUp } from '../ConfirmationPopUp'
import { Action } from '../FileSectionState'
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
  handleChangeDesignation?: (
    submissionId: string,
    typeId: string,
    name: string
  ) => Promise<boolean>
  submissionId: string
  fileName: string
  dispatch?: Dispatch<Action>
}> = ({
  designation,
  fileExtension,
  handleChangeDesignation,
  submissionId,
  fileName,
  dispatch,
}) => {
  const [isActionsShown, setIsActionsShown] = useState(false)
  const [confirmationPopUpData, setConfirmationPopUpData] = useState({
    isConfirmationPopUpOpen: false,
    confirmationPopUpMessage: '',
    confirmationPopUpHeader: '',
    selectedDesignation: '',
  })

  const toggleActionsList = () => {
    setIsActionsShown((prevState) => {
      return !prevState
    })
  }

  const hideActionsList = () => {
    setIsActionsShown(false)
  }

  if (!designation || !fileExtension) {
    return null
  }

  const designationActionsList = getDesignationActionsList(
    designation,
    fileExtension
  )
  const handleOpenConfirmationPopup = (
    popupHeader: string,
    popupMessage: string,
    designation: string
  ) => {
    setConfirmationPopUpData({
      confirmationPopUpMessage: popupMessage,
      confirmationPopUpHeader: popupHeader,
      isConfirmationPopUpOpen: true,
      selectedDesignation: designation,
    })
  }
  const handleMoveAction = () => {
    handleChangeDesignation &&
      handleChangeDesignation(
        submissionId,
        confirmationPopUpData.selectedDesignation,
        fileName
      )
    handleCloseAction()
  }
  const handleCloseAction = () => {
    setConfirmationPopUpData({
      confirmationPopUpMessage: '',
      confirmationPopUpHeader: '',
      selectedDesignation: '',
      isConfirmationPopUpOpen: false,
    })
  }

  return (
    <>
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
              handleChangeDesignation={handleChangeDesignation}
              designationActionsList={designationActionsList}
              submissionId={submissionId}
              fileName={fileName}
              designation={designation}
              dispatch={dispatch}
              handleOpenConfirmationPopup={handleOpenConfirmationPopup}
            />
          </ActionsListContainer>
        )}
      </SecondaryActionsContainer>
      {confirmationPopUpData.isConfirmationPopUpOpen && (
        <ConfirmationPopUp
          popupHeader={
            confirmationPopUpData.confirmationPopUpHeader !== undefined
              ? confirmationPopUpData.confirmationPopUpHeader
              : ''
          }
          popUpMessage={
            confirmationPopUpData.confirmationPopUpMessage !== undefined
              ? confirmationPopUpData.confirmationPopUpMessage
              : ''
          }
          isOpen={confirmationPopUpData.isConfirmationPopUpOpen}
          handleClose={handleCloseAction}
          handleMove={handleMoveAction}
        />
      )}
    </>
  )
}

const SecondaryActionsContainer = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  padding: 0;
  font-family: ${(props) => props.theme.font.family.Lato};
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.text.secondary};
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
