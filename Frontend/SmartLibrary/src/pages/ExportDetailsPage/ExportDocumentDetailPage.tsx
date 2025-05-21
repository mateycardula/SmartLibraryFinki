import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "@components/TopBar.tsx";
import DocumentViewer from "@features/documents/components/DocumentViewer.tsx";
import { useNavigate } from "react-router-dom";

const ExportDocumentDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const [document, setDocument] = useState<any | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState("");

    useEffect(() => {
        const fetchExport = async () => {
            try {
                const res = await fetch(`/api/exports/${id}`);
                if (!res.ok) throw new Error("Failed to fetch export");
                const data = await res.json();
                setDocument(data);
                setTitleDraft(data.fileName);
            } catch (err) {
                console.error("Error loading export:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchExport();
    }, [id]);

    useEffect(() => {
        if (!document) return;
        const fetchFile = async () => {
            try {
                const res = await fetch(`/api/exports/${document.id}/file`);
                if (!res.ok) throw new Error("Failed to fetch PDF");
                const blob = await res.blob();
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

    const handleTitleSubmit = async () => {
        if (!document || !titleDraft.trim()) return;

        try {
            const res = await fetch(`/api/exports/${document.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fileName: titleDraft.trim() }),
            });

            if (!res.ok) throw new Error("Failed to update export");

            setDocument({ ...document, fileName: titleDraft.trim() });
            setEditingTitle(false);
        } catch (err) {
            console.error(" Error updating export title:", err);
        }
    };

    if (loading) return <p>📄 Вчитување документ...</p>;
    if (error || !document) return <p>Не може да се вчита документот.</p>;

    return (
        <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
            <TopBar title="Генериран документ" />

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
                )}
            </div>

            {fileUrl ? (
                <DocumentViewer file={fileUrl} fileType={document.fileType} />
            ) : (
                <p>📂 Не може да се прикаже PDF документот.</p>
            )}
        </div>
    );
};

export default ExportDocumentDetailPage;
