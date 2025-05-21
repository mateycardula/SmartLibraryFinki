import React from 'react';
import SideBar from '../../components/SideBar.js';
import Header from '../../components/Header.js';
import UploadCard from '../../components/UploadCard.js';


const UploadDocumentsPage = () => {
    return (
        <>
            <style>{`
        .layout {
          display: flex;
        }
        .main {
          flex-grow: 1;
          padding: 40px;
          background-color: #f4f6fa;
          min-height: 100vh;
        }
      `}</style>
            <div className="layout">
                <div className="main">
                    <Header />
                    <UploadCard />
                </div>
            </div>
        </>
    );
};
export default UploadDocumentsPage;
