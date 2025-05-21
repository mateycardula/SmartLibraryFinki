import React, { useEffect, useState } from "react";
import { DocumentSummary } from "../types.js";
import DocumentCard from "./DocumentCard.js";

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
            `/api/upload-documents/user/${userId}/summary`
        );
        const data = await response.json();
        console.log("[📄] Documents fetched:", data);
        setDocuments(data);
      } catch (error) {
        console.error("[❌] Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDocuments();
    }
  }, [userId]);

  const handleCategoryClick = (category: string) => {
    if (!activeCategories.includes(category)) {
      console.log(`[🔎] Category filter added: ${category}`);
      setActiveCategories((prev) => [...prev, category]);
    }
  };

  const handleRemoveCategory = (category: string) => {
    console.log(`[❌] Category filter removed: ${category}`);
    setActiveCategories((prev) => prev.filter((c) => c !== category));
  };

  const filteredDocs =
      activeCategories.length === 0
          ? documents
          : documents.filter((doc) => {
            const match = doc.categoryNames.some((cat) =>
                activeCategories.includes(cat)
            );
            if (match) {
              console.log(`[✅] Including doc: ${doc.fileName} (${doc.id})`);
            }
            return match;
          });

  const grouped: Record<string, DocumentSummary[]> = {};
  filteredDocs.forEach((doc) => {
    if (!doc.categoryNames || doc.categoryNames.length === 0) {
      console.warn(`Document missing categoryNames:`, doc);
    }

    const uniqueCategories = [...new Set(doc.categoryNames)];

    uniqueCategories.forEach((category) => {
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(doc);
    });
  });

  if (loading) return <p>📄 Вчитување документи...</p>;

  return (
      <div>
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
                  onClick={() => {
                    console.log("[↩️] Reset category filters");
                    setActiveCategories([]);
                  }}
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
                {docs.map((doc) => {
                  console.log(`[🧱] Rendering DocumentCard: ${doc.fileName}`);
                  return (
                      <DocumentCard
                          key={`${category}-${doc.id}`}
                          document={doc}
                          onCategoryClick={handleCategoryClick}
                      />
                  );
                })}
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
