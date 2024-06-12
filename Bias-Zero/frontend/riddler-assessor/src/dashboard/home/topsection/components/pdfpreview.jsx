import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();


const PdfPreview = ({ pdfUrl }) => {
  return (
    <div>
      <Document file={pdfUrl}>
        <Page pageNumber={1} height={600} width={400} pageIndex={1}/>
      </Document>
    </div>
  );
};

export default PdfPreview;
