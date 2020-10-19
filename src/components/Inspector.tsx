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

import '@reach/tabs/styles.css'

import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs'
import styled from 'styled-components'

export const InspectorContainer = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.border.tertiary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  height: 100%;
  overflow: hidden;
`

export const InspectorTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

export const InspectorTabList = styled(TabList)`
  && {
    background: none;
    justify-content: center;
    font-size: ${(props) => props.theme.font.size.normal};
    color: ${(props) => props.theme.colors.text.primary};
    flex-shrink: 0;
  }
`

export const InspectorPanelTabList = styled(InspectorTabList)`
  margin-bottom: ${(props) => props.theme.grid.unit * 4}px;
`

export const InspectorTabPanels = styled(TabPanels)`
  flex: 1;
  overflow-y: auto;
`

export const PaddedInspectorTabPanels = styled(InspectorTabPanels)`
  padding-bottom: 64px; // allow space for chat button
`

export const InspectorTabPanel = styled(TabPanel)`
  font-size: ${(props) => props.theme.font.size.normal};
  color: ${(props) => props.theme.colors.text.secondary};
`

export const InspectorTab = styled(Tab)`
  && {
    background: none;
    padding: ${(props) => props.theme.grid.unit * 2}px;
    border-bottom-width: 1px;

    &:focus {
      outline: none;
    }

    &[data-selected] {
      border-bottom-color: ${(props) => props.theme.colors.brand.default};
      color: ${(props) => props.theme.colors.brand.default};
    }
  }
`

export const InspectorTabPanelHeading = styled.div`
  margin-bottom: ${(props) => props.theme.grid.unit * 4}px;
`

export const InspectorField = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.theme.grid.unit * 4}px;

  &:last-child {
    margin-bottom: 0;
  }
`
