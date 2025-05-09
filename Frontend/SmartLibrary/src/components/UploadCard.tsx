import React from 'react';

const UploadCard = () => {
    return (
        <>
            <style>{`
        .upload-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          width: 400px;
          box-shadow: 0 0 15px rgba(0,0,0,0.05);
          position: relative;
          left: 200px;
          top:30px;

         
        }
        .upload-card h3 {
          text-align: center;
          color: #1f74d1;
          margin-bottom: 20px;
        }
        .upload-card label {
          margin-right: 10px;
        }
        .upload-card select,
        .upload-card input[type="file"] {
          margin-top: 10px;
          width: 100%;
          padding: 6px;
        }
        .upload-btn {
          background-color: #2563eb;
          color: white;
          border: none;
          padding: 10px 20px;
          margin-top: 20px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          justify-content: center;
        }
        .upload-btn:hover {
          background-color: #1e40af;
        }
      `}</style>
            <div className="upload-card">
                <h3>Изберете образовен материјал за прикачување</h3>
                <form>
                    <input type="file" />
                    <div style={{ marginTop: '15px' }}>
                        <label htmlFor="category">Категорија:</label>
                        <select id="category">
                            <option>Математика</option>
                            <option>Физика</option>
                            <option>Хемија</option>
                        </select>
                    </div>
                    <button type="submit" className="upload-btn">
                        📤 Прикачи
                    </button>
                </form>
            </div>
        </>
    );
};

export default UploadCard;
