import PdfViewer from "./PdfViewer.tsx";
import { getFileType } from "@shared/utils/fileUtils.ts";

interface Props {
  file: File | string;
}

const DocumentViewer: React.FC<Props> = ({ file }) => {
  const type = getFileType(file);

  if (type === "pdf") {
    return <PdfViewer file={file} />;
  }

  return <p>Unsupported file format</p>;
};

export default DocumentViewer;
