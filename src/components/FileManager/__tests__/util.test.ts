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

import {
  Designation,
  FileSectionType,
  generateExternalFilesTitles,
  getDesignationActionsList,
  getDesignationName,
  sortExternalFiles,
} from '../util'

const externalFiles: ExternalFile[] = [
  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-1',
    createdAt: 0,
    updatedAt: 0,
    filename: 'supplementary-file.docx',
    publicUrl: 'supplementary-file.docx',
    displayName: 'Supplemental file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'supplementary',
    objectType: 'MPExternalFile',
    manuscriptID: 'MPManuscript:my-manuscript',
    sessionID: 'test',
  },
  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-2',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-figure.jpeg',
    publicUrl: 'my-figure.jpeg',
    displayName: 'Inline File',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "test 2 Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'figure',
    objectType: 'MPExternalFile',
    manuscriptID: 'MPManuscript:my-manuscript',
    sessionID: 'test',
  },
  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-12',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-submission-file.docx',
    publicUrl: 'my-submission-file.docx',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'submission_file',
    objectType: 'MPExternalFile',
    manuscriptID: 'MPManuscript:my-manuscript',
    sessionID: 'test',
  },
  {
    containerID: 'MPProject:valid-project-id-2',
    _id: 'MPManuscript:valid-manuscript-id-6',
    createdAt: 0,
    updatedAt: 0,
    filename: 'my-conflict-of-interest-file.pdf',
    publicUrl: 'my-conflict-of-interest-file.pdf',
    displayName: 'Other file',
    MIME:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    designation: 'conflict-of-interest',
    objectType: 'MPExternalFile',
    manuscriptID: 'MPManuscript:my-manuscript',
    sessionID: 'test',
  },
]

test('Checking the generated titles for external files', () => {
  const data = generateExternalFilesTitles(
    externalFiles,
    FileSectionType.OtherFile
  )

  expect(data.length).toBe<number>(4)
  expect(data[0].title).toEqual<string>('Doc 1')
  expect(data[1].title).toEqual<string>('Image 1')
  expect(data[2].title).toEqual<string>('Doc 2')
  expect(data[3].title).toEqual<string>('Doc 3')
})

test('Checking sorting external files', () => {
  const data = generateExternalFilesTitles(
    externalFiles,
    FileSectionType.OtherFile
  )
  const sortedData = sortExternalFiles(data)

  expect(sortedData.length).toBe<number>(4)
  expect(sortedData[0].title).toEqual<string>('Doc 1')
  expect(sortedData[1].title).toEqual<string>('Doc 2')
  expect(sortedData[2].title).toEqual<string>('Doc 3')
  expect(sortedData[3].title).toEqual<string>('Image 1')
})

test('Checking designation actions list', () => {
  let designationActionsList = getDesignationActionsList(
    Designation.Figure,
    'txt'
  )

  expect(designationActionsList.length).toBe<number>(4)
  expect(
    designationActionsList.includes(Designation.SubmissionFile)
  ).toBeTruthy()
  expect(
    designationActionsList.includes(Designation.Supplementary)
  ).toBeTruthy()
  expect(
    designationActionsList.includes(Designation.GraphicalAbstractImage)
  ).toBeTruthy()
  expect(designationActionsList.includes(Designation.Dataset)).toBeTruthy()

  designationActionsList = getDesignationActionsList(
    Designation.GraphicalAbstractImage,
    'tex'
  )

  expect(designationActionsList.length).toBe<number>(4)
  expect(
    designationActionsList.includes(Designation.SubmissionFile)
  ).toBeTruthy()
  expect(
    designationActionsList.includes(Designation.Supplementary)
  ).toBeTruthy()
  expect(designationActionsList.includes(Designation.Figure)).toBeTruthy()
  expect(designationActionsList.includes(Designation.Dataset)).toBeTruthy()

  designationActionsList = getDesignationActionsList(
    Designation.Metadata,
    'xml'
  )

  expect(designationActionsList.length).toBe<number>(2)
  expect(
    designationActionsList.includes(Designation.SubmissionFile)
  ).toBeTruthy()
  expect(designationActionsList.includes(Designation.Dataset)).toBeTruthy()
  designationActionsList = getDesignationActionsList(
    Designation.Document,
    'png'
  )

  expect(designationActionsList.length).toBe<number>(10)
  expect(
    designationActionsList.includes(Designation.ConflictOfInterest)
  ).toBeTruthy()
  expect(designationActionsList.includes(Designation.Document)).toBeTruthy()
  expect(
    designationActionsList.includes(Designation.GraphicalAbstract)
  ).toBeTruthy()
  expect(
    designationActionsList.includes(Designation.GraphicalAbstractImage)
  ).toBeTruthy()
  expect(
    designationActionsList.includes(Designation.GraphicalAbstractText)
  ).toBeTruthy()
  expect(designationActionsList.includes(Designation.Metadata)).toBeTruthy()
  expect(
    designationActionsList.includes(Designation.SubmissionFile)
  ).toBeTruthy()
  expect(
    designationActionsList.includes(Designation.SubmissionPdf)
  ).toBeTruthy()
})

test('Checking designations name', () => {
  let designationName = getDesignationName(Designation.Figure)
  expect(designationName).toEqual<string>('figure')

  designationName = getDesignationName(Designation.SubmissionFile)
  expect(designationName).toEqual<string>('submission-file')

  designationName = getDesignationName(Designation.ConflictOfInterest)
  expect(designationName).toEqual<string>('conflict-of-interest')

  designationName = getDesignationName(Designation.Supplementary)
  expect(designationName).toEqual<string>('supplementary')

  designationName = getDesignationName(Designation.GraphicalAbstractText)
  expect(designationName).toEqual<string>('graphical-abstract-text')
})
