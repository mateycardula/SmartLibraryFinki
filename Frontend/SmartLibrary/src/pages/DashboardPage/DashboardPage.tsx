import DocumentList from "@features/documents/components/DocumentList.js";
import SideBar from "@components/SideBar.js";
import React from "react";

const DashboardPage = () => {
  //   ToDo: add SideBar component
  return (
      <>
      <style>{`
        .layout {
          display: flex;
        }
        .main {
          flex-grow: 1;
          padding: 40px;
          background-color: #ffffff;
          min-height: 100vh;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 24px;
          font-weight: bold;
          color: #1f3c88;
          margin-bottom: 30px;
          position:relative;
          left:290px;
        }
      `}</style>
    <div className="layout">
        <div className="main">
      <h1 style={{ marginBottom: "2rem" }}>📁 Документи</h1>
      <DocumentList/>
        </div>
    </div>
      </>
  );
};

export default DashboardPage;
