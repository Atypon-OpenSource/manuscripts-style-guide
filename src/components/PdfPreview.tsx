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
import 'pdfjs-dist/web/pdf_viewer.css'

// NOTE when upgrading https://github.com/mozilla/pdf.js/issues/13190
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/build/pdf'
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import {
  PDFDocumentLoadingTask,
  PDFDocumentProxy,
  // eslint-disable-next-line import/no-unresolved
} from 'pdfjs-dist/types/src/display/api'
import { EventBus, PDFViewer } from 'pdfjs-dist/web/pdf_viewer'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

GlobalWorkerOptions.workerSrc = pdfjsWorker

type EventBusType = {
  on: (eventName: string, eventHandler: () => void) => void
}

type ProgressData = {
  loaded: number
  total: number
}

const PdfPreview: React.FC<{ scale?: number; url: string }> = ({
  url,
  scale = 1,
}) => {
  const [pdfViewer, setPdfViewer] = useState<{ currentScaleValue: number }>({
    currentScaleValue: scale,
  })
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [eventBus, setEventBus] = useState<EventBusType | null>(null)

  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = nodeRef.current
    const eventBus = new EventBus()

    const pdfViewer = new PDFViewer({
      container,
      eventBus,
    })

    setPdfViewer(pdfViewer)
    setEventBus(eventBus)
    const loadingTask: PDFDocumentLoadingTask = getDocument({
      url,
      withCredentials: true,
    })
    loadingTask.onProgress = (progressData: ProgressData) =>
      setProgress(progressData)

    loadingTask.promise
      .then(
        (pdfDocument: PDFDocumentProxy) => {
          pdfViewer.setDocument(pdfDocument)
          return true
        },
        (exception: string) => {
          setError(exception)
        }
      )
      .catch((err: string) => {
        setError(err)
      })
  }, [url])

  useEffect(() => {
    pdfViewer.currentScaleValue = scale
    if (eventBus) {
      eventBus.on('pagesinit', () => (pdfViewer.currentScaleValue = scale))
    }
  }, [pdfViewer, eventBus, scale])

  if (error) {
    return <Error>Unable to download PDF file</Error>
  }

  return (
    <ViewerContainer ref={nodeRef} id={'viewerContainer'}>
      <div id="viewer" className="pdfViewer" />
      {progress != null ? (
        progress.total > progress.loaded && (
          <Container>
            <ProgressContainer>
              <Progress progress={(progress.loaded / progress.total) * 100}>
                {((progress.loaded / progress.total) * 100).toFixed()}%
              </Progress>
            </ProgressContainer>
          </Container>
        )
      ) : (
        <Container>{'Loading\u2026'}</Container>
      )}
    </ViewerContainer>
  )
}

export default PdfPreview

const ViewerContainer = styled.div`
  position: absolute;
  width: 100%;
`

const Container = styled.div`
  position: fixed;
  top: 50%;
  right: 50%;
`

const ProgressContainer = styled.div`
  width: ${(props) => props.theme.grid.unit * 50}px;
  height: ${(props) => props.theme.grid.unit * 7}px;
  overflow: hidden;
  background: ${(props) => props.theme.colors.background.secondary};
`

const Progress = styled.div<{ progress: number }>`
  height: 100%;
  display: block;
  width: ${(props) => props.progress}%;
  background: ${(props) => props.theme.colors.background.success};
  text-align: center;
`

const Error = styled(Container)`
  color: ${(props) => props.theme.colors.text.error};
`
