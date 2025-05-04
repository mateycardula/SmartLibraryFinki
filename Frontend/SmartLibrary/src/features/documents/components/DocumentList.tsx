import React, { useState } from "react";
import { Document } from "../types";
import DocumentCard from "./DocumentCard";

interface Props {
  documents: Document[];
}

const DocumentList: React.FC<Props> = ({ documents }) => {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: string) => {
    if (!activeCategories.includes(category)) {
      setActiveCategories((prev) => [...prev, category]);
    }
  };

  const handleRemoveCategory = (category: string) => {
    setActiveCategories((prev) => prev.filter((c) => c !== category));
  };

  const filteredDocs =
    activeCategories.length === 0
      ? documents
      : documents.filter((doc) =>
          doc.categories.some((cat) => activeCategories.includes(cat))
        );

  const grouped: Record<string, Document[]> = {};
  filteredDocs.forEach((doc) => {
    doc.categories.forEach((category) => {
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(doc);
    });
  });

  return (
    <div>
      {/* 🏷️ Active Filters */}
      {activeCategories.length > 0 && (
        <div
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {activeCategories.map((cat) => (
            <span
              key={cat}
              style={{
                backgroundColor: "#cbd5e1",
                borderRadius: "9999px",
                padding: "4px 10px",
                fontSize: "0.85rem",
              }}
            >
              {cat}{" "}
              <button
                onClick={() => handleRemoveCategory(cat)}
                style={{
                  marginLeft: 6,
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                ×
              </button>
            </span>
          ))}
          <button
            onClick={() => setActiveCategories([])}
            style={{
              background: "#f87171",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "4px 10px",
              cursor: "pointer",
              fontSize: "0.85rem",
              marginLeft: "1rem",
            }}
          >
            Reset filters
          </button>
        </div>
      )}

      {Object.entries(grouped).map(([category, docs]) => (
        <div key={category} style={{ marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>{category}</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {docs.map((doc) => (
              <DocumentCard
                key={`${category}-${doc.id}`}
                document={doc}
                onCategoryClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>
      ))}

      {filteredDocs.length === 0 && (
        <p style={{ fontStyle: "italic", color: "#6b7280" }}>
          Нема документи за избраните категории.
        </p>
      )}
    </div>
  );
};

export default DocumentList;
