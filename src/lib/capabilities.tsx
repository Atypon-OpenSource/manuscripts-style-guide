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
import { UserProfileWithAvatar } from '@manuscripts/manuscript-transform'
import { Project } from '@manuscripts/manuscripts-json-schema'
import React from 'react'

export type Capabilities = {
  /* suggestions */
  handleSuggestion: boolean
  rejectOwnSuggestion: boolean
  createSuggestion: boolean
  viewSuggestion: boolean
  /* comments */
  seeEditorToolbar: boolean
  handleOwnComments: boolean
  resolveOwnComment: boolean
  handleOthersComments: boolean
  resolveOthersComment: boolean
  createComment: boolean
  /* production notes */
  viewNotes: boolean
  createNotes: boolean
  handleNotes: boolean // Approve rejecet owns and others
  /* history */
  viewHistory: boolean
  restoreVersion: boolean
  /* file handling */
  downloadFiles: boolean
  changeDesignation: boolean
  replaceFile: boolean
  uploadFile: boolean
  handleQualityReport: boolean
  setMainManuscript: boolean
  /* dashboard actions */
  completeTask: boolean
  rejectTask: boolean
  acceptTask: boolean
  resolveOnHoldTask: boolean
  putOnHoldTask: boolean
  changeDueDate: boolean
  previewAccess: boolean
  editNotTracked: boolean
  accessEditor: boolean
  formatArticle: boolean
  editorWrite: boolean
  editMetadata: boolean
  shareProject: boolean
}

enum A {
  proceed = 'proceed',
  updateAttachment = 'update-attachment',
  updateDueDate = 'update-due-date',
  addNote = 'add-note',
  setMainManuscript = 'set-main-manuscript',
}

export interface ProviderProps {
  project?: Project
  profile?: UserProfileWithAvatar
  lwRole?: string
  permittedActions?: string[]
  children?: React.ReactNode
}
// all arguments are options to avoid empty object pass one context creation and
// thusly simplify the consuming of the context: it will help avoiding conditional
// checks which is helpful because there maybe numerous checks in on component

export const getLWCapabilities = (
  project?: Project,
  profile?: UserProfileWithAvatar,
  lwRole?: ProviderProps['lwRole'],
  actions?: string[]
): Capabilities => {
  const isEditor = () =>
    !!(profile && project?.editors?.includes(profile.userID))
  const isOwner = () => !!(profile && project?.owners?.includes(profile.userID))
  const isWriter = () =>
    !!(profile && project?.writers?.includes(profile.userID))
  const isAnnotator = () =>
    !!(profile && project?.annotators?.includes(profile.userID))
  const isViewer = () =>
    !!(profile && project?.viewers?.includes(profile.userID))
  const isLWProdEditor = () => lwRole == 'pe'
  const allowed = (action: string) => !!actions?.includes(action)

  return {
    /* suggestions */
    handleSuggestion: isOwner() || isEditor() || isWriter(),
    rejectOwnSuggestion: !isViewer(),
    createSuggestion: !isViewer(),
    viewSuggestion: true,
    seeEditorToolbar: !isViewer(),
    /* comments */
    handleOwnComments: !isViewer(),
    handleOthersComments: isOwner(),
    resolveOwnComment: !isViewer(),
    resolveOthersComment: !(isViewer() || isAnnotator()),
    createComment: !isViewer(),
    /* production notes */
    viewNotes: true,
    createNotes: !isViewer() && allowed(A.addNote),
    handleNotes: isOwner() || isEditor() || isWriter(), // Approve rejecet owns and others
    /* history */
    viewHistory: false,
    restoreVersion: isOwner() || isEditor() || isWriter(),
    /* file handling */
    downloadFiles: true,
    changeDesignation:
      (isOwner() || isEditor() || isWriter()) && allowed(A.updateAttachment),
    replaceFile: isOwner() || isEditor() || isWriter(),
    uploadFile: isOwner() || isEditor() || isWriter(),
    handleQualityReport: isOwner() || isEditor() || isWriter(),
    setMainManuscript: allowed(A.setMainManuscript),
    /* dashboard actions */
    completeTask: !isViewer() && allowed(A.proceed),
    rejectTask: isLWProdEditor(),
    acceptTask: isLWProdEditor(),
    resolveOnHoldTask: isLWProdEditor(),
    putOnHoldTask: isLWProdEditor(),
    changeDueDate: isLWProdEditor() && allowed(A.updateDueDate),
    previewAccess: true,
    editNotTracked: false,
    accessEditor: true,
    /* menu */
    formatArticle: !isViewer(),
    /* editor */
    editorWrite: !isWriter(),
    editMetadata: isViewer() || isAnnotator(),
    shareProject: isOwner(),
  }
}

export const getAllPermitted = () => {
  interface Boolist {
    [key: string]: boolean
  }

  const capabilities = getLWCapabilities()
  const allAllowed = Object.keys(capabilities).reduce((caps, item: string) => {
    caps[item] = true
    return caps
  }, {} as Boolist)

  return allAllowed as Capabilities
}

const CapabilitiesContext = React.createContext<Capabilities>(
  getLWCapabilities()
)
CapabilitiesContext.displayName = 'CapabilitiesContext'

export const usePermissions = () => {
  return React.useContext(CapabilitiesContext)
}

export const useCalcPermission = ({
  project,
  profile,
  lwRole,
  permittedActions,
}: ProviderProps) => {
  return getLWCapabilities(project, profile, lwRole, permittedActions)
}

export const CapabilitiesProvider: React.FC<{ can: Capabilities }> = (
  props
) => {
  const { can } = props
  return (
    <CapabilitiesContext.Provider value={can}>
      {props?.children}
    </CapabilitiesContext.Provider>
  )
}
