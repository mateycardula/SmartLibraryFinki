import React from "react";
import { useNavigate } from "react-router-dom";
import { Document } from "../types.js";

interface Props {
  document: Document;
  onCategoryClick?: (category: string) => void;
}

const DocumentCard: React.FC<Props> = ({ document, onCategoryClick }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/documents/${document.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        padding: "1rem",
        background: "#f1f5f9",
        borderRadius: "12px",
        minWidth: "240px",
        maxWidth: "280px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "box-shadow 0.2s ease-in-out",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)")
      }
    >
      <div>
        <h3 style={{ margin: "0 0 0.5rem" }}>{document.title}</h3>
        <small style={{ color: "#64748b" }}>
          {new Date(document.createdAt).toLocaleDateString()}
        </small>

        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
          }}
          onClick={(e) => e.stopPropagation()} // prevent nav when clicking tag
        >
          {document.categories.map((cat) => (
            <span
              key={cat}
              onClick={() => onCategoryClick?.(cat)}
              style={{
                backgroundColor: "#e2e8f0",
                color: "#1e293b",
                padding: "4px 10px",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
