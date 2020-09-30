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
import React from 'react'
import styled from 'styled-components'
import {
  TaskStepCurrentIcon,
  TaskStepDoneIcon,
  TaskStepNextIcon,
} from './icons'

export const PrimaryBoldHeading = styled.div`
  font-family: ${props => props.theme.font.family.sans};
  font-weight: ${props => props.theme.font.weight.bold};
  font-size: ${props => props.theme.font.size.normal};
  line-height: ${props => props.theme.font.lineHeight.large};
  letter-spacing: -0.369231px;
  color: ${props => props.theme.colors.text.primary};
`

export const SecondaryBoldHeading = styled(PrimaryBoldHeading)`
  color: ${props => props.theme.colors.text.secondary};
`

export const PrimarySmallText = styled.div`
  font-family: ${props => props.theme.font.family.sans};
  font-weight: ${props => props.theme.font.weight.normal};
  font-size: ${props => props.theme.font.size.small};
  line-height: ${props => props.theme.font.lineHeight.normal};
  color: ${props => props.theme.colors.text.primary};
`

export const SecondarySmallText = styled(PrimarySmallText)`
  color: ${props => props.theme.colors.text.secondary};
`

export const ProgressContainer: React.FC = ({ children }) => {
  const elements = children as React.ReactElement[]
  return (
    <Grid>
      <TaskStatus>
        <TaskStepDoneIcon />
        <Line />
      </TaskStatus>
      {React.cloneElement(elements[0], {
        style: { gridColumn: '2', marginBottom: '8px' },
      })}
      <TaskStatus>
        <TaskStepCurrentIcon />
        <Line />
      </TaskStatus>
      {React.cloneElement(elements[1], {
        style: { gridColumn: '2', marginBottom: '8px' },
      })}
      <TaskStatus>
        <TaskStepNextIcon />
      </TaskStatus>
      {React.cloneElement(elements[2], {
        style: { gridColumn: '2', marginBottom: '8px' },
      })}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  gap: 0 ${props => props.theme.grid.unit * 2}px;
`

const TaskStatus = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`

const Line = styled.hr`
  margin: 5px 0 0 0;
  flex: 1;
  border: 1px dashed #c9c9c9;
`
