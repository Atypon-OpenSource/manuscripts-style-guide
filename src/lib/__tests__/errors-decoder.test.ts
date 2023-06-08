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

import decodeError from '../errors-decoder'

describe('decodedError', () => {
  it('should decode error as', () => {
    const decoded = decodeError('NOTES_NOT_UPDATED')
    expect(decoded).toEqual({
      title: 'Production Notes cannot be updated',
      description:
        'There was an internal error while updating the Production notes.',
      type: 'System',
    })
  })
  it('should decode unknown error as', () => {
    const decoded = decodeError('UNKNOWN_FAKE_ERROR')
    expect(decoded).toEqual({
      title: 'Unknown',
      description: '',
    })
  })
})
