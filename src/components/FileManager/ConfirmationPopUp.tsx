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

import { Category, Dialog } from '../Dialog'
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
