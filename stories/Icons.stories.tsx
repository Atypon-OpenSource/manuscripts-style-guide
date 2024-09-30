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
import { storiesOf } from '@storybook/react'
import * as React from 'react'

import {
  AddAuthorIcon,
  AddCommentIcon,
  AddedIcon,
  AddIcon,
  AddNewIcon,
  ArrowDownCircleIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
  AttachIcon,
  AttentionBlueIcon,
  AttentionGreenIcon,
  AttentionOrangeIcon,
  AttentionRedIcon,
  AvatarIcon,
  CitationCountIcon,
  CommentReplyIcon,
  CommentResolveIcon,
  CorrespondingAuthorIcon,
  DeleteIcon,
  DeleteSolidIcon,
  DotsIcon,
  EditIcon,
  FileAudioIcon,
  FileCodeIcon,
  FileCompressedIcon,
  FileCorruptedIcon,
  FileDocumentIcon,
  FileFigureIcon,
  FileGraphicalAbstractIcon,
  FileImageIcon,
  FileLatexIcon,
  FileMainDocumentIcon,
  FilePdfIcon,
  FileTableIcon,
  FileUnknownIcon,
  FileVideoIcon,
  HandleInspectorIcon,
  HandleOutlineIcon,
  HelpIcon,
  LinkIcon,
  LogoutIcon,
  OutlineBlockQuoteIcon,
  OutlineCodeIcon,
  OutlineEquationIcon,
  OutlineFigureIcon,
  OutlineManuscriptIcon,
  OutlineOrderedListIcon,
  OutlineParagraphIcon,
  OutlinePullQuoteIcon,
  OutlineSectionIcon,
  OutlineTableIcon,
  OutlineUnorderedListIcon,
  PlusIcon,
  RoleAnnotatingIcon,
  RoleReadingIcon,
  SaveStatusOfflineIcon,
  SaveStatusSavedIcon,
  SaveStatusSavingIcon,
  SearchIcon,
  SystemUserAvatarIcon,
  TaskStepDoneIcon,
  ToolbarBoldIcon,
  ToolbarCitationIcon,
  ToolbarCodeIcon,
  ToolbarEquationIcon,
  ToolbarFigureIcon,
  ToolbarItalicIcon,
  ToolbarOrderedListIcon,
  ToolbarSubscriptIcon,
  ToolbarSuperscriptIcon,
  ToolbarSymbolIcon,
  ToolbarTableIcon,
  ToolbarUnderlineIcon,
  ToolbarUnorderedListIcon,
  TriangleCollapsedIcon,
  TriangleExpandedIcon,
  UploadIcon,
  VerticalEllipsisIcon,
} from '../src/components/icons'

const style = `
.icons {
    width: 900px;
}
svg {
    margin: 8px;
    transform: scale(2);
    width: 90px;
    margin-bottom: 50px;
}
`

storiesOf('Icons', module).add('Icons', () => (
  <div className="icons">
    <style>{style}</style>
    <AddAuthorIcon />
    <AddCommentIcon />
    <AddedIcon />
    <AddNewIcon />
    <AddIcon />
    <ArrowDownIcon />
    <ArrowDownCircleIcon />
    <ArrowLeftIcon />
    <ArrowUpIcon />
    <AttachIcon />
    <AttentionBlueIcon />
    <AttentionGreenIcon />
    <AttentionOrangeIcon />
    <AttentionRedIcon />
    <AvatarIcon />
    <SystemUserAvatarIcon />
    <OutlineBlockQuoteIcon />
    <CitationCountIcon />
    <CommentReplyIcon />
    <CommentResolveIcon />
    <CorrespondingAuthorIcon />
    <DeleteSolidIcon />
    <DeleteIcon />
    <DotsIcon />
    <EditIcon />
    <FileAudioIcon />
    <FileCodeIcon />
    <FileCompressedIcon />
    <FileCorruptedIcon />
    <FileDocumentIcon />
    <FileFigureIcon />
    <FileGraphicalAbstractIcon />
    <FileImageIcon />
    <FileLatexIcon />
    <FilePdfIcon />
    <FileTableIcon />
    <FileUnknownIcon />
    <FileVideoIcon />
    <HandleInspectorIcon />
    <HandleOutlineIcon />
    <HelpIcon />
    <LinkIcon />
    <LogoutIcon />
    <FileMainDocumentIcon />
    <OutlineCodeIcon />
    <OutlineEquationIcon />
    <OutlineFigureIcon />
    <OutlineManuscriptIcon />
    <OutlineOrderedListIcon />
    <OutlineParagraphIcon />
    <OutlineSectionIcon />
    <OutlineTableIcon />
    <OutlineUnorderedListIcon />
    <PlusIcon />
    <OutlinePullQuoteIcon />
    <RoleAnnotatingIcon />
    <RoleReadingIcon />
    <SaveStatusOfflineIcon />
    <SaveStatusSavedIcon />
    <SaveStatusSavingIcon />
    <SearchIcon />
    <TaskStepDoneIcon />
    <ToolbarBoldIcon />
    <ToolbarCitationIcon />
    <ToolbarCodeIcon />
    <ToolbarEquationIcon />
    <ToolbarFigureIcon />
    <ToolbarItalicIcon />
    <ToolbarOrderedListIcon />
    <ToolbarSubscriptIcon />
    <ToolbarSuperscriptIcon />
    <ToolbarSymbolIcon />
    <ToolbarTableIcon />
    <ToolbarUnderlineIcon />
    <ToolbarUnorderedListIcon />
    <TriangleCollapsedIcon />
    <TriangleExpandedIcon />
    <UploadIcon />
    <VerticalEllipsisIcon />
  </div>
))
