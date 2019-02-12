import { Contributor } from '@manuscripts/manuscripts-json-schema'

const authors: Contributor[] = [
  {
    _id: 'example-1',
    containerID: 'project-1',
    manuscriptID: 'manuscript-1',
    objectType: 'MPContributor',
    priority: 1,
    role: 'author',
    bibliographicName: {
      _id: 'name-1',
      objectType: 'MPBibliographicName',
      given: 'Janine',
      family: 'Melnitz',
    },
    email: 'janine.melnitz@example.com',
    affiliations: ['affiliation-1'],
    sessionID: 'story',
    createdAt: 0,
    updatedAt: 0,
  },
  {
    _id: 'example-2',
    containerID: 'project-1',
    manuscriptID: 'manuscript-1',
    objectType: 'MPContributor',
    priority: 2,
    role: 'author',
    bibliographicName: {
      _id: 'name-2',
      objectType: 'MPBibliographicName',
      given: 'Peter',
      family: 'Venkman',
    },
    email: 'peter.venkman@example.com',
    affiliations: ['affiliation-1', 'affiliation-2'],
    sessionID: 'story',
    createdAt: 0,
    updatedAt: 0,
    isCorresponding: true,
  },
  {
    _id: 'example-3',
    containerID: 'project-1',
    manuscriptID: 'manuscript-1',
    objectType: 'MPContributor',
    priority: 3,
    role: 'author',
    bibliographicName: {
      _id: 'name-3',
      objectType: 'MPBibliographicName',
      given: 'Dana',
      family: 'Barrett',
    },
    email: 'dana.barrett@example.com',
    affiliations: ['affiliation-1'],
    sessionID: 'story',
    createdAt: 0,
    updatedAt: 0,
  },
]

export default authors
