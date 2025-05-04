import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { mockDocuments } from "../../features/documents/mockData";
import DocumentViewer from "@features/documents/components/DocumentViewer";
import { Document } from "@features/documents/types";
import TopBar from "@components/TopBar";

const DocumentDetailPage = () => {
  const { id } = useParams();
  const initialDoc = mockDocuments.find((d) => d.id === id);

  const [document, setDocument] = useState<Document | undefined>(initialDoc);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(initialDoc?.title || "");
  const [categoryInput, setCategoryInput] = useState("");

  if (!document) return <p>📄 Документот не е пронајден.</p>;

  const updateMockDocument = (updatedDoc: Document) => {
    const index = mockDocuments.findIndex((d) => d.id === updatedDoc.id);
    if (index !== -1) {
      mockDocuments[index] = updatedDoc;
    }
  };

  const handleTitleSubmit = () => {
    if (titleDraft.trim()) {
      const updated = { ...document, title: titleDraft.trim() };
      setDocument(updated);
      updateMockDocument(updated);
    }
    setEditingTitle(false);
  };

  const handleCategoryAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = categoryInput.trim();
      if (trimmed && !document.categories.includes(trimmed)) {
        const updated = {
          ...document,
          categories: [...document.categories, trimmed],
        };
        setDocument(updated);
        updateMockDocument(updated);
        setCategoryInput("");
      }
    }
  };

  const handleRemoveCategory = (cat: string) => {
    const updated = {
      ...document,
      categories: document.categories.filter((c) => c !== cat),
    };
    setDocument(updated);
    updateMockDocument(updated);
  };

  const handleGenerateQA = () => {
    alert(`🤖 Генерирање Q&A за: ${document.title}`);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <TopBar title="Преглед на документ" />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {editingTitle ? (
          <input
            autoFocus
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
            style={{
              fontSize: "1.8rem",
              fontWeight: 600,
              border: "none",
              outline: "none",
              background: "transparent",
              borderBottom: "2px solid #cbd5e1",
            }}
          />
        ) : (
          <>
            <h1
              style={{ margin: 0, cursor: "pointer" }}
              onClick={() => setEditingTitle(true)}
              title="Кликни за уредување"
            >
              {document.title}
            </h1>
            <span style={{ fontSize: "1.2rem", color: "#94a3b8" }}>✏️</span>
          </>
        )}
      </div>

      {/* Categories */}
      <div style={{ marginTop: "1rem" }}>
        <strong>Категории:</strong>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginTop: "0.5rem",
          }}
        >
          {document.categories.map((cat) => (
            <span
              key={cat}
              style={{
                background: "#e2e8f0",
                borderRadius: "9999px",
                padding: "4px 10px",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {cat}
              <button
                onClick={() => handleRemoveCategory(cat)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
                title="Избриши"
              >
                ×
              </button>
            </span>
          ))}

          <input
            type="text"
            placeholder="Додади..."
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            onKeyDown={handleCategoryAdd}
            style={{
              fontSize: "0.85rem",
              padding: "4px 10px",
              borderRadius: "9999px",
              border: "1px solid #cbd5e1",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Q&A Button */}
      <div style={{ margin: "1.5rem 0" }}>
        <button
          onClick={handleGenerateQA}
          style={{
            background: "#2563eb",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🤖 Генерирај Прашања и Одговори
        </button>
      </div>

      <DocumentViewer file={document.file} />
    </div>
  );
};

export default DocumentDetailPage;
