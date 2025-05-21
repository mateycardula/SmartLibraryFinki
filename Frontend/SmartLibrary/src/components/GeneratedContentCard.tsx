import React, { useEffect, useState } from 'react';
import { FaFlask } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ExportSummary {
    id: number;
    fileName: string;
}

const GeneratedContentCard: React.FC = () => {
    const [exports, setExports] = useState<ExportSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;
        fetch(`/api/exports/user/${userId}/summary`)
            .then((res) => res.json())
            .then((data) => setExports(data))
            .catch((err) => {
                console.error("Failed to fetch exports", err);
                setExports([]);
            })
            .finally(() => setLoading(false));
    }, [userId]);

    const handleClick = (id: number) => {
        navigate(`/exported/${id}`);
    };

    return (
        <>
            <style>{`
        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          padding: 20px;
          justify-content: center;
        }
        .card {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.3s ease;
          text-align: center;
          cursor: pointer;
        }
        .card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }
        .card-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .card-icon {
          color: #16a34a;
          font-size: 20px;
        }
        .card-title {
          color: #1d4ed8;
          font-weight: 600;
          font-size: 15px;
        }
        .no-data {
          text-align: center;
          margin-top: 2rem;
          font-size: 1.1rem;
          color: #64748b;
        }
      `}</style>

            {loading ? (
                <p className="no-data">🔄 Вчитување податоци...</p>
            ) : exports.length === 0 ? (
                <p className="no-data">📄 Нема достапни експортирани документи.</p>
            ) : (
                <div className="card-container">
                    {exports.map((exp) => (
                        <div key={exp.id} className="card" onClick={() => handleClick(exp.id)}>
                            <div className="card-header">
                                <FaFlask className="card-icon" />
                                <div className="card-title">{exp.fileName}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default GeneratedContentCard;
