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
  const msAgo = Date.now() - date
  const minutesAgo = msAgo / 60000

  const HOUR = 60
  const DAY = 24 * 60

  let value: number
  let unit: Intl.RelativeTimeFormatUnit

  if (minutesAgo < 1) {
    return <span {...props}>just now</span>
  } else if (minutesAgo < HOUR) {
    value = Math.round(minutesAgo)
    unit = 'minute'
  } else if (minutesAgo < DAY) {
    value = Math.round(minutesAgo / HOUR)
    unit = 'hour'
  } else {
    value = Math.round(minutesAgo / DAY)
    unit = 'day'
  }

  // Make negative for "X ago" formatting
  return <span {...props}>{formatter.format(-value, unit)}</span>
}
