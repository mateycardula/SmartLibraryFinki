import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentViewer from "@features/documents/components/DocumentViewer.tsx";
import { DocumentSummary } from "@features/documents/types.ts";
import TopBar from "@components/TopBar.tsx";

const DocumentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user?.id;

    const [document, setDocument] = useState<DocumentSummary | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState("");
    const [categoryInput, setCategoryInput] = useState("");

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/upload-documents/user/${userId}/summary`);
                const summaries: DocumentSummary[] = await res.json();
                const match = summaries.find((d) => String(d.id) === id);
                if (!match) throw new Error("Document not found");
                setDocument(match);
                setTitleDraft(match.fileName);
            } catch (err) {
                console.error("Error loading document summary:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (userId && id) fetchSummary();
    }, [userId, id]);

    useEffect(() => {
        const fetchFile = async () => {
            if (!document) return;
            try {
                const response = await fetch(`http://localhost:8080/api/upload-documents/${document.id}/file`);
                if (!response.ok) throw new Error("Failed to fetch file");
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setFileUrl(url);
            } catch (err) {
                console.error("Error loading file:", err);
            }
        };

        fetchFile();
        return () => {
            if (fileUrl) URL.revokeObjectURL(fileUrl);
        };
    }, [document]);

    if (loading) return <p>📄 Вчитување документ...</p>;
    if (error || !document) return <p>❌ Документот не може да се вчита.</p>;

    const handleTitleSubmit = () => {
        if (titleDraft.trim()) {
            setDocument({ ...document, fileName: titleDraft.trim() });
        }
        setEditingTitle(false);
    };

    const handleCategoryAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const trimmed = categoryInput.trim();
            if (trimmed && !document.categoryNames.includes(trimmed)) {
                setDocument({
                    ...document,
                    categoryNames: [...document.categoryNames, trimmed],
                });
                setCategoryInput("");
            }
        }
    };

    const handleRemoveCategory = (cat: string) => {
        setDocument({
            ...document,
            categoryNames: document.categoryNames.filter((c) => c !== cat),
        });
    };

    const handleGenerateQA = () => {
        alert(`🤖 Генерирање Q&A за: ${document.fileName}`);
    };

    return (
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
            <TopBar title="Преглед на документ" />

            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
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
                            {document.fileName}
                        </h1>
                        <span style={{ fontSize: "1.2rem", color: "#94a3b8" }}>✏️</span>
                    </>
                )}
            </div>

            {/* Categories */}
            <div style={{ marginTop: "1rem" }}>
                <strong>Категории:</strong>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                    {document.categoryNames.map((cat) => (
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

            {fileUrl ? (
                <DocumentViewer file={fileUrl} fileType={document.fileType} />
            ) : (
                <p>📂 Не може да се прикаже документот.</p>
            )}
        </div>
    );
};

export default DocumentDetailPage;
