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

import {
  getDocument,
  GlobalWorkerOptions,
  PDFDocumentProxy,
  PDFPromise,
} from 'pdfjs-dist'
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import { EventBus, PDFViewer } from 'pdfjs-dist/web/pdf_viewer'
import React, { useEffect, useRef, useState } from 'react'

GlobalWorkerOptions.workerSrc = pdfjsWorker

type EventBusType = {
  on: (eventName: string, eventHandler: () => void) => void
}

const PdfPreview: React.FC<{ scale?: number; url: string }> = ({
  url,
  scale = 1,
}) => {
  const [pdfViewer, setPdfViewer] = useState<{ currentScaleValue: number }>({
    currentScaleValue: scale,
  })
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
    const loadingTask = getDocument(url)
    const proxyPDFPromise: PDFPromise<PDFDocumentProxy> = loadingTask.promise.then(
      (pdfDocument) => pdfViewer.setDocument(pdfDocument)
    )
  }, [url])

  useEffect(() => {
    pdfViewer.currentScaleValue = scale
    if (eventBus) {
      eventBus.on('pagesinit', () => (pdfViewer.currentScaleValue = scale))
    }
  }, [pdfViewer, eventBus, scale])

  return (
    <div ref={nodeRef} id={'viewerContainer'}>
      <div id="viewer" className="pdfViewer" />
    </div>
  )
}

export default PdfPreview
