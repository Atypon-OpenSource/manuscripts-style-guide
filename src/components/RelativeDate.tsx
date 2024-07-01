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

export type RelativeDateProps = React.HTMLAttributes<HTMLSpanElement> & {
  date?: number
}

export const RelativeDate: React.FC<RelativeDateProps> = ({
  date,
  ...props
}) => {
  if (!date) {
    return null
  }

  const formatter = new Intl.RelativeTimeFormat('en', { style: 'short' })
  let value = Math.floor((date - Date.now()) / 3600000)
  let unit: Intl.RelativeTimeFormatUnit = 'hour'
  if (Math.abs(value) > 24) {
    value = Math.floor(value / 24)
    unit = 'day'
  }
  return <span {...props}>{formatter.format(value, unit)}</span>
}
