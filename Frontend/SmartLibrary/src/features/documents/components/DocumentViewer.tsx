import PdfViewer from "./PdfViewer.tsx";

interface Props {
  file: string;
  fileType: string;
}

const DocumentViewer: React.FC<Props> = ({ file, fileType }) => {
  const type = fileType.toLowerCase();

  if (type === "pdf") {
    return <PdfViewer file={file} />;
  }

  return <p>Unsupported file format: {fileType}</p>;
};


export default DocumentViewer;
