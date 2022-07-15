/*!
 * © 2022 Atypon Systems LLC
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

import { isEqual } from 'lodash'
import { useCallback, useMemo, useRef } from 'react'

const useDeepCompare = <D>(deps: D) => {
  const ref = useRef(deps)

  if (!isEqual(deps, ref.current)) {
    ref.current = deps
  }

  return ref.current
}

export const useDeepCompareMemo = <T, D>(callback: () => T, deps: D) =>
  useMemo(callback, [useDeepCompare(deps), callback])

export const useDeepCompareCallback = <T, D>(callback: () => T, deps: D) =>
  useCallback(callback, [useDeepCompare(deps), callback])
