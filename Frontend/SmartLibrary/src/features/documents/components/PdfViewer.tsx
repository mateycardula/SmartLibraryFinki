import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import styles from "./pdfViewer.module.css";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface Props {
  file: File | string;
}

const PdfViewer: React.FC<Props> = ({ file }) => {
  const [numPages, setNumPages] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, numPages));

  return (
    <div className={styles.viewer}>
      {error && <p className={styles.error}>⚠️ Error loading PDF: {error}</p>}
      {loading && <p className={styles.loading}>📄 Loading PDF...</p>}

      <Document
        file={file}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          setCurrentPage(1);
          setLoading(false);
        }}
        onLoadError={(err) => {
          setError(err.message);
          setLoading(false);
        }}
      >
        <Page pageNumber={currentPage} width={600} className={styles.page}   renderTextLayer={false}/>
      </Document>

      {numPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            Претходна
          </button>
          <span>
            Page {currentPage} of {numPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === numPages}>
            Следна
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;
