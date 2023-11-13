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

import {
  Affiliation,
  Contributor,
  Manuscript,
  Model,
  ObjectTypes,
} from '@manuscripts/json-schema'

import { AuthorAffiliation } from '../../types'
import {
  affiliationLabel,
  affiliationsOptions,
  buildAffiliationIDs,
  buildAffiliationsMap,
  buildAuthorAffiliations,
  buildAuthorPriority,
  buildAuthorsAndAffiliations,
  buildSortedAuthors,
  isJointFirstAuthor,
} from '../authors'

const DEFAULT_BUNDLE = 'MPBundle:www-zotero-org-styles-nature'

const modelMap = (models: Model[]): Map<string, Model> => {
  const map = new Map<string, Model>()
  models.forEach((x) => map.set(x._id, x))
  return map
}

const affiliation: Affiliation = {
  _id: 'MPAffiliation:X',
  objectType: ObjectTypes.Affiliation,
  institution: 'University of Toronto',
  manuscriptID: 'MPManuscript:X',
  containerID: 'MPProject:1',
  priority: 0,
  createdAt: 0,
  updatedAt: 0,
}

const affiliations = [affiliation]

const contribs: Contributor[] = [
  {
    _id: 'MPContributor:x',
    objectType: ObjectTypes.Contributor,
    priority: 1,
    bibliographicName: {
      _id: 'MPBibliographicName:x-name',
      objectType: 'MPBibliographicName',
    },
    manuscriptID: 'MPManuscript:A',
    containerID: 'MPProject:1',
    role: 'author',
    affiliations: affiliations.map((a) => a._id),
    createdAt: 0,
    updatedAt: 0,
  },
  {
    _id: 'MPContributor:y',
    objectType: ObjectTypes.Contributor,
    priority: 0,
    bibliographicName: {
      _id: 'MPBibliographicName:y-name',
      objectType: 'MPBibliographicName',
    },
    manuscriptID: 'manuscript-A',
    containerID: 'MPProject:1',
    isJointContributor: true,
    role: 'author',
    createdAt: 0,
    updatedAt: 0,
  },
  {
    _id: 'MPContributor:z',
    objectType: ObjectTypes.Contributor,
    priority: 2,
    bibliographicName: {
      _id: 'MPBibliographicName:z-name',
      objectType: 'MPBibliographicName',
    },
    manuscriptID: 'manuscript-A',
    containerID: 'MPProject:1',
    role: 'author',
    createdAt: 0,
    updatedAt: 0,
  },
]

const manuscripts: Manuscript[] = [
  {
    _id: 'MPManuscript:x',
    objectType: ObjectTypes.Manuscript,
    containerID: 'MPProject:1',
    bundle: DEFAULT_BUNDLE,
    
    createdAt: 0,
    updatedAt: 0,
  },
]

const objs: Model[] = manuscripts
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  .concat(contribs as any)
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  .concat(affiliations as any)

describe('author and affiliation helpers', () => {
  it('buildSortedAuthors', () => {
    // FIXME: buildSortedAuthors should not ignore silently encountering contributors with no "role" or "priority" fields present.
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    expect(buildSortedAuthors(modelMap(objs)).map((x) => x._id)).toEqual([
      'MPContributor:y',
      'MPContributor:x',
      'MPContributor:z',
    ])
  })

  it('is joint first author', () => {
    // FIXME: isFirstAuthor should not ignore silently encountering unexpected priority values (they should be the very least monotonously growing)

    const authors: Contributor[] = [
      {
        _id: 'MPContributor:author-1',
        objectType: ObjectTypes.Contributor,
        manuscriptID: 'MPManuscript:manuscript-1',
        containerID: 'MPProject:project-1',
        bibliographicName: {
          _id: 'MPBibliographicName:author-1',
          objectType: 'MPBibliographicName',
        },
        isJointContributor: true,
        createdAt: 0,
        updatedAt: 0,
      },
      {
        _id: 'MPContributor:author-2',
        objectType: ObjectTypes.Contributor,
        manuscriptID: 'MPManuscript:manuscript-1',
        containerID: 'MPProject:project-1',
        bibliographicName: {
          _id: 'MPBibliographicName:author-2',
          objectType: 'MPBibliographicName',
        },
        isJointContributor: false,
        createdAt: 0,
        updatedAt: 0,
      },
      {
        _id: 'MPContributor:author-3',
        objectType: ObjectTypes.Contributor,
        manuscriptID: 'MPManuscript:manuscript-1',
        containerID: 'MPProject:project-1',
        bibliographicName: {
          _id: 'MPBibliographicName:author-3',
          objectType: 'MPBibliographicName',
        },
        createdAt: 0,
        updatedAt: 0,
      },
    ]

    expect(isJointFirstAuthor(authors, 0)).toBe(true)
    expect(isJointFirstAuthor(authors, 1)).toBe(true)
    expect(isJointFirstAuthor(authors, 2)).toBe(false)
  })

  it('is not joint first author', () => {
    const authors: Contributor[] = [
      {
        _id: 'MPContributor:author-1',
        objectType: ObjectTypes.Contributor,
        manuscriptID: 'MPManuscript:manuscript-1',
        containerID: 'MPProject:project-1',
        bibliographicName: {
          _id: 'MPBibliographicName:author-1',
          objectType: 'MPBibliographicName',
        },
        isJointContributor: false,
        createdAt: 0,
        updatedAt: 0,
      },
      {
        _id: 'MPContributor:author-2',
        objectType: ObjectTypes.Contributor,
        manuscriptID: 'MPManuscript:manuscript-1',
        containerID: 'MPProject:project-1',
        bibliographicName: {
          _id: 'MPBibliographicName:author-2',
          objectType: 'MPBibliographicName',
        },
        createdAt: 0,
        updatedAt: 0,
      },
      {
        _id: 'MPContributor:author-3',
        objectType: ObjectTypes.Contributor,
        manuscriptID: 'MPManuscript:manuscript-1',
        containerID: 'MPProject:project-1',
        bibliographicName: {
          _id: 'MPBibliographicName:author-3',
          objectType: 'MPBibliographicName',
        },
        createdAt: 0,
        updatedAt: 0,
      },
    ]

    expect(isJointFirstAuthor(authors, 0)).toBe(false)
    expect(isJointFirstAuthor(authors, 1)).toBe(false)
    expect(isJointFirstAuthor(authors, 2)).toBe(false)
  })

  it('buildAffiliationsMap', () => {
    const affMap = buildAffiliationsMap(
      affiliations.map((x) => x._id),
      modelMap(objs)
    )
    expect(Array.from(affMap)).toEqual([['MPAffiliation:X', affiliations[0]]])
  })

  it('buildAuthorAffiliations', () => {
    const affMap = buildAffiliationsMap(
      affiliations.map((x) => x._id),
      modelMap(objs)
    )
    const authorAffMap = buildAuthorAffiliations(
      contribs,
      affMap,
      Array.from(affMap.keys())
    )

    expect(authorAffMap).toEqual(
      new Map(
        Object.entries({
          'MPContributor:x': [{ data: affiliation, ordinal: 1 }],
          'MPContributor:y': [],
          'MPContributor:z': [],
        })
      )
    )
  })

  it('buildAuthorsAndAffiliations', () => {
    const comps = modelMap(objs)
    const map = buildAuthorsAndAffiliations(comps)
    expect(map).toEqual({
      affiliations: new Map(Object.entries({ 'MPAffiliation:X': affiliation })),
      authorAffiliations: new Map(
        Object.entries({
          'MPContributor:y': [],
          'MPContributor:x': [{ data: affiliation, ordinal: 1 }],
          'MPContributor:z': [],
        })
      ),
      authors: buildSortedAuthors(comps),
    })
  })

  it('buildAuthorPriority', () => {
    const authors: Contributor[] = [
      {
        _id: 'MPContributor:author-1',
        objectType: ObjectTypes.Contributor,
        manuscriptID: 'MPManuscript:manuscript-1',
        containerID: 'MPProject:project-1',
        bibliographicName: {
          _id: 'MPBibliographicName:author-1',
          objectType: 'MPBibliographicName',
        },
        isJointContributor: false,
        createdAt: 0,
        updatedAt: 0,
        priority: 0,
      },
      {
        _id: 'MPContributor:author-2',
        objectType: ObjectTypes.Contributor,
        manuscriptID: 'MPManuscript:manuscript-1',
        containerID: 'MPProject:project-1',
        bibliographicName: {
          _id: 'MPBibliographicName:author-2',
          objectType: 'MPBibliographicName',
        },
        createdAt: 0,
        updatedAt: 0,
        priority: 1,
      },
    ]

    expect(buildAuthorPriority(authors)).toBe(2)
  })

  it('buildAffiliationIDs', () => {
    expect(buildAffiliationIDs(contribs)).toEqual(['MPAffiliation:X'])
  })
})

describe('affiliationLabel', () => {
  const affiliation: Affiliation = {
    _id: 'MPAffiliation:aff-1',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    country: 'United Kingdom',
    county: '',
    createdAt: 1538472835.419208,
    department: 'Dept of Examples',
    institution: 'University of Examples',
    objectType: ObjectTypes.Affiliation,
    postCode: '',
    priority: 1,
    updatedAt: 1538472852.567393,
    manuscriptID: 'man',
    containerID: 'container',
  }

  it('should return the institution name and department', () => {
    const result = affiliationLabel(affiliation)
    expect(result).toEqual('University of Examples (Dept of Examples)')
  })

  it('should exclude the department if it is not present', () => {
    const affiliation: Affiliation = {
      _id: 'MPAffiliation:aff-1',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      country: 'United Kingdom',
      county: '',
      createdAt: 1538472835.419208,
      institution: 'University of Examples',
      objectType: ObjectTypes.Affiliation,
      postCode: '',
      priority: 1,
      updatedAt: 1538472852.567393,
      manuscriptID: 'man',
      containerID: 'container',
    }
    const result = affiliationLabel(affiliation)
    expect(result).toEqual('University of Examples')
  })

  it('should handle a missing institution', () => {
    const affiliation: Affiliation = {
      _id: 'MPAffiliation:aff-1',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      country: 'United Kingdom',
      county: '',
      createdAt: 1538472835.419208,
      department: 'Dept of Examples',
      objectType: ObjectTypes.Affiliation,
      postCode: '',
      priority: 1,
      updatedAt: 1538472852.567393,
      manuscriptID: 'man',
      containerID: 'container',
    }
    const result = affiliationLabel(affiliation)
    expect(result).toEqual('(unknown institution)')
  })

  it('should have a generic label if both institution and department are missing', () => {
    const affiliation: Affiliation = {
      _id: 'MPAffiliation:aff-1',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      country: 'United Kingdom',
      county: '',
      createdAt: 1538472835.419208,
      objectType: ObjectTypes.Affiliation,
      postCode: '',
      priority: 1,
      updatedAt: 1538472852.567393,
      manuscriptID: 'man',
      containerID: 'container',
    }
    const result = affiliationLabel(affiliation)
    expect(result).toEqual('(unknown institution)')
  })
})

describe('affiliationsOptions', () => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const affiliations: any = new Map([
    [
      'MPAffiliation:aff-1',
      {
        _id: 'MPAffiliation:aff-1',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        country: 'United Kingdom',
        county: '',
        createdAt: 1538472835.419208,
        department: '',
        institution: 'University of Examples',
        objectType: ObjectTypes.Affiliation,
        postCode: '',
        priority: 1,
        updatedAt: 1538472852.567393,
        manuscriptID: 'man',
        containerID: 'container',
      },
    ],
  ])

  it('should return an array of affiliations with value and label', () => {
    const result = affiliationsOptions(affiliations)
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveProperty('value', 'MPAffiliation:aff-1')
    expect(result[0]).toHaveProperty('label', 'University of Examples')
  })

  it('should exclude any affiliations already associated with the active author', () => {
    const authorAffiliations: AuthorAffiliation[] = [
      {
        ordinal: 1,
        data: {
          _id: 'MPAffiliation:aff-1',
          addressLine1: '',
          addressLine2: '',
          addressLine3: '',
          city: '',
          country: 'United Kingdom',
          county: '',
          createdAt: 1538472835.419208,
          department: 'Dept of Examples',
          institution: 'University of Examples',
          objectType: ObjectTypes.Affiliation,
          postCode: '',
          priority: 1,
          updatedAt: 1538472852.567393,
          manuscriptID: 'man',
          containerID: 'container',
        },
      },
    ]

    const result = affiliationsOptions(affiliations, authorAffiliations)
    expect(result).toHaveLength(0)
  })
})
