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

import { ContributorRole } from '@manuscripts/manuscripts-json-schema'
import React, { useMemo, useState } from 'react'
import { Creatable as CreatableSelect } from 'react-select'

const sortRolesAlphabetical = (a: ContributorRole, b: ContributorRole) =>
  a.name.localeCompare(b.name)

export const ContributorRolesSelect: React.FC<{
  contributorRoles: ContributorRole[]
  createContributorRole: (name: string) => Promise<ContributorRole>
  value: string[]
  setFieldValue: (value: string[]) => void
}> = ({ contributorRoles, createContributorRole, value, setFieldValue }) => {
  const [saving, setSaving] = useState(false)

  const selectedRoles = useMemo(
    () =>
      value
        .map(id => contributorRoles.find(item => item._id === id))
        .flat() as ContributorRole[],
    [contributorRoles, value]
  )

  const options = useMemo(() => {
    const output = { local: [], 'dictionary.casrai.org': [] }

    const groupedOptions = contributorRoles.reduce(
      (output, contributorRole) => {
        if (contributorRole.uri) {
          const { hostname } = new URL(contributorRole.uri)

          if (hostname in output) {
            output[hostname].push(contributorRole)
          }
        } else {
          output.local.push(contributorRole)
        }

        return output
      },
      output as {
        [key: string]: ContributorRole[]
      }
    )

    return [
      {
        options: groupedOptions.local.sort(sortRolesAlphabetical),
      },
      {
        label: 'CASRAI CRediT',
        options: groupedOptions['dictionary.casrai.org'].sort(
          sortRolesAlphabetical
        ),
      },
    ]
  }, [contributorRoles])

  return (
    <CreatableSelect<ContributorRole>
      options={options}
      value={selectedRoles}
      isMulti={true}
      isClearable={true}
      isLoading={saving}
      placeholder={'Begin typing or choose contribution'}
      noOptionsMessage={() => 'Type the name of a contributor role'}
      getNewOptionData={inputValue => {
        const option = {
          name: `Create "${inputValue}" role`,
        }

        return option as ContributorRole
      }}
      onCreateOption={async inputValue => {
        setSaving(true)

        const contribution = await createContributorRole(inputValue)

        setSaving(false)

        setFieldValue([...value, contribution._id])
      }}
      getOptionValue={option => option._id}
      getOptionLabel={option => option.name}
      onChange={value => {
        const items = value as ContributorRole[]

        setFieldValue(items.map(item => item._id))
      }}
    />
  )
}
