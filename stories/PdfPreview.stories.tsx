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

import { storiesOf } from '@storybook/react'
import { useState } from 'react'
import * as React from 'react'
import styled from 'styled-components'

import { ButtonGroup, PrimaryButton } from '../src'
import PdfPreview from '../src/components/Preview/PdfPreview'

storiesOf('Pdf Preview', module).add('Pdf', () => {
  const [scale, setScale] = useState(1)

  return (
    <Container>
      <StyledButtonGroup>
        <PrimaryButton onClick={() => setScale(scale + 0.2)}>
          Zoom-In
        </PrimaryButton>
        <PrimaryButton onClick={() => setScale(scale - 0.2)}>
          Zoom-Out
        </PrimaryButton>
      </StyledButtonGroup>
      <PreviewWrapper>
        <PdfPreview
          url={
            'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
          }
          scale={scale}
        />
      </PreviewWrapper>
    </Container>
  )
})

const Container = styled.div`
  flex: 1;
`
const PreviewWrapper = styled.div`
  width: 80%;
  height: 800px;
  overflow: scroll;
  margin-top: 20px;
`

const StyledButtonGroup = styled(ButtonGroup)`
  justify-content: start;
`
