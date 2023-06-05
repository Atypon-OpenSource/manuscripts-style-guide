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
import React, { useMemo } from 'react'
import styled from 'styled-components'

import {
  Category,
  Dialog,
  LoadingOverlay,
  NavDropdown,
  NavDropdownButton,
  NavDropdownContainer,
  PrimaryBoldHeading,
  PrimaryButton,
  SecondarySmallText,
  TaskStepDoneIcon,
  useDropdown,
} from '../..'
import { AlertMessage, AlertMessageType } from '../AlertMessage'
import {
  MediumTextArea,
  PrimaryButtonSmall,
  SubmissionStepTransition,
  SubmissionStepType,
} from './EditorHeader'

const DropdownWrapper: React.FC<{
  button: React.FC | string
  disabled: boolean
  primary?: boolean
}> = ({ disabled, button, primary, children }) => {
  const { isOpen, toggleOpen, wrapperRef } = useDropdown()

  return (
    <NavDropdownContainer id={'user-dropdown'} ref={wrapperRef}>
      <NavDropdownButton
        as={(primary && PrimaryButton) || undefined}
        disabled={disabled}
        isOpen={isOpen}
        onClick={toggleOpen}
      >
        {button}
      </NavDropdownButton>
      {isOpen && <NavDropdown direction="left">{children}</NavDropdown>}
    </NavDropdownContainer>
  )
}

const StepDetails: React.FC<
  SubmissionStepType & { icon?: React.ReactNode }
> = ({ icon, label, description, role }) => (
  <>
    {icon && <TaskStatus>{icon}</TaskStatus>}
    <TaskContainer>
      <PrimaryBoldHeading>{label}</PrimaryBoldHeading>
      <SecondarySmallText>{description}</SecondarySmallText>
      <SecondarySmallText>Actor: {role.label}</SecondarySmallText>
    </TaskContainer>
  </>
)

export const ProceedView: React.FC<{
  isAnnotator: boolean
  disable: boolean
  onTransitionClick: (event: unknown) => void
  onNoteChange?: (event: unknown) => void
  hasPendingSuggestions: boolean
  loading: boolean
  showComplete: boolean
  noteValue: string
  currentStepTransition: SubmissionStepTransition[]
  error: string | undefined
  nextStepType: SubmissionStepType
  currentStepType: SubmissionStepType
  previousStepType: SubmissionStepType
  confirmationDialog: boolean
  onCancelClick: () => void
  continueDialogAction: () => Promise<void>
  message: React.FC<{ isCentered: boolean }>
}> = ({
  currentStepTransition,
  onTransitionClick,
  disable,
  loading,
  showComplete,
  confirmationDialog,
  nextStepType,
  currentStepType,
  previousStepType,
  isAnnotator,
  hasPendingSuggestions,
  error,
  noteValue,
  onNoteChange,
  onCancelClick,
  continueDialogAction,
  message: Message,
}) => {
  const dialogMessages = useMemo(
    () =>
      hasPendingSuggestions && !isAnnotator
        ? {
            header: 'The task can not be transitioned to the next step',
            message: `There are still pending suggestions in the document.
                It is not possible to complete the task without having them approved or rejected.`,
            actions: {
              primary: {
                action: onCancelClick,
                title: 'Ok',
              },
            },
          }
        : showComplete
        ? {
            header: 'Content reassigned successfully',
            message: `to the ${nextStepType.label}`,
            actions: {
              primary: {
                action: onCancelClick,
                title: 'Close',
              },
              // secondary: {
              //   action: onDashboardRedirectClick,
              //   title: 'Go to dashboard',
              // },
            },
          }
        : {
            header: 'Are you sure?',
            message:
              'You are about to complete your task. If you confirm, you will no longer be able to make any changes.',
            actions: {
              primary: {
                action: continueDialogAction,
                title: 'Continue',
              },
              secondary: {
                action: onCancelClick,
                title: 'Cancel',
              },
            },
          },
    [
      showComplete,
      continueDialogAction,
      // onDashboardRedirectClick,
      onCancelClick,
      nextStepType,
      hasPendingSuggestions,
      isAnnotator,
    ]
  )
  return (
    <>
      {(currentStepTransition && currentStepTransition?.length > 1 && (
        <DropdownWrapper button={'Complete task'} disabled={disable} primary>
          <TaskDropdown>
            {currentStepTransition &&
              currentStepTransition.map((transition, index) => (
                <Task
                  key={'task_' + transition.type.id}
                  className={
                    transition.status.id === 'success' ? 'happyPath' : ''
                  }
                  value={index}
                  onClick={onTransitionClick}
                >
                  <strong>{transition.type.label}</strong>
                  {transition.type.description}
                </Task>
              ))}
          </TaskDropdown>
        </DropdownWrapper>
      )) || (
        <PrimaryButtonSmall
          value={0}
          onClick={onTransitionClick}
          disabled={disable}
        >
          Complete task
        </PrimaryButtonSmall>
      )}

      {(loading && (
        <LoadingOverlay>
          <Message isCentered>Proceeding with your submission…</Message>
        </LoadingOverlay>
      )) || (
        <Dialog
          isOpen={confirmationDialog && !loading}
          category={Category.confirmation}
          header={dialogMessages.header}
          message={dialogMessages.message}
          actions={dialogMessages.actions}
        >
          {(showComplete && (
            <Grid>
              <StepDetails
                {...currentStepType}
                icon={
                  <>
                    <TaskStepDoneIcon />
                    <Line />
                  </>
                }
              />
              <StepDetails {...nextStepType} />
            </Grid>
          )) ||
            ((!hasPendingSuggestions || isAnnotator) && onNoteChange && (
              <TextAreaWrapper>
                <MediumTextArea
                  value={noteValue}
                  onChange={onNoteChange}
                  rows={5}
                  placeholder={'Add any additional comment here...'}
                />
              </TextAreaWrapper>
            ))}

          {error && (
            <AlertMessage type={AlertMessageType.error} hideCloseButton={true}>
              {error}
            </AlertMessage>
          )}
        </Dialog>
      )}
    </>
  )
}

const TaskDropdown = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.grid.unit * 2}px 0;
`

const Task = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  font: ${(props) => props.theme.font.weight.normal}
    ${(props) => props.theme.font.size.small} /
    ${(props) => props.theme.font.lineHeight.normal}
    ${(props) => props.theme.font.family.sans};
  order: 1;
  outline: none;
  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 4}px;
  text-align: left;
  width: ${(props) => props.theme.grid.unit * 66}px;

  &:not([disabled]):hover,
  &:not([disabled]):focus {
    background-color: ${(props) =>
      props.theme.colors.button.default.background.hover};
  }

  strong {
    color: ${(props) => props.theme.colors.text.primary};
    display: block;
    font-size: ${(props) => props.theme.font.size.normal};
    line-height: ${(props) => props.theme.font.lineHeight.normal};
  }

  &.happyPath {
    border-bottom: 1px solid ${(props) => props.theme.colors.border.tertiary};
    order: 0;
  }
`

const TextAreaWrapper = styled.div`
  margin-top: ${(props) => props.theme.grid.unit * 4}px;
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

const TaskStatus = styled.div`
  grid-column: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`

const TaskContainer = styled.div`
  grid-column: 2;
  margin-bottom: 8px;
`
