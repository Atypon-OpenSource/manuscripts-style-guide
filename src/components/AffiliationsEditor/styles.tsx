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

import AddAuthor from '@manuscripts/assets/react/AddAuthor'
import React from 'react'
import { IndicatorContainerProps } from 'react-select/lib/components/containers'
import { styled, ThemeProps, withTheme } from '../../styled-components'
import { AffiliationOption, AuthorAffiliation } from '../../types'

export const Container = styled.div`
  margin: 0 1.89rem 1rem;
`

export const Field = styled.div`
  margin: 1rem 0;
`

export const List = styled.div`
  margin-bottom: 0.5rem;
`

export const AddAffiliationContainer = styled.div`
  padding-right: 0.71rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  circle,
  use {
    fill: ${props => props.theme.colors.brand.default};
  }

  path {
    mask: none;
  }
`

export const AddAffiliationIndicator: React.FC<IndicatorContainerProps<
  AffiliationOption
>> = () => (
  <AddAffiliationContainer>
    <AddAuthor />
  </AddAffiliationContainer>
)
