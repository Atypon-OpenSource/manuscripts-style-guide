/*!
 * © 2021 Atypon Systems LLC
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
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import {
  ArrowLeftIcon,
  DropdownContainer,
  DropdownList,
  EditIcon,
  NavDropdownContainer,
  NavDropdownToggle,
  PrimaryButton,
  RoleAnnotatingIcon,
  RoleReadingIcon,
  SaveStatus,
  SecondaryButton,
  TextArea,
  useDropdown,
} from '../..'
import { ProceedView } from './ProceedView'

export type PartialSubmission = {
  id: string
  currentStep: SubmissionStep
  previousStep?: SubmissionStep | null | undefined
  nextStep?: SubmissionStep | null | undefined
}

export type SubmissionStep = {
  type: SubmissionStepType
}

export type SubmissionStepTransition = {
  status: {
    id: string
    label: string
  }
  type: SubmissionStepType
}

export type SubmissionStepType = {
  id: string
  label: string
  description: string
  transitions: Array<SubmissionStepTransition>
  role: {
    label: string
  }
}

export enum DialogState {
  INIT,
  LOADING,
  ERROR,
  SUCCESS,
  CLOSED,
}

export type ProceedDialogData = {
  state: DialogState
  error?: string
  // mutationError?: ApolloError | undefined
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationError?: any
  updateState: (state: DialogState) => void
  clearError: () => void
}

const Editing = { label: 'Editing', icon: EditIcon }

const MapUserRole: {
  [key: string]: {
    label: string
    icon: React.FC<React.SVGAttributes<SVGElement>>
  }
} = {
  // temporarily removing Role types usage here to avoid complications arising from importing types from article editor to styleguide
  // Moving "ProjectRole" types into styleguide will help but it doesn't make any sense to keep those types in the styleguide
  // besides this mapping is created manually and not iteratively so we are not loosing much
  Editor: Editing,
  Owner: Editing,
  Writer: Editing,
  Annotator: { label: 'Suggesting', icon: RoleAnnotatingIcon },
  Viewer: { label: 'Reading', icon: RoleReadingIcon },
  Proofer: { label: 'Proofing', icon: RoleAnnotatingIcon },
}

export const EditorHeader: React.FC<{
  handleSnapshot?: () => Promise<void>
  submission: PartialSubmission
  hasPendingSuggestions?: boolean
  canCompleteTask: boolean
  exceptionDialog: React.FC<{ errorCode: string }>
  userRole: string
  submitProceed: {
    dialogData: ProceedDialogData
    submit: (statusId: string, noteValue: string) => Promise<unknown>
  }
  goBack?: () => void
  status?: 'saved' | 'saving' | 'offline' | 'failed'
  isAnnotator: boolean
  isProofer: boolean
  message: React.FC
  disabelProceedNote?: boolean
}> = ({
  handleSnapshot,
  submission,
  hasPendingSuggestions,
  userRole,
  canCompleteTask,
  submitProceed,
  goBack,
  status,
  isAnnotator,
  isProofer,
  message,
  exceptionDialog: ExceptionDialog,
  disabelProceedNote,
}) => {
  const [noteValue, setNoteValue] = useState<string>('')
  const [selectedTransitionIndex, setSelectedTransitionIndex] =
    useState<number>()

  const { dialogData, submit } = submitProceed
  const { updateState, clearError } = dialogData

  const continueDialogAction = useCallback(async () => {
    if (submission && selectedTransitionIndex && handleSnapshot) {
      const { status } =
        submission.currentStep.type.transitions[selectedTransitionIndex]

      updateState(DialogState.LOADING)
      await handleSnapshot()
      await submit(status.id, noteValue)
    }
  }, [
    submission,
    selectedTransitionIndex,
    handleSnapshot,
    updateState,
    submit,
    noteValue,
  ])

  const onTransitionClick = useCallback(
    (event) => {
      updateState(DialogState.INIT)
      setSelectedTransitionIndex(
        event.target.value || event.target.parentNode.value
      )
    },
    [setSelectedTransitionIndex, updateState]
  )

  const onCancelClick = useCallback(() => {
    setSelectedTransitionIndex(undefined)
    clearError()
    updateState(DialogState.CLOSED)
  }, [setSelectedTransitionIndex, clearError, updateState])

  const onNoteChange = useCallback(
    (event) => setNoteValue(event.target.value),
    [setNoteValue]
  )

  const currentStepTransition = submission?.currentStep.type.transitions
  const disable = !currentStepTransition || !canCompleteTask
  const errorCode = dialogData.mutationError?.graphQLErrors?.find(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => error?.extensions?.code
  )?.extensions?.code.name

  return (
    <Wrapper>
      {goBack && (
        <SecondaryButtonSmall onClick={goBack} type="button">
          <ArrowLeftIcon />
          <span>Dashboard</span>
        </SecondaryButtonSmall>
      )}

      {handleSnapshot &&
        typeof hasPendingSuggestions == 'boolean' &&
        submission.nextStep && (
          <ProceedView
            isAnnotator={isAnnotator}
            isProofer={isProofer}
            disable={disable}
            onTransitionClick={onTransitionClick}
            hasPendingSuggestions={hasPendingSuggestions}
            dialogData={dialogData}
            noteValue={noteValue}
            currentStepTransition={currentStepTransition}
            currentStepType={submission.currentStep.type}
            previousStepType={submission.previousStep?.type}
            nextStepType={submission.nextStep.type}
            onNoteChange={disabelProceedNote ? undefined : onNoteChange}
            continueDialogAction={continueDialogAction}
            onCancelClick={onCancelClick}
            message={message}
          />
        )}

      {status && (
        <ChildWrapper>
          <SaveStatus status={status} />
        </ChildWrapper>
      )}

      <Spacer />
      <CurrentStepLabel>{submission.currentStep.type.label}</CurrentStepLabel>
      <CurrentActionLablel>
        {userRole &&
          MapUserRole[userRole] &&
          React.createElement(MapUserRole[userRole].icon)}
        <span>{userRole && MapUserRole[userRole].label}</span>
      </CurrentActionLablel>

      <HelpDropdown />
      {errorCode && <ExceptionDialog errorCode={errorCode} />}
    </Wrapper>
  )
}
const HelpDropdown = () => {
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()
  return (
    <HelpDropdownContainer ref={wrapperRef}>
      <HelpDropdownButton onClick={toggleOpen}>
        <span>Help</span>
        <NavDropdownToggle className={isOpen ? 'open' : ''} />
      </HelpDropdownButton>
      {isOpen && (
        <DropdownList top={12} direction="right">
          <DropdownItem>Documentation</DropdownItem>
        </DropdownList>
      )}
    </HelpDropdownContainer>
  )
}
const SecondaryButtonSmall = styled(SecondaryButton)`
  font-size: inherit;
  margin-right: ${(props) => props.theme.grid.unit * 2}px;
  padding-top: ${(props) => props.theme.grid.unit * 0.75}px;
  padding-bottom: ${(props) => props.theme.grid.unit * 0.75}px;
`

const HelpDropdownButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`

const HelpDropdownContainer = styled(DropdownContainer)`
  border-left: 1px solid #f2f2f2;
  margin: -${(props) => props.theme.grid.unit * 3}px ${(props) =>
      props.theme.grid.unit * 2}px -${(props) => props.theme.grid.unit * 3}px
    ${(props) => props.theme.grid.unit * 6}px;
  padding: ${(props) => props.theme.grid.unit * 4.75}px 0
    ${(props) => props.theme.grid.unit * 5}px
    ${(props) => props.theme.grid.unit * 4}px;
`

const DropdownItem = styled.a`
  color: inherit;
  display: block;
  cursor: pointer;
  text-decoration: none;
  padding: ${(props) => props.theme.grid.unit * 5}px;
`
export const PrimaryButtonSmall = styled(PrimaryButton)`
  padding-top: ${(props) => props.theme.grid.unit * 0.75}px;
  padding-bottom: ${(props) => props.theme.grid.unit * 0.75}px;
  font-size: inherit;
`

const Wrapper = styled.div`
  display: flex;
  z-index: 6;
  padding: ${(props) => props.theme.grid.unit * 3}px
    ${(props) => props.theme.grid.unit * 8}px;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  font-size: 14px;
  background: white;

  ${NavDropdownContainer} + ${NavDropdownContainer} {
    margin-left: ${(props) => props.theme.grid.unit * 2}px;
  }
  ${PrimaryButtonSmall} + ${NavDropdownContainer} {
    margin-left: ${(props) => props.theme.grid.unit * 2}px;
  }
`

const CurrentStepLabel = styled.span`
  background: #f2f2f2;
  border-radius: ${(props) => props.theme.grid.unit * 1.5}px;
  padding: ${(props) => props.theme.grid.unit}px;
`

const CurrentActionLablel = styled.span`
  display: flex;
  padding: 0 ${(props) => props.theme.grid.unit * 6}px;
  svg {
    margin-right: ${(props) => props.theme.grid.unit * 2.5}px;
  }
`

const ChildWrapper = styled.div`
  display: inline-flex;
  margin: 0 2em;
  flex-direction: row;
  align-items: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  gap: 0 ${(props) => props.theme.grid.unit * 2}px;
  margin-top: ${(props) => props.theme.grid.unit * 4}px;
  background: ${(props) => props.theme.colors.background.secondary};
  padding: ${(props) => props.theme.grid.unit * 6}px;
`

const Line = styled.hr`
  margin: 5px 0 0 0;
  flex: 1;
  border: 1px dashed #c9c9c9;
`

const Spacer = styled.div`
  flex: auto;
`

export const MediumTextArea = styled(TextArea)`
  padding: 8px;
  font-size: 1em;
`
