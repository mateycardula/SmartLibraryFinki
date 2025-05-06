import { jsx as _jsx } from "react/jsx-runtime";
import PdfViewer from "./PdfViewer";
import { getFileType } from "@shared/utils/fileUtils";
const DocumentViewer = ({ file }) => {
    const type = getFileType(file);
    if (type === "pdf") {
        return _jsx(PdfViewer, { file: file });
    }
    return _jsx("p", { children: "Unsupported file format" });
};
export default DocumentViewer;
