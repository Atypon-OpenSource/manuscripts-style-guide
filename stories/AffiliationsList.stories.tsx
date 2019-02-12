import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { AffiliationsList } from '../src/components/AffiliationsList'
import affiliations from './data/affiliations'

storiesOf('AffiliationsList', module).add('basic', () => (
  <AffiliationsList affiliations={affiliations} />
))
