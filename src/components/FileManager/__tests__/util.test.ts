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

import { FileAttachment } from '../FileSectionItem/FileSectionItem'
import {
  Designation,
  FileSectionType,
  generateAttachmentsTitles,
  getDesignationActionsList,
  getDesignationName,
} from '../util'

const externalFiles: FileAttachment[] = [
  {
    id: 'caabc327-25c5-4122-96fd-e38d313345da',
    name: 'LW4_multiGraphicFigure-S1-doc.zip',
    type: {
      id: 'input-package',
      label: 'input-package',
    },
    link: 'https://lean-x7481.ciplit.com/lw/attachment/caabc327-25c5-4122-96fd-e38d313345da',
  },
  {
    id: '9047930d-0a8a-4db7-909e-37b2148e0097',
    name: 'demo_multigraphicfigure.docx',
    type: {
      id: 'main-manuscript',
      label: 'main-manuscript',
    },
    link: 'https://lean-x7481.ciplit.com/lw/attachment/9047930d-0a8a-4db7-909e-37b2148e0097',
  },
  {
    id: '7d9d686b-5488-44a5-a1c5-46351e7f9312',
    name: 'final manuscript-hum-huili-dbh-suicide-20200707_figures (9).docx',
    type: {
      id: 'supplementary',
      label: 'supplementary',
    },
    link: 'https://lean-x7481.ciplit.com/lw/attachment/7d9d686b-5488-44a5-a1c5-46351e7f9312',
  },
  {
    id: 'fd554f25-e0d4-4bbb-9169-a263b34ae157',
    name: 'hup-19-0076.pdf',
    type: {
      id: 'submission-pdf',
      label: 'submission-pdf',
    },
    link: 'https://lean-x7481.ciplit.com/lw/attachment/fd554f25-e0d4-4bbb-9169-a263b34ae157',
  },
  {
    id: '4131f16e-e075-41bb-8339-abea02df515d',
    name: 'ContributorsArtwork@2x.png',
    type: {
      id: 'supplementary',
      label: 'supplementary',
    },
    link: 'https://lean-x7481.ciplit.com/lw/attachment/4131f16e-e075-41bb-8339-abea02df515d',
  },
]

test('Checking the generated titles for external files', () => {
  const data = generateAttachmentsTitles(
    externalFiles,
    FileSectionType.OtherFile
  )

  expect(data.length).toBe<number>(5)
  expect(data[0].title).toEqual<string>('Compressed File 1')
  expect(data[1].title).toEqual<string>('Doc 1')
  expect(data[2].title).toEqual<string>('Doc 2')
  expect(data[3].title).toEqual<string>('Doc 3')
  expect(data[4].title).toEqual<string>('Image 1')
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
