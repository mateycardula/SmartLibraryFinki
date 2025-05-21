import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentViewer from "@features/documents/components/DocumentViewer.tsx";
import { DocumentSummary } from "@features/documents/types.ts";
import TopBar from "@components/TopBar.tsx";
import QuestionGeneratorForm from "@pages/DocumentDetailsPage/QuestionGeneratorForm.js";
import { useNavigate } from "react-router-dom";

const DocumentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user?.id;

    const navigate = useNavigate();
    const [document, setDocument] = useState<DocumentSummary | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [allCategories, setAllCategories] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/categories")
            .then((res) => res.json())
            .then((data) => setAllCategories(data))
            .catch((err) => console.error("Failed to fetch categories", err));
    }, []);


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
        if (!document) return;

        const categoryIds = allCategories
            .filter((cat) => document.categoryNames.includes(cat.name))
            .map((cat) => cat.id);

        const updateDto = {
            fileName: document.fileName,
            description: "description",
            fileType: document.fileType,
            processed: false,
            uploadedDate: document.uploadedDate,
            userId: userId,
            categoryIds: categoryIds,
        };

        const sendUpdate = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/upload-documents/${document.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updateDto),
                });

                if (!res.ok) throw new Error("Failed to update document");

                console.log("✅ Document updated successfully");
            } catch (err) {
                console.error("❌ Error updating document:", err);
            }
        };

        sendUpdate();
    }, [document, allCategories]);


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
            const trimmed = categoryInput.trim();
            if (trimmed && !document.categoryNames.includes(trimmed)) {
                setDocument({
                    ...document,
                    categoryNames: [...document.categoryNames, trimmed],
                });
                setCategoryInput("");
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

    const updateDocument = async () => {
        if (!document) return;

        const categoryIds = allCategories
            .filter((cat) => document.categoryNames.includes(cat.name))
            .map((cat) => cat.id);

        const updateDto = {
            fileName: document.fileName,
            description: "",
            fileType: document.fileType,
            processed: false,
            uploadedDate: document.uploadedDate,
            userId: userId,
            categoryIds: categoryIds,
        };

        try {
            const res = await fetch(`http://localhost:8080/api/upload-documents/${document.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateDto),
            });

            if (!res.ok) throw new Error("Failed to update document");

            console.log("✅ Document updated successfully");
        } catch (err) {
            console.error("❌ Error updating document:", err);
        }
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
                            width: "100%",
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            borderBottom: "2px solid #cbd5e1",
                            padding: "0.2rem 0",
                        }}
                    />

                ) : (
                    <>
                        <h1
                            onClick={() => setEditingTitle(true)}
                            title="Кликни за уредување"
                            style={{
                                margin: 0,
                                cursor: "pointer",
                                borderBottom: "1px dashed #94a3b8",
                                display: "inline-block",
                                transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#2563eb";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "";
                            }}
                        >
                            {document.fileName}
                        </h1>
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
                            {document.categoryNames.length > 1 && (
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
                            )}
            </span>
                    ))}

                    <select
                        value=""
                        onChange={(e) => {
                            const selected = e.target.value;
                            if (
                                selected &&
                                !document.categoryNames.includes(selected)
                            ) {
                                setDocument({
                                    ...document,
                                    categoryNames: [...document.categoryNames, selected],
                                });
                            }
                        }}
                        style={{
                            fontSize: "0.85rem",
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            border: "1px solid #cbd5e1",
                            outline: "none",
                            marginTop: "0.5rem",
                        }}
                    >
                        <option value="" disabled>Додади категорија</option>
                        {allCategories
                            .filter((cat) => !document.categoryNames.includes(cat.name))
                            .map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                    </select>

                </div>
            </div>

            {fileUrl ? (
                <DocumentViewer file={fileUrl} fileType={document.fileType} />
            ) : (
                <p>📂 Не може да се прикаже документот.</p>
            )}

            <QuestionGeneratorForm
                documentId={document.id}
                onSubmit={(data) => {
                    navigate("/preview-generated-questions", { state: data });
                }}
            />
        </div>
    );
};

export default DocumentDetailPage;
