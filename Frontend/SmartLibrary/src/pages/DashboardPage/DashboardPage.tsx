import DocumentList from "@features/documents/components/DocumentList.js";

const DashboardPage = () => {
  //   ToDo: add SideBar component
  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "2rem" }}>📁 Документи</h1>
      <DocumentList/>
    </div>
  );
};

export default DashboardPage;
