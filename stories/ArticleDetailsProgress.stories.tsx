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

import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  PrimaryBoldHeading,
  PrimarySmallText,
  ProgressContainer,
  SecondaryBoldHeading,
  SecondarySmallText,
} from '../src'

storiesOf('Article Details', module)
  .add('Text', () => (
    <div>
      <PrimaryBoldHeading>Primary Bold Heading Text</PrimaryBoldHeading>
      <SecondaryBoldHeading>Secondary Bold Heading Text</SecondaryBoldHeading>
      <PrimarySmallText>Primary Small Text</PrimarySmallText>
      <SecondarySmallText>Secondary Small Text</SecondarySmallText>
    </div>
  ))
  .add('Progress', () => (
    <ProgressContainer>
      <div>
        <PrimaryBoldHeading>XML Conversion</PrimaryBoldHeading>
        <SecondarySmallText>
          Automated conversion to JATS with reference & house style rules
        </SecondarySmallText>
        <SecondarySmallText>Actor: Automated task</SecondarySmallText>
        <PrimarySmallText>29 Jun, Monday</PrimarySmallText>
      </div>
      <div>
        <PrimaryBoldHeading>Quality Report Generation</PrimaryBoldHeading>
        <SecondarySmallText>
          Technical checks on article to create Quality Report
        </SecondarySmallText>
        <SecondarySmallText>Actor: Automated task</SecondarySmallText>
        <PrimarySmallText>24 Jun, Monday</PrimarySmallText>
      </div>
      <div>
        <SecondaryBoldHeading>Production Editor Check</SecondaryBoldHeading>
        <SecondarySmallText>
          The Production editor checks the validity of the generated article.
        </SecondarySmallText>
        <SecondarySmallText>Actor: Automated task</SecondarySmallText>
        <SecondarySmallText>25 Jun, Monday</SecondarySmallText>
      </div>
    </ProgressContainer>
  ))
