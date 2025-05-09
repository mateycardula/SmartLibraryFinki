import { mockDocuments } from "@features/documents/mockData.js";
import DocumentList from "@features/documents/components/DocumentList.js";

const DashboardPage = () => {
  //   ToDo: add SideBar component
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>📁 Документи</h1>
      <DocumentList documents={mockDocuments} />
    </div>
  );
};

export default DashboardPage;
