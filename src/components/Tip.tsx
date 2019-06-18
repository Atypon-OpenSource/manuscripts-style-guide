/*!
 * © 2019 Atypon Systems LLC
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

import React, { useCallback, useEffect, useState } from 'react'
import Tooltip, { Options } from 'tooltip.js'

export const Tip: React.FC<Pick<Options, 'placement' | 'title'>> = ({
  children,
  placement,
  title,
}) => {
  const [tooltip, setTooltip] = useState<Tooltip>()

  useEffect(
    () => () => {
      if (tooltip) {
        tooltip.dispose()
      }
    },
    [tooltip]
  )

  const createTooltip = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        setTooltip(
          new Tooltip(node, {
            placement,
            title,
            container: document.body,
            boundariesElement: 'window',
          })
        )
      }
    },
    [setTooltip, placement, title]
  )

  const show = useCallback(() => {
    if (tooltip) {
      tooltip.show()
    }
  }, [tooltip])

  const hide = useCallback(() => {
    if (tooltip) {
      tooltip.hide()
    }
  }, [tooltip])

  return (
    <div ref={createTooltip} onMouseEnter={show} onMouseLeave={hide}>
      {children}
    </div>
  )
}
