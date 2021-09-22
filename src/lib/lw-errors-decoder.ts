/*!
 * © 2020 Atypon Systems LLC
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

interface errorDescription {
  title: string
  description: string
}

interface errorsAssocList {
  [key: string]: errorDescription
}

const errorsExplanations: errorsAssocList = {
  ANY_ERR_AUTHORIZATION: {
    title: 'Authorization issue',
    description: "It seems you don't have access to this page. If you think...",
  },
  PREVIEW_HTML_GENERATION_FAILED: {
    title: 'Failure in auto-generation of HTML preview',
    description:
      'The HTML preview could not be generated due to an internal error.',
  },
  PREVIEW_PDF_GENERATION_FAILED: {
    title: 'Failure in auto-generation of PDF preview',
    description:
      'The PDF preview could not be generated due to an internal error.',
  },
  PREVIEW_PDF_TEMPLATE_MISSING: {
    title: 'Failure in auto-generation of PDF preview',
    description:
      'The PDF preview could not be generated due to an internal error.',
  },
  PREVIEW_EPUB_GENERATION_FAILED: {
    title: 'Failure in auto-generation of ePub preview',
    description:
      'The ePub preview could not be generated due to an internal error.',
  },
  PREVIEW_SERVICE_UNAVAILABLE: {
    title: 'The preview service is unavailable',
    description: 'The preview could not be generated due to an internal error.',
  },
  MANUSCRIPT_CONTENT_PARSING_FAILED: {
    title: 'Quality report cannot be generated',
    description: 'There is a problem generating the Quality report.',
  },
  QR_PROFILE_NOT_FOUND: {
    title: 'Quality service configuration error',
    description: 'The Quallity service is not cofigured correctly.',
  },
  QR_SERVICE_UNAVAILABLE: {
    title: 'Quality service unavailable',
    description: 'The Quallity service is not available at the moment.',
  },
  MANUSCRIPT_ARCHIVE_FETCH_FAILED: {
    title: 'Content cannot be loaded',
    description: 'There was an error trying to load the content.',
  },
  EDT_QAREPORT_INVALID: {
    title: 'Invalid Quality report',
    description: 'The quality report could not be loaded.',
  },
  TSK_MYTASKS_NOT_LOADED: {
    title: 'Task list cannot be loaded',
    description:
      'There was an internal error while loading the list of your tasks.',
  },
  TSK_TASKSQUEUE_NOT_LOADED: {
    title: 'Task list cannot be loaded',
    description:
      'There was an internal error while loading the list of open tasks to pick up from.',
  },
  TSK_ASSIGN_FAILED: {
    title: 'Task not assigned',
    description:
      'There was an internal error while assigning the task to your task list.',
  },
  NOTES_FETCH_FAILED: {
    title: 'Production Notes cannot be loaded',
    description:
      'There was an internal error while loading the Production notes.',
  },
  NOTES_NOT_UPDATED: {
    title: 'Production Notes cannot be updated',
    description:
      'There was an internal error while updating the Production notes.',
  },
  FHC_DOWNLOAD_FILE_NOT_EXISTS: {
    title: 'File does not exist',
    description:
      'The file you have tried to download does not exist. Please contact tne support team.',
  },
  FHC_DOWNLOAD_FILE_NAME_NOT_EXISTS: {
    title: 'Filename cannot be found',
    description: '',
  },
  FHC_UPLOAD_FAIL: {
    title: 'Upload of the file failed',
    description: 'There was an internal error while uploading the file.',
  },
  WFM_AVAILABLE_TRANSITIONS_NOT_LOADED: {
    title: 'Workflow steps not loaded',
    description:
      'There was an internal error while loading the possible workflow next steps.',
  },
  WFM_TRANSITION_FAIL: {
    title: 'Workflow not advanced to next step',
    description:
      'There was an internal error while advancing to the next step of the workflow.',
  },
  SBM_RESCHEDULE_FAILED: {
    title: 'Rescheduling the article failed',
    description:
      'There was an internal error while attempting to reschedule the due date of the article.',
  },
  MANUSCRIPTS_API_INTERNAL_ERROR: {
    title: 'Internal error',
    description: 'There was an internal error in the system.',
  },
  DBR_ERR_INTERNAL: {
    title: 'Internal error',
    description: 'There was an internal error in the system.',
  },
  CI_CONSUME_NEW_PACKAGE_EXCEPTION: {
    title: 'The package is not loaded',
    description:
      'There was an internal error while reading the source package.',
  },
  CI_VALIDATE_PACKAGE_EXCEPTION: {
    title: 'Invalid package',
    description:
      'The content in the package sent from Peer Review system or other external source was invalid.',
  },
  CI_READY_FOR_CONVERSION_CHECK_EXCEPTION: {
    title: 'Package validation failed',
    description:
      'There was an internal error while checking whether the package is ready to be converted to JATS XML.',
  },
  CI_FAIL_SERVICE_UNAVAILABLE: {
    title: 'Completeness & Usability check failure',
    description:
      'The Completeness & Usability check failed because the service was not available at the time.',
  },
  CI_STRUCTURING_FAILED: {
    title: 'Automated structuring failed',
    description: 'The automated structuring of the document has failed.',
  },
  CI_UPLOAD_TO_EDITOR_EXCEPTION: {
    title: 'Failed to load the article to the editor',
    description:
      'There was an internal exception while trying to load the article to the editor.',
  },
  CP_ASSIGN_TO_CS_FOR_IMAGE_PREP: {
    title: 'Workflow manager error',
    description:
      'There was an internal error while trying to assign the task for image preparation.',
  },
  CP_ASSIGN_TO_CE_QUEUE_EXCEPTION: {
    title: 'Workflow manager error',
    description:
      'There was an internal error while assigning the task to the Copy Editors queue.',
  },
  P_ASSIGN_TO_AUTHOR_EXCEPTION: {
    title: 'Workflow manager error',
    description:
      'There was an internal error while assigning the task to the Author.',
  },
  PUB_FAIL_PACKAGE: {
    title: 'Packaging the content failed',
    description:
      'There was an internal error while packaging the content for publication.',
  },
  PUB_FAIL_DELIVERY: {
    title: 'The package was not delivered for publication',
    description: 'The package could not be delivered for publication.',
  },
  CI_FAIL_JATS_CONVERSION: {
    title: 'Failure on conversion to JATS XML',
    description: '',
  },
}

export default (code: string): errorDescription =>
  errorsExplanations[code] || { title: 'Unknown', description: '' }
