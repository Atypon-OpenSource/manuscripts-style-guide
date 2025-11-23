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

import { useRef, useState } from 'react'

export const useScrollDetection = (
  topTrigger: number,
  bottomTrigger: number
) => {
  const refRoot = useRef<HTMLDivElement | null>(null)
  const observer = useRef<(() => void) | undefined>(undefined)
  const [triggers, setTriggers] = useState({ bottom: false, top: false })

  const ref = (node: HTMLDivElement | null) => {
    if (!node) {
      return
    }
    refRoot.current = node

    if (refRoot.current && !observer.current) {
      const listener = () => {
        if (!refRoot.current) {
          return
        }
        const node = refRoot.current
        if (node.scrollTop == 0) {
          node.scrollTop = 1
        }

        const topRatio = node.scrollTop / node.offsetHeight
        const bottomRatio =
          1 -
          (node.scrollHeight - node.offsetHeight - node.scrollTop) /
            node.offsetHeight

        const newVal = { top: false, bottom: false }
        newVal.top = topRatio <= topTrigger

        newVal.bottom = Math.round(bottomRatio * 100) / 100 >= bottomTrigger

        setTriggers(newVal)
      }
      refRoot.current.addEventListener('scroll', listener)
      observer.current = listener
    }
  }

  return { ref, triggers }
}
