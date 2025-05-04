import PdfViewer from "./PdfViewer";
import { getFileType } from "@shared/utils/fileUtils";

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
