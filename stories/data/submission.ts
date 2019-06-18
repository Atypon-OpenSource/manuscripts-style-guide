/*!
 * © 2019 Atypon Systems LLC
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

import { Model } from '@manuscripts/manuscripts-json-schema'

const submission: Map<string, Model> = new Map([
  [
    'MPAffiliation:DED56C09-42E2-4AB4-BA15-9260389E2B08',
    {
      _id: 'MPAffiliation:DED56C09-42E2-4AB4-BA15-9260389E2B08',
      _rev: '3-ab6a5d56246fb3d89ed44c6b3b24a7f7',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      country: 'United Kingdom',
      county: '',
      createdAt: 1538472835.419208,
      department: 'Dept of Examples',
      institution: 'University of Examples',
      objectType: 'MPAffiliation',
      postCode: '',
      priority: 1,
      updatedAt: 1538472852.567393,
    },
  ],
  [
    'MPAffiliation:aff-2',
    {
      _id: 'MPAffiliation:aff-2',
      _rev: '3-ab6a5d56246fb3d89ed44c6b3b24a7f7',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      country: 'United Kingdom',
      county: '',
      createdAt: 1538472835.419208,
      department: 'This affiliation is missing institution and city',
      objectType: 'MPAffiliation',
      postCode: '',
      priority: 1,
      updatedAt: 1538472852.567393,
    },
  ],
  [
    'MPManuscript:8EB79C14-9F61-483A-902F-A0B8EF5973C9',
    {
      _id: 'MPManuscript:8EB79C14-9F61-483A-902F-A0B8EF5973C9',
      _rev: '4-0674262c6160ff2dc616681f7f20dbd0',
      collection: 'Manuscripts',
      contentSummaryMode: 1,
      createdAt: 1538472121.690101,
      manuscriptType: 1,
      objectType: 'MPManuscript',
      sessionID: 'fb8b3d44-9515-4747-c7d8-a30fb1bc188b',
      title: 'Example Manuscript',
      updatedAt: 1538472121.690101,
    },
  ],
  [
    'MPParagraphElement:05A0ED43-8928-4C69-A17C-0A98795001CD',
    {
      _id: 'MPParagraphElement:05A0ED43-8928-4C69-A17C-0A98795001CD',
      _rev: '4-678a0c2212daae58c0059daa9fa5200a',
      collection: 'elements',
      contents:
        '<p xmlns="http://www.w3.org/1999/xhtml" id="MPParagraphElement:05A0ED43-8928-4C69-A17C-0A98795001CD" class="MPElement MPParagraphStyle_7EAB5784-717B-4672-BD59-8CA324FB0637" data-object-type="MPParagraphElement">The text in this sentence is <sup>superscript</sup> and <sub>subscript</sub>.</p>',
      createdAt: 1538473157,
      elementType: 'p',
      objectType: 'MPParagraphElement',
      paragraphStyle: 'MPParagraphStyle:7EAB5784-717B-4672-BD59-8CA324FB0637',
      sessionID: '58d96cc7-c834-4810-8f39-55cbca7eef93',
      updatedAt: 1538472121.690101,
    },
  ],
  [
    'MPContributor:585DB23A-8778-4AFF-986F-CFF7B733CDE6',
    {
      _id: 'MPContributor:585DB23A-8778-4AFF-986F-CFF7B733CDE6',
      _rev: '131-f8add0194691b6beba3ba881ea1b2ea6',
      affiliations: ['MPAffiliation:DED56C09-42E2-4AB4-BA15-9260389E2B08'],
      bibliographicName: {
        given: 'Example',
        _id: 'MPBibliographicName:24C5AC82-0130-4C94-A6D7-E8A2699EAAC8',
        objectType: 'MPBibliographicName',
        family: 'Author',
      },
      contribution: 'This author set a good example.',
      createdAt: 1538472774.30736,
      email: 'user@example.com',
      fullName: 'Example Author',
      grants: ['MPGrant:EFF99DA8-065D-4DC8-B6DA-521F36371547'],
      isJointContributor: true,
      lastName: 'Author',
      objectType: 'MPContributor',
      prename: 'Example',
      role: 'author',
      updatedAt: 1538472894.363645,
    },
  ],
  [
    'MPContributor:8AD5903E-0C9C-4F46-87AE-124142CE12C2',
    {
      _id: 'MPContributor:8AD5903E-0C9C-4F46-87AE-124142CE12C2',
      _rev: '57-71c71bf50c1031325470337f179e9bf3',
      affiliations: [
        'MPAffiliation:DED56C09-42E2-4AB4-BA15-9260389E2B08',
        'MPAffiliation:aff-2',
      ],
      bibliographicName: {
        given: 'Corresponding',
        _id: 'MPBibliographicName:E5B649B2-1B97-46FF-AA36-ADDC3B532517',
        objectType: 'MPBibliographicName',
        family: 'Author',
      },
      createdAt: 1538472784.250826,
      email: 'author@example.com',
      fullName: 'Corresponding Author',
      isCorresponding: 1,
      lastName: 'Author',
      objectType: 'MPContributor',
      prename: 'Corresponding',
      priority: 1,
      role: 'author',
      updatedAt: 1538472823.003292,
    },
  ],
])

export default submission
