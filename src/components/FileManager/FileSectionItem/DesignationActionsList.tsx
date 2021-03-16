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
import React, { Dispatch } from 'react'

import { Action, actions } from '../FileSectionState'
import {
  ActionsBox,
  ActionsItem,
  ActionsLabel,
  ActionsSeparator,
} from '../ItemsAction'
import {
  Designation,
  designationWithFileSectionsMap,
  designationWithReadableNamesMap,
  FileSectionType,
  getDesignationName,
} from '../util'

export const DesignationActionsList: React.FC<{
  changeDesignationHandler?: (
    submissionId: string,
    typeId: string,
    name: string
  ) => void
  designationActionsList: Array<Designation>
  submissionId: string
  fileName: string
  designation?: Designation
  dispatch?: Dispatch<Action>
}> = ({
  changeDesignationHandler,
  designationActionsList,
  submissionId,
  fileName,
  designation,
  dispatch,
}) => {
  const handleChangeOtherFilesTabDesignation = (
    designation: Designation,
    isMoveInOtherFileSection: boolean,
    confirmationPopupHeader: string,
    confirmationPopupMessage: string,
    successMoveMessage: string
  ) => {
    if (isMoveInOtherFileSection) {
      if (dispatch) {
        dispatch(
          actions.MOVE_FILE(
            submissionId,
            getDesignationName(designation),
            fileName,
            confirmationPopupHeader,
            confirmationPopupMessage,
            successMoveMessage
          )
        )
      }
    } else {
      changeDesignationHandler &&
        changeDesignationHandler(
          submissionId,
          getDesignationName(designation),
          fileName
        )
    }
  }
  const isSupplementaryActionIncluded =
    designationActionsList.indexOf(Designation.Supplementary) !== -1
  const otherFilesActionsList = designationActionsList
    .filter((value) => value !== Designation.Supplementary)
    .map((value) => {
      return (
        <ActionsItem
          key={value}
          onClick={() => {
            let isMoveToOtherFileSection = true
            if (designation) {
              isMoveToOtherFileSection =
                designationWithFileSectionsMap.get(designation) !==
                FileSectionType.OtherFile
            }
            handleChangeOtherFilesTabDesignation(
              value,
              isMoveToOtherFileSection,
              'Are you sure you want to move this file to "Other"?',
              'The file will be removed from the "Supplementary" and added to "Other".',
              'Supplementary file successfully moved to other files'
            )
          }}
        >
          {designationWithReadableNamesMap.get(value)}
        </ActionsItem>
      )
    })

  return (
    <ActionsBox>
      {otherFilesActionsList.length > 0 && (
        <>
          <ActionsLabel>Other Files</ActionsLabel>
          {otherFilesActionsList}
        </>
      )}

      {isSupplementaryActionIncluded && (
        <>
          <ActionsSeparator />
          <ActionsItem
            onClick={() => {
              let isMoveToOtherFileSection = true
              if (designation) {
                isMoveToOtherFileSection =
                  designationWithFileSectionsMap.get(designation) !==
                  FileSectionType.Supplements
              }
              handleChangeOtherFilesTabDesignation(
                Designation.Supplementary,
                isMoveToOtherFileSection,
                'Are you sure you want to move this file to "Supplementary"?',
                'The file will be removed from the "Other" and added to "Supplementary".',
                'File successfully moved to Supplementary files'
              )
            }}
          >
            {designationWithReadableNamesMap.get(Designation.Supplementary)}
          </ActionsItem>
        </>
      )}
    </ActionsBox>
  )
}
