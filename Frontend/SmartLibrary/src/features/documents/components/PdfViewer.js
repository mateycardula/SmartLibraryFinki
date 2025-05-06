import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import styles from "./pdfViewer.module.css";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
const PdfViewer = ({ file }) => {
    const [numPages, setNumPages] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numPages));
    return (_jsxs("div", { className: styles.viewer, children: [error && _jsxs("p", { className: styles.error, children: ["\u26A0\uFE0F Error loading PDF: ", error] }), loading && _jsx("p", { className: styles.loading, children: "\uD83D\uDCC4 Loading PDF..." }), _jsx(Document, { file: file, onLoadSuccess: ({ numPages }) => {
                    setNumPages(numPages);
                    setCurrentPage(1);
                    setLoading(false);
                }, onLoadError: (err) => {
                    setError(err.message);
                    setLoading(false);
                }, children: _jsx(Page, { pageNumber: currentPage, width: 600, className: styles.page }) }), numPages > 1 && (_jsxs("div", { className: styles.pagination, children: [_jsx("button", { onClick: goToPrevPage, disabled: currentPage === 1, children: "\u041F\u0440\u0435\u0442\u0445\u043E\u0434\u043D\u0430" }), _jsxs("span", { children: ["Page ", currentPage, " of ", numPages] }), _jsx("button", { onClick: goToNextPage, disabled: currentPage === numPages, children: "\u0421\u043B\u0435\u0434\u043D\u0430" })] }))] }));
};
export default PdfViewer;
