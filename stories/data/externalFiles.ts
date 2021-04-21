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
import { ExternalFile } from '@manuscripts/manuscripts-json-schema'

export const externalFiles: ExternalFile[] = [
  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-1',
    createdAt: 0,
    updatedAt: 0,
    filename: 'supplementary-file.docx',
    displayName: 'Supplemental file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'supplementary',
    objectType: 'MPExternalFile',
    publicUrl: 'supplementary-file.docx/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-2',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-figure.jpeg',
    displayName: 'Inline File',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "test 2 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'figure',
    objectType: 'MPExternalFile',
    publicUrl: 'my-figure.jpeg/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-3',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-table.xls',
    displayName: 'Inline file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "test 1 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'table',
    objectType: 'MPExternalFile',
    publicUrl: 'my-table.xls/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-4',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-supplementary-file.docx',
    displayName: 'Supplemental file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'supplementary',
    objectType: 'MPExternalFile',
    publicUrl: 'my-supplementary-file.docx/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-5',
    createdAt: 0,
    updatedAt: 0,
    filename: 'supplemental-file.docx',
    displayName: 'Supplemental file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'supplemental',
    objectType: 'MPExternalFile',
    publicUrl: 'supplemental-file.docx/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-6',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-conflict-of-interest-file.pdf',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'conflict-of-interest',
    objectType: 'MPExternalFile',
    publicUrl: 'my-conflict-of-interest-file.pdf/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-7',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-document.tex',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'document',
    objectType: 'MPExternalFile',
    publicUrl: 'my-document.tex/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-8',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-graphical-abstract-file.doc',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'graphical-abstract',
    objectType: 'MPExternalFile',
    publicUrl: 'my-graphical-abstract-file.doc/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-9',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-figure-new.png',
    displayName: 'Inline File',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "test 3 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'figure',
    objectType: 'MPExternalFile',
    publicUrl: 'my-figure-new.png/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-10',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-graphical-abstract-image-file.gif',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'graphical-abstract-image',
    objectType: 'MPExternalFile',
    publicUrl: 'my-graphical-abstract-image-file.gif/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-11',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-graphical-abstract-text-file.txt',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'graphical-abstract-text',
    objectType: 'MPExternalFile',
    publicUrl: 'my-graphical-abstract-text-file.txt/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-12',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-metadata-file.xml',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'metadata',
    objectType: 'MPExternalFile',
    publicUrl: 'my-metadata-file.xml/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-13',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-submission-file.docx',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'submission-file',
    objectType: 'MPExternalFile',
    publicUrl: 'my-submission-file.docx/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-14',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-submission-pdf.pdf',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'submission-pdf',
    objectType: 'MPExternalFile',
    publicUrl: 'my-submission-pdf.pdf/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-15',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-title-page.pdf',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    designation: 'title-page',
    objectType: 'MPExternalFile',
    publicUrl: 'my-title-page.pdf/url',
  },
  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-16',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-title-packageFile.zip',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    designation: 'title-page',
    objectType: 'MPExternalFile',
    publicUrl: 'my-title-packageFile.zip/url',
  },

  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-17',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-title-unknownFile.exe',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    designation: 'title-page',
    objectType: 'MPExternalFile',
    publicUrl: 'my-title-unknownFile.exe/url',
  },
]
