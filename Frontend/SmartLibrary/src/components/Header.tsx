import React from 'react';

const Header = () => {
    return (
        <>
            <style>{`
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
            <div className="header">
                📥 Прикачи документ
            </div>
        </>
    );
};

export default Header;
