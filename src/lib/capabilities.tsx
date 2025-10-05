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
import { Project, UserProfile } from '@manuscripts/transform'
import React from 'react'

export type Capabilities = {
  /* track changes */
  handleSuggestion: boolean
  editWithoutTracking: boolean
  rejectOwnSuggestion: boolean

  /* comments */
  handleOwnComments: boolean
  resolveOwnComment: boolean
  handleOthersComments: boolean
  resolveOthersComment: boolean
  createComment: boolean

  /* file handling */
  downloadFiles: boolean
  changeDesignation: boolean
  moveFile: boolean
  replaceFile: boolean
  uploadFile: boolean
  detachFile: boolean
  setMainManuscript: boolean

  /* editor */
  formatArticle: boolean
  editArticle: boolean
  editMetadata: boolean
  editCitationsAndRefs: boolean
  seeEditorToolbar: boolean
  seeReferencesButtons: boolean
}

enum Actions {
  // proceed = 'proceed',
  updateAttachment = 'update-attachment',
  updateDueDate = 'update-due-date',
  addNote = 'add-note',
  setMainManuscript = 'set-main-manuscript',
  editWithoutTracking = 'edit-without-tracking',
}

export interface ProviderProps {
  project?: Project
  profile?: UserProfile
  role?: string
  permittedActions?: string[]
  children?: React.ReactNode
  isViewingMode?: boolean
}
// all arguments are options to avoid empty object pass one context creation and
// thusly simplify the consuming of the context: it will help avoiding conditional
// checks which is helpful because there maybe numerous checks in on component

export const getCapabilities = (
  project?: Project,
  profile?: UserProfile,
  role?: ProviderProps['role'],
  actions?: string[],
  isViewingMode?: boolean
): Capabilities => {
  const userID = profile?.userID

  const isMemberOf = (group?: string[]) =>
    group?.includes(userID ?? '') ?? false

  const isOwner = isMemberOf(project?.owners)
  const isEditor = isMemberOf(project?.editors)
  const isWriter = isMemberOf(project?.writers)
  const isAnnotator = isMemberOf(project?.annotators)
  const isViewer = isMemberOf(project?.viewers) || isViewingMode

  const allowed = (action: string) => !!actions?.includes(action)

  const canEditWithoutTracking = allowed(Actions.editWithoutTracking)
  const isPrivileged = isOwner || isEditor || isWriter
  const canEditFiles = (isPrivileged || isAnnotator) && !isViewingMode
  const canUpdateAttachments = canEditFiles && allowed(Actions.updateAttachment)

  return {
    /* track changes */
    handleSuggestion: isPrivileged,
    editWithoutTracking: canEditWithoutTracking,
    rejectOwnSuggestion: !isViewer,

    /* comments */
    handleOwnComments: !isViewer,
    handleOthersComments: isOwner,
    resolveOwnComment: !isViewer,
    resolveOthersComment: isOwner || isEditor,
    createComment: !isViewer,

    /* file handling */
    downloadFiles: true,
    changeDesignation: canUpdateAttachments,
    moveFile: canEditFiles,
    replaceFile: canUpdateAttachments,
    uploadFile: canUpdateAttachments,
    detachFile: canEditFiles,
    setMainManuscript: allowed(Actions.setMainManuscript),

    /* editor */
    editArticle: !isViewer,
    formatArticle: !isViewer,
    editMetadata: !isViewer,
    editCitationsAndRefs: !isViewer,
    seeEditorToolbar: !isViewer,
    seeReferencesButtons: !isViewer,
  }
}

export const getAllPermitted = () => {
  interface Boolist {
    [key: string]: boolean
  }

  const capabilities = getCapabilities()
  const allAllowed = Object.keys(capabilities).reduce((caps, item: string) => {
    caps[item] = true
    return caps
  }, {} as Boolist)

  return allAllowed as Capabilities
}

const CapabilitiesContext = React.createContext<Capabilities>(getCapabilities())
CapabilitiesContext.displayName = 'CapabilitiesContext'

export const usePermissions = () => {
  return React.useContext(CapabilitiesContext)
}

export const useCalcPermission = ({
  project,
  profile,
  role,
  permittedActions,
  isViewingMode,
}: ProviderProps) => {
  return getCapabilities(
    project,
    profile,
    role,
    permittedActions,
    isViewingMode
  )
}
export const CapabilitiesProvider: React.FC<{
  can: Capabilities
  children: React.ReactNode
}> = (props) => {
  const { can } = props
  return (
    <CapabilitiesContext.Provider value={can}>
      {props?.children}
    </CapabilitiesContext.Provider>
  )
}
