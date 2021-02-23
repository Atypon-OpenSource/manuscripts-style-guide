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
import React from 'react'

import {
  ActionsBox,
  ActionsItem,
  ActionsLabel,
  ActionsSeparator,
} from '../ItemsAction'
import {
  Designation,
  designationWithReadableNamesMap,
  getDesignationName,
} from '../util'

export const DesignationActionsList: React.FC<{
  changeDesignationHandler?: (
    submissionId: string,
    file: File,
    designation: string | undefined
  ) => void
  designationActionsList: Array<Designation>
}> = ({ changeDesignationHandler, designationActionsList }) => {
  const isSupplementaryActionIncluded =
    designationActionsList.indexOf(Designation.Supplementary) !== -1
  const otherFilesActionsList = designationActionsList
    .filter((value) => value !== Designation.Supplementary)
    .map((value) => {
      //todo replace the dummy data with correct one after connect the component on real data and its part from this ticket MAN-610.
      return (
        <ActionsItem
          key={value}
          onClick={() => {
            changeDesignationHandler &&
              changeDesignationHandler(
                'MPManuscript:valid-manuscript-id-1',
                new File([], 'test.txt'),
                getDesignationName(value)
              )
          }}
        >
          {designationWithReadableNamesMap.get(value)}
        </ActionsItem>
      )
    })

  //todo replace the dummy data with correct one after connect the component on real data and its part from this ticket MAN-610.
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
              changeDesignationHandler &&
                changeDesignationHandler(
                  'MPManuscript:valid-manuscript-id-1',
                  new File([], 'test.txt'),
                  getDesignationName(Designation.Supplementary)
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
