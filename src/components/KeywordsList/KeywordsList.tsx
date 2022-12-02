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

import { Keyword } from '@manuscripts/manuscripts-json-schema'
import React from 'react'
import styled from 'styled-components'

const KeywordsListContainer = styled.div`
  margin: ${(props) => props.theme.grid.unit * 4}px 0;
`

const KeywordsTitle = styled.h1`
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: ${(props) => props.theme.font.size.small};
  font-style: italic;
  font-weight: ${(props) => props.theme.font.weight.normal} !important;
  line-height: ${(props) => props.theme.font.lineHeight.normal};
  margin: 0 0 ${(props) => props.theme.grid.unit}px;
  padding: 0;
`

const KeywordItem = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.colors.text.primary};
  background-color: ${(props) => props.theme.colors.background.keyword.default};
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: ${(props) => props.theme.font.size.normal};
  line-height: ${(props) => props.theme.font.lineHeight.normal};
  margin-right: ${(props) => props.theme.grid.unit}px;
  margin-bottom: ${(props) => props.theme.grid.unit}px;
  padding: ${(props) => props.theme.grid.unit}px;
  border: 1px solid ${(props) => props.theme.colors.border.keyword.default};
  border-radius: 6px;

  &:hover {
    background-color: ${(props) => props.theme.colors.background.keyword.hover};
    border-color: ${(props) => props.theme.colors.border.keyword.hover};
  }

  &.selected {
    background-color: ${(props) =>
      props.theme.colors.background.keyword.selected};
    border-color: ${(props) => props.theme.colors.border.keyword.selected};
  }
`

interface Props {
  keywords: Keyword[]
}

export const KeywordsList: React.FunctionComponent<Props> = ({ keywords }) => (
  <KeywordsListContainer>
    <KeywordsTitle>Keywords</KeywordsTitle>
    {keywords.map((keyword) => (
      <KeywordItem key={keyword._id}>{keyword.name}</KeywordItem>
    ))}
  </KeywordsListContainer>
)
