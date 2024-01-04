/*!
 * © 2023 Atypon Systems LLC
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
import Trashcan from '@manuscripts/assets/react/AnnotationRemove'
import ArrowDownBlue from '@manuscripts/assets/react/ArrowDownBlue'
import { BibliographicName, BibliographyItem } from '@manuscripts/json-schema'
import {
  buildBibliographicDate,
  buildBibliographicName,
} from '@manuscripts/transform'
import {
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  useFormikContext,
} from 'formik'
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import {
  ButtonGroup,
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from '../Button'
import { Category, Dialog } from '../Dialog'
import { DeleteIcon } from '../icons/delete-icon'
import { LinkIcon } from '../icons/link-icon'
import { OptionType, SelectField } from '../SelectField'
import { TextArea, TextField } from '../TextField'

export const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.grid.unit}px;
`

const Label = styled.label`
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: ${(props) => props.theme.font.size.medium};
  display: flex;
  color: ${(props) => props.theme.colors.text.secondary};
`

const FieldLabel = styled.label`
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: ${(props) => props.theme.font.size.medium};
  color: ${(props) => props.theme.colors.text.muted};
  padding-right: ${(props) => props.theme.grid.unit * 3}px;
`

const NameFieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.background.primary};
  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.text.muted};
  }
`

const NameField = styled.input`
  font-size: ${(props) => props.theme.font.size.normal};
  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 4}px;
  box-sizing: border-box;
  border: none;
  background-color: transparent;
  width: 50%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.muted};
  }

  &:hover::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`

const YearField = styled(Field)`
  font-family: ${(props) => props.theme.font.family.sans};
  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 3}px;
  font-size: ${(props) => props.theme.font.size.medium};
  color: ${(props) => props.theme.colors.text.primary};
  border-radius: ${(props) => props.theme.grid.radius.small};
  border: solid 1px ${(props) => props.theme.colors.text.muted};
`

const Button = styled(IconButton).attrs({
  defaultColor: true,
  size: 24,
})`
  circle,
  use {
    fill: ${(props) => props.theme.colors.brand.default};
  }

  path {
    mask: none;
  }
`

const Actions = styled.div`
  flex-shrink: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .tooltip {
    max-width: ${(props) => props.theme.grid.unit * 39}px;
    padding: ${(props) => props.theme.grid.unit * 2}px;
    border-radius: 6px;
  }
`

export const FormField = styled.div`
  padding: ${(props) => props.theme.grid.unit * 3}px;
`

const ReferenceTextField = styled(TextField)`
  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 3}px;
`

export const ReferenceTextArea = styled(TextArea)`
  padding: ${(props) => props.theme.grid.unit * 2}px
    ${(props) => props.theme.grid.unit * 3}px;
  height: ${(props) => props.theme.grid.unit * 20}px;
  resize: none;
`

export const FlexForm = styled(Form)`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const FormFields = styled.div`
  flex: 1;
  overflow-y: auto;
`

const AuthorDropDown: React.FC<{
  author: BibliographicName
  index: number
  remove: (index: number) => void
  handleChange: (e: React.ChangeEvent) => void
}> = ({ author, index, remove, handleChange }) => {
  const [isOpen, setIsOpen] = useState(!!author['isNew'])
  const fullName = [author.given, author.family].join(' ').trim()
  const title = fullName.length > 0 ? fullName : 'Edit author name'

  return (
    <Section key={author._id}>
      <Title>
        <ToggleButton
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        >
          <DropdownIndicator>
            <ArrowDownBlue />
          </DropdownIndicator>
          {title}
        </ToggleButton>
        <RemoveButton
          type="button"
          aria-label="Delete this affiliation"
          onClick={() => remove(index)}
        >
          <Trashcan />
        </RemoveButton>
      </Title>
      {isOpen && (
        <AuthorForm>
          <Field
            name={`author.${index}.given`}
            value={author.given}
            onChange={handleChange}
          >
            {({ field }: FieldProps) => (
              <NameFieldContainer>
                <NameField
                  {...field}
                  id={field.name}
                  placeholder={'Given'}
                  autoFocus={true}
                />
                <FieldLabel htmlFor={field.name}>Given</FieldLabel>
              </NameFieldContainer>
            )}
          </Field>

          <Field
            name={`author.${index}.family`}
            value={author.family}
            onChange={handleChange}
          >
            {({ field }: FieldProps) => (
              <NameFieldContainer>
                <NameField
                  {...field}
                  id={field.name}
                  placeholder={'Family'}
                  autoFocus={true}
                />
                <FieldLabel htmlFor={field.name}>Family</FieldLabel>
              </NameFieldContainer>
            )}
          </Field>
        </AuthorForm>
      )}
    </Section>
  )
}

export type ReferencesFormValues = Pick<
  BibliographyItem,
  | '_id'
  | 'title'
  | 'author'
  | 'DOI'
  | 'issued'
  | 'type'
  | 'container-title'
  | 'URL'
  | 'issue'
  | 'volume'
  | 'supplement'
  | 'page'
>

//TODO move to config?
const bibliographyItemTypes = [
  ['article', 'Article'],
  ['article-journal', 'Journal Article'],
  ['article-magazine', 'Magazine Article'],
  ['article-newspaper', 'Newspaper Article'],
  ['bill', 'Bill'],
  ['book', 'Book'],
  ['broadcast', 'Broadcast'],
  ['chapter', 'Chapter'],
  ['dataset', 'Dataset'],
  ['entry', 'Entry'],
  ['entry-dictionary', 'Dictionary Entry'],
  ['entry-encyclopedia', 'Encyclopedia Entry'],
  ['figure', 'Figure'],
  ['graphic', 'Graphic'],
  ['interview', 'Interview'],
  ['legal_case', 'Legal Case'],
  ['legislation', 'Legislation'],
  ['manuscript', 'Manuscript'],
  ['map', 'Map'],
  ['motion_picture', 'Motion Picture'],
  ['musical_score', 'Musical Score'],
  ['pamphlet', 'Pamphlet'],
  ['paper-conference', 'Conference Paper'],
  ['patent', 'Patent'],
  ['personal_communication', 'Personal Communication'],
  ['post', 'Post'],
  ['post-weblog', 'Blog Post'],
  ['report', 'Report'],
  ['review', 'Review'],
  ['review-book', 'Book Review'],
  ['song', 'Song'],
  ['speech', 'Speech'],
  ['thesis', 'Thesis'],
  ['treaty', 'Treaty'],
  ['webpage', 'Web Page'],
]

const bibliographyItemTypeOptions: OptionType[] = bibliographyItemTypes.map(
  (i) => ({
    label: i[1],
    value: i[0],
  })
)

interface ChangeHandlingFormProps<Values> {
  onChange: (values: Values) => void
}
const ChangeHandlingForm = <Values,>(
  props: PropsWithChildren<ChangeHandlingFormProps<Values>>
) => {
  const { values } = useFormikContext<Values>()

  useEffect(() => {
    // you might modify this to fit your use case
    // like adding a `const prevValues = usePrevious(values)` above and checking for equality
    // or debounce this whole function but make sure not to use stale values
    props.onChange?.(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onChange, values])

  return <FlexForm>{props.children}</FlexForm>
}

export const ReferenceForm: React.FC<{
  values: ReferencesFormValues
  showDelete: boolean
  handleChange: (values: ReferencesFormValues) => void
  handleCancel: () => void
  handleDelete: () => void
  handleSave: (values: ReferencesFormValues) => void
}> = ({
  values,
  showDelete,
  handleChange: onChange,
  handleDelete,
  handleCancel,
  handleSave,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = 0
    }
  }, [values])

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <Formik<ReferencesFormValues>
      initialValues={values}
      onSubmit={handleSave}
      enableReinitialize={true}
    >
      {({ values, setFieldValue, handleChange }) => {
        return (
          <ChangeHandlingForm onChange={onChange}>
            <Dialog
              isOpen={showDeleteDialog}
              category={Category.confirmation}
              header="Delete Reference"
              message="Are you sure you want to delete this reference from the list?"
              actions={{
                secondary: {
                  action: () => {
                    handleDelete()
                    setShowDeleteDialog(false)
                  },
                  title: 'Delete',
                },
                primary: {
                  action: () => setShowDeleteDialog(false),
                  title: 'Cancel',
                },
              }}
            />
            <Actions>
              <ButtonGroup>
                <IconButton
                  defaultColor
                  as="a"
                  href={`https://doi.org/${values.DOI}`}
                  target={'_blank'}
                >
                  <LinkIcon />
                </IconButton>
                <div data-tip={true} data-for={'delete-button'}>
                  <DeleteButton
                    defaultColor
                    disabled={!showDelete}
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <DeleteIcon />
                  </DeleteButton>
                  <ReactTooltip
                    disable={showDelete}
                    id={'delete-button'}
                    place="bottom"
                    effect="solid"
                    offset={{ top: 15 }}
                    className="tooltip"
                  >
                    Unable to delete because the item is used in the document
                  </ReactTooltip>
                </div>
              </ButtonGroup>
              <ButtonGroup>
                <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
                <PrimaryButton type="submit">Save</PrimaryButton>
              </ButtonGroup>
            </Actions>

            <FormFields ref={ref}>
              <FormField>
                <LabelContainer>
                  <Label htmlFor={'citation-item-type'}>Type</Label>
                </LabelContainer>

                <Field
                  id={'citation-item-type'}
                  name={'type'}
                  component={SelectField}
                  options={bibliographyItemTypeOptions}
                />
              </FormField>
              <FormField>
                <LabelContainer>
                  <Label>Title</Label>
                </LabelContainer>

                <Field name={'title'}>
                  {(props: FieldProps) => (
                    <ReferenceTextArea id={'title'} {...props.field} />
                  )}
                </Field>
              </FormField>

              <FieldArray
                name={'author'}
                render={({ push, remove }) => (
                  <FormField>
                    <LabelContainer>
                      <Label>Authors</Label>

                      <Button
                        onClick={() =>
                          push(
                            buildBibliographicName({
                              given: '',
                              family: '',
                              isNew: true,
                            })
                          )
                        }
                      >
                        <AddAuthor height={17} width={17} />
                      </Button>
                    </LabelContainer>

                    <div>
                      {values.author &&
                        values.author.map((author, index) => (
                          <AuthorDropDown
                            key={index}
                            index={index}
                            author={author}
                            remove={remove}
                            handleChange={handleChange}
                          />
                        ))}
                    </div>
                  </FormField>
                )}
              />

              <FormField>
                <LabelContainer>
                  <Label htmlFor={"issued['date-parts'][0][0]"}>Year</Label>
                </LabelContainer>

                <YearField
                  name={"issued['date-parts'][0][0]"}
                  type={'number'}
                  step={1}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const { value } = event.target

                    if (value) {
                      if (values.issued) {
                        // NOTE: this assumes that "issued" is already a complete object
                        setFieldValue(
                          "issued['date-parts'][0][0]",
                          Number(value)
                        )
                      } else {
                        setFieldValue(
                          'issued',
                          buildBibliographicDate({
                            'date-parts': [[Number(value)]],
                          })
                        )
                      }
                    } else {
                      // NOTE: not undefined due to https://github.com/jaredpalmer/formik/issues/2180
                      setFieldValue('issued', '')
                    }
                  }}
                />
              </FormField>

              <FormField>
                <LabelContainer>
                  <Label htmlFor={'container-title'}>Container Title</Label>
                </LabelContainer>

                <Field name={'container-title'}>
                  {(props: FieldProps) => (
                    <ReferenceTextArea
                      id={'container-title'}
                      {...props.field}
                    />
                  )}
                </Field>
              </FormField>

              <FormField>
                <LabelContainer>
                  <Label htmlFor={'volume'}>Volume</Label>
                </LabelContainer>

                <Field name={'volume'}>
                  {(props: FieldProps) => (
                    <ReferenceTextField id={'volume'} {...props.field} />
                  )}
                </Field>
              </FormField>

              <FormField>
                <LabelContainer>
                  <Label htmlFor={'issue'}>Issue</Label>
                </LabelContainer>

                <Field name={'issue'}>
                  {(props: FieldProps) => (
                    <ReferenceTextField id={'issue'} {...props.field} />
                  )}
                </Field>
              </FormField>

              <FormField>
                <LabelContainer>
                  <Label htmlFor={'page'}>Page</Label>
                </LabelContainer>

                <Field name={'page'}>
                  {(props: FieldProps) => (
                    <ReferenceTextField id={'page'} {...props.field} />
                  )}
                </Field>
              </FormField>

              <FormField>
                <LabelContainer>
                  <Label htmlFor={'url'}>URL</Label>
                </LabelContainer>

                <Field name={'URL'}>
                  {(props: FieldProps) => (
                    <ReferenceTextField
                      type={'url'}
                      id={'url'}
                      {...props.field}
                    />
                  )}
                </Field>
              </FormField>

              <FormField>
                <LabelContainer>
                  <Label htmlFor={'doi'}>DOI</Label>
                </LabelContainer>

                <Field name={'DOI'}>
                  {(props: FieldProps) => (
                    <ReferenceTextField
                      id={'doi'}
                      pattern={'(https://doi.org/)?10..+'}
                      {...props.field}
                    />
                  )}
                </Field>
              </FormField>

              <FormField>
                <LabelContainer>
                  <Label htmlFor={'supplement'}>Supplement</Label>
                </LabelContainer>

                <Field name={'supplement'}>
                  {(props: FieldProps) => (
                    <ReferenceTextField
                      type={'supplement'}
                      id={'supplement'}
                      {...props.field}
                    />
                  )}
                </Field>
              </FormField>
            </FormFields>
          </ChangeHandlingForm>
        )
      }}
    </Formik>
  )
}

const DeleteButton = styled(IconButton)`
  background-color: ${(props) =>
    props.theme.colors.background.primary} !important;
  border-color: ${(props) => props.theme.colors.background.primary} !important;
  .icon_element {
    fill: ${(props) => (props.disabled && '#c9c9c9') || '#F35143'} !important;
  }
`

const Section = styled.section`
  border: 1px solid ${(props) => props.theme.colors.border.field.default};
  border-radius: ${(props) => props.theme.grid.radius.default};
  background: ${(props) => props.theme.colors.background.primary};
  margin-bottom: ${(props) => props.theme.grid.unit * 3}px;
  overflow: hidden;
`

const AuthorForm = styled(Section)`
  margin: ${(props) => props.theme.grid.unit * 3}px;
`

const Title = styled.h4<{
  isInvalid?: boolean
}>`
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  padding-right: 0.5rem;
  background: ${(props) =>
    props.isInvalid ? props.theme.colors.background.warning : 'transparent'};
  color: ${(props) =>
    props.isInvalid ? props.theme.colors.text.warning : 'inherit'};
`

const DropdownIndicator = styled(ArrowDownBlue)`
  border: 0;
  border-radius: 50%;
  margin-right: 0.6em;
  min-width: 20px;
`

const ToggleButton = styled.button<{
  isOpen: boolean
}>`
  flex-grow: 1;
  display: flex;
  align-items: center;
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;
  font-family: ${(props) => props.theme.font.family.sans};
  font-size: 1rem;
  padding: 0.6em 0.5em;

  outline: none;

  &:focus {
    color: ${(props) => props.theme.colors.button.primary.border.hover};
  }

  svg {
    transform: ${(props) => (props.isOpen ? 'rotateX(180deg)' : 'initial')};
  }
`

const RemoveButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;

  outline: none;

  &:focus path {
    fill: ${(props) => props.theme.colors.button.primary.color.hover};
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`
