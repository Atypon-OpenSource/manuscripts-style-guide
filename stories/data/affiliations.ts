import { Affiliation } from '@manuscripts/manuscripts-json-schema'

const affiliations: Map<string, Affiliation> = new Map([
  [
    'affiliation-1',
    {
      _id: 'affiliation-1',
      containerID: 'project-1',
      manuscriptID: 'manuscript-1',
      objectType: 'MPAffiliation' as 'MPAffiliation',
      institution: 'Firehouse, Hook & Ladder Company 8',
      priority: 0,
      sessionID: 'story',
      createdAt: 0,
      updatedAt: 0,
    },
  ],
  [
    'affiliation-2',
    {
      _id: 'affiliation-2',
      containerID: 'project-1',
      manuscriptID: 'manuscript-1',
      objectType: 'MPAffiliation' as 'MPAffiliation',
      institution: 'Firehouse, Hook & Ladder Company 9',
      priority: 0,
      sessionID: 'story',
      createdAt: 0,
      updatedAt: 0,
    },
  ],
])

export default affiliations
