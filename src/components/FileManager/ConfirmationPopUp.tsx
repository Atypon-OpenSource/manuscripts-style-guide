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
import { ObjectTypes, Supplement } from '@manuscripts/json-schema'
import {
  buildSupplementaryMaterial,
  getModelsByType,
} from '@manuscripts/transform'
import React, { Dispatch, useCallback, useContext } from 'react'

import { Category, Dialog } from '../Dialog'
import { FileManagerContext } from './FileManagerProvider'
import { Action, actions } from './FileSectionState'
import { FileSectionType } from './util'
/**
 *  This component represents the other files in the file section.
 */
export const ConfirmationPopUp: React.FC<{
  popupHeader: string
  popUpMessage: string
  isOpen: boolean
  handleClose: () => void
  handleMove: () => void
}> = ({ popupHeader, popUpMessage, isOpen, handleClose, handleMove }) => {
  return (
    <Dialog
      isOpen={isOpen}
      category={Category.confirmation}
      header={popupHeader}
      message={popUpMessage}
      actions={{
        primary: {
          action: handleMove,
          title: 'Move',
        },
        secondary: {
          action: handleClose,
          title: 'Cancel',
        },
      }}
    />
  )
}

export const MoveFilePopup: React.FC<{ dispatch: Dispatch<Action> }> = ({
  dispatch,
}) => {
  const {
    moveFilePopup: { isOpen, fileSection, attachmentId },
    saveModel,
    deleteModel,
    modelMap,
    getAttachments,
    setMoveFilePopupData,
  } = useContext(FileManagerContext)

  const isSupplement = fileSection === FileSectionType.Supplements

  const message = {
    popupHeader: `Are you sure you want to move this file to “${
      (isSupplement && 'Supplements') || 'Other files'
    }”?`,
    popUpMessage: `The file will be removed from the “${
      (isSupplement && 'Supplements') || 'Other files'
    }” and added to “${(!isSupplement && 'Supplements') || 'Other files'}”.`,
  }

  const closePopup = useCallback(
    () =>
      setMoveFilePopupData({
        isOpen: false,
        fileSection: fileSection,
      }),
    [fileSection, setMoveFilePopupData]
  )

  const showSuccessMessage = useCallback(
    () =>
      dispatch(
        actions.HANDLE_SUCCESS_MESSAGE(
          `File moved to ${(isSupplement && 'Other files') || 'Supplements'}.`,
          fileSection
        )
      ),
    [dispatch, fileSection, isSupplement]
  )

  const moveToSupplement = useCallback(async () => {
    closePopup()

    const attachment = getAttachments().find(({ id }) => id === attachmentId)

    if (!attachment) {
      return
    }

    const model = buildSupplementaryMaterial(
      attachment.name,
      `attachment:${attachment.id}`
    )

    await saveModel<Supplement>({
      ...model,
      title: attachment.name,
      href: `attachment:${attachment.id}`,
    })

    showSuccessMessage()
  }, [getAttachments, saveModel, showSuccessMessage, closePopup, attachmentId])

  const moveSupplementToOtherFiles = useCallback(async () => {
    closePopup()

    const model = getModelsByType<Supplement>(
      modelMap,
      ObjectTypes.Supplement
    ).find(({ href }) => href?.replace('attachment:', '') === attachmentId)

    if (!model) {
      return
    }

    await deleteModel(model._id)

    showSuccessMessage()
  }, [attachmentId, closePopup, deleteModel, modelMap, showSuccessMessage])

  return (
    <>
      <ConfirmationPopUp
        isOpen={isOpen}
        {...message}
        handleMove={() =>
          (!isSupplement && moveToSupplement()) || moveSupplementToOtherFiles()
        }
        handleClose={closePopup}
      />
    </>
  )
}
