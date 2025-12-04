/*!
 * © 2024 Atypon Systems LLC
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
import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

import * as Icons from '../src/components/icons'
import { IconProps } from '../src/components/icons/types'

const IconsContainer = styled.div`
  width: 900px;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`

const IconElement = styled.div`
  display: flex;
  min-width: 100px;
  min-height: 100px;
  gap: 5px;
  flex-direction: column;
  align-items: center;
`

const style = `
  svg {
    transform: scale(2);
    min-height: 80px;
  }
`

const iconList: { name: string; Component: React.FC<IconProps> }[] = [
  { name: 'AddAuthorIcon', Component: Icons.AddAuthorIcon },
  { name: 'AddCommentIcon', Component: Icons.AddCommentIcon },
  { name: 'AddedIcon', Component: Icons.AddedIcon },
  { name: 'AddIcon', Component: Icons.AddIcon },
  { name: 'AddNewIcon', Component: Icons.AddNewIcon },
  { name: 'ArrowDownCircleIcon', Component: Icons.ArrowDownCircleIcon },
  { name: 'ArrowDownIcon', Component: Icons.ArrowDownIcon },
  { name: 'ArrowLeftIcon', Component: Icons.ArrowLeftIcon },
  { name: 'ArrowUpIcon', Component: Icons.ArrowUpIcon },
  { name: 'AttachIcon', Component: Icons.AttachIcon },
  { name: 'AttentionBlueIcon', Component: Icons.AttentionBlueIcon },
  { name: 'AttentionGreenIcon', Component: Icons.AttentionGreenIcon },
  { name: 'AttentionOrangeIcon', Component: Icons.AttentionOrangeIcon },
  { name: 'AttentionRedIcon', Component: Icons.AttentionRedIcon },
  { name: 'AvatarIcon', Component: Icons.AvatarIcon },
  { name: 'BookIcon', Component: Icons.BookIcon },
  { name: 'CitationCountIcon', Component: Icons.CitationCountIcon },
  { name: 'CommentReplyIcon', Component: Icons.CommentReplyIcon },
  { name: 'CommentResolveIcon', Component: Icons.CommentResolveIcon },
  { name: 'CommentIcon', Component: Icons.CommentIcon },
  { name: 'CorrespondingAuthorIcon', Component: Icons.CorrespondingAuthorIcon },
  { name: 'DeleteIcon', Component: Icons.DeleteIcon },
  { name: 'DeleteSolidIcon', Component: Icons.DeleteSolidIcon },
  { name: 'DotsIcon', Component: Icons.DotsIcon },
  { name: 'EditIcon', Component: Icons.EditIcon },
  { name: 'FileAudioIcon', Component: Icons.FileAudioIcon },
  { name: 'FileCodeIcon', Component: Icons.FileCodeIcon },
  { name: 'FileCompressedIcon', Component: Icons.FileCompressedIcon },
  { name: 'FileCorruptedIcon', Component: Icons.FileCorruptedIcon },
  { name: 'FileDocumentIcon', Component: Icons.FileDocumentIcon },
  { name: 'FileFigureIcon', Component: Icons.FileFigureIcon },
  {
    name: 'FileGraphicalAbstractIcon',
    Component: Icons.FileGraphicalAbstractIcon,
  },
  { name: 'FileImageIcon', Component: Icons.FileImageIcon },
  { name: 'FileLatexIcon', Component: Icons.FileLatexIcon },
  { name: 'FileMainDocumentIcon', Component: Icons.FileMainDocumentIcon },
  { name: 'FilePdfIcon', Component: Icons.FilePdfIcon },
  { name: 'FileTableIcon', Component: Icons.FileTableIcon },
  { name: 'FileUnknownIcon', Component: Icons.FileUnknownIcon },
  { name: 'FileVideoIcon', Component: Icons.FileVideoIcon },
  { name: 'HandleInspectorIcon', Component: Icons.HandleInspectorIcon },
  { name: 'HandleOutlineIcon', Component: Icons.HandleOutlineIcon },
  { name: 'HelpIcon', Component: Icons.HelpIcon },
  { name: 'ImageLeftIcon', Component: Icons.ImageLeftIcon },
  { name: 'ImageDefaultIcon', Component: Icons.ImageDefaultIcon },
  { name: 'ImageRightIcon', Component: Icons.ImageRightIcon },
  { name: 'InspectorPluginIcon', Component: Icons.InspectorPluginIcon },
  { name: 'LinkIcon', Component: Icons.LinkIcon },
  { name: 'LogoutIcon', Component: Icons.LogoutIcon },
  { name: 'ManuscriptIcon', Component: Icons.ManuscriptIcon },
  { name: 'OutlineBlockQuoteIcon', Component: Icons.OutlineBlockQuoteIcon },
  { name: 'OutlineCodeIcon', Component: Icons.OutlineCodeIcon },
  { name: 'OutlineEmbedIcon', Component: Icons.OutlineEmbedIcon },
  { name: 'OutlineEquationIcon', Component: Icons.OutlineEquationIcon },
  { name: 'OutlineFigureIcon', Component: Icons.OutlineFigureIcon },
  { name: 'OutlineManuscriptIcon', Component: Icons.OutlineManuscriptIcon },
  { name: 'OutlineOrderedListIcon', Component: Icons.OutlineOrderedListIcon },
  { name: 'OutlineParagraphIcon', Component: Icons.OutlineParagraphIcon },
  { name: 'OutlinePullQuoteIcon', Component: Icons.OutlinePullQuoteIcon },
  { name: 'OutlineSectionIcon', Component: Icons.OutlineSectionIcon },
  { name: 'OutlineTableIcon', Component: Icons.OutlineTableIcon },
  {
    name: 'OutlineUnorderedListIcon',
    Component: Icons.OutlineUnorderedListIcon,
  },
  { name: 'PlusIcon', Component: Icons.PlusIcon },
  { name: 'RoleAnnotatingIcon', Component: Icons.RoleAnnotatingIcon },
  { name: 'RoleReadingIcon', Component: Icons.RoleReadingIcon },
  { name: 'SaveStatusOfflineIcon', Component: Icons.SaveStatusOfflineIcon },
  { name: 'SaveStatusSavedIcon', Component: Icons.SaveStatusSavedIcon },
  { name: 'SaveStatusSavingIcon', Component: Icons.SaveStatusSavingIcon },
  { name: 'SaveStatusErrorIcon', Component: Icons.SaveStatusErrorIcon },
  { name: 'ScrollIcon', Component: Icons.ScrollIcon },
  { name: 'SearchIcon', Component: Icons.SearchIcon },
  { name: 'SystemUserAvatarIcon', Component: Icons.SystemUserAvatarIcon },
  { name: 'TaskStepDoneIcon', Component: Icons.TaskStepDoneIcon },
  { name: 'ToolbarBoldIcon', Component: Icons.ToolbarBoldIcon },
  { name: 'ToolbarCitationIcon', Component: Icons.ToolbarCitationIcon },
  { name: 'ToolbarCodeIcon', Component: Icons.ToolbarCodeIcon },
  { name: 'ToolbarEquationIcon', Component: Icons.ToolbarEquationIcon },
  { name: 'ToolbarFigureIcon', Component: Icons.ToolbarFigureIcon },
  { name: 'ToolbarItalicIcon', Component: Icons.ToolbarItalicIcon },
  { name: 'ToolbarOrderedListIcon', Component: Icons.ToolbarOrderedListIcon },
  { name: 'ToolbarSubscriptIcon', Component: Icons.ToolbarSubscriptIcon },
  { name: 'ToolbarSuperscriptIcon', Component: Icons.ToolbarSuperscriptIcon },
  { name: 'ToolbarSymbolIcon', Component: Icons.ToolbarSymbolIcon },
  { name: 'ToolbarTableIcon', Component: Icons.ToolbarTableIcon },
  { name: 'ToolbarUnderlineIcon', Component: Icons.ToolbarUnderlineIcon },
  {
    name: 'ToolbarUnorderedListIcon',
    Component: Icons.ToolbarUnorderedListIcon,
  },
  { name: 'ToolbarIndentIcon', Component: Icons.ToolbarIndentIcon },
  { name: 'TranslateIcon', Component: Icons.TranslateIcon },
  { name: 'TriangleCollapsedIcon', Component: Icons.TriangleCollapsedIcon },
  { name: 'TriangleExpandedIcon', Component: Icons.TriangleExpandedIcon },
  { name: 'UploadIcon', Component: Icons.UploadIcon },
  { name: 'VerticalEllipsisIcon', Component: Icons.VerticalEllipsisIcon },
  { name: 'ToolbarUnindentIcon', Component: Icons.ToolbarUnindentIcon },
]

const meta: Meta = {
  title: 'Icons',
}

export default meta
type Story = StoryObj

export const Icons_: Story = {
  render: () => (
    <IconsContainer>
      <style>{style}</style>
      {iconList.map(({ name, Component }) => (
        <IconElement key={name}>
          <Component />
          <p>{name}</p>
        </IconElement>
      ))}
    </IconsContainer>
  ),
}
