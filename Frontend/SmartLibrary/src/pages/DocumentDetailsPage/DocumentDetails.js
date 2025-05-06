import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { mockDocuments } from "../../features/documents/mockData";
import DocumentViewer from "@features/documents/components/DocumentViewer";
import TopBar from "@components/TopBar";
const DocumentDetailPage = () => {
    const { id } = useParams();
    const initialDoc = mockDocuments.find((d) => d.id === id);
    const [document, setDocument] = useState(initialDoc);
    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState(initialDoc?.title || "");
    const [categoryInput, setCategoryInput] = useState("");
    if (!document)
        return _jsx("p", { children: "\uD83D\uDCC4 \u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0442 \u043D\u0435 \u0435 \u043F\u0440\u043E\u043D\u0430\u0458\u0434\u0435\u043D." });
    const updateMockDocument = (updatedDoc) => {
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
    const handleCategoryAdd = (e) => {
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
    const handleRemoveCategory = (cat) => {
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
    return (_jsxs("div", { style: { padding: "2rem", maxWidth: "900px", margin: "0 auto" }, children: [_jsx(TopBar, { title: "\u041F\u0440\u0435\u0433\u043B\u0435\u0434 \u043D\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442" }), _jsx("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                }, children: editingTitle ? (_jsx("input", { autoFocus: true, value: titleDraft, onChange: (e) => setTitleDraft(e.target.value), onBlur: handleTitleSubmit, onKeyDown: (e) => e.key === "Enter" && handleTitleSubmit(), style: {
                        fontSize: "1.8rem",
                        fontWeight: 600,
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        borderBottom: "2px solid #cbd5e1",
                    } })) : (_jsxs(_Fragment, { children: [_jsx("h1", { style: { margin: 0, cursor: "pointer" }, onClick: () => setEditingTitle(true), title: "\u041A\u043B\u0438\u043A\u043D\u0438 \u0437\u0430 \u0443\u0440\u0435\u0434\u0443\u0432\u0430\u045A\u0435", children: document.title }), _jsx("span", { style: { fontSize: "1.2rem", color: "#94a3b8" }, children: "\u270F\uFE0F" })] })) }), _jsxs("div", { style: { marginTop: "1rem" }, children: [_jsx("strong", { children: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438:" }), _jsxs("div", { style: {
                            display: "flex",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                            marginTop: "0.5rem",
                        }, children: [document.categories.map((cat) => (_jsxs("span", { style: {
                                    background: "#e2e8f0",
                                    borderRadius: "9999px",
                                    padding: "4px 10px",
                                    fontSize: "0.85rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px",
                                }, children: [cat, _jsx("button", { onClick: () => handleRemoveCategory(cat), style: {
                                            background: "transparent",
                                            border: "none",
                                            fontWeight: "bold",
                                            fontSize: "0.85rem",
                                            cursor: "pointer",
                                        }, title: "\u0418\u0437\u0431\u0440\u0438\u0448\u0438", children: "\u00D7" })] }, cat))), _jsx("input", { type: "text", placeholder: "\u0414\u043E\u0434\u0430\u0434\u0438...", value: categoryInput, onChange: (e) => setCategoryInput(e.target.value), onKeyDown: handleCategoryAdd, style: {
                                    fontSize: "0.85rem",
                                    padding: "4px 10px",
                                    borderRadius: "9999px",
                                    border: "1px solid #cbd5e1",
                                    outline: "none",
                                } })] })] }), _jsx("div", { style: { margin: "1.5rem 0" }, children: _jsx("button", { onClick: handleGenerateQA, style: {
                        background: "#2563eb",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        border: "none",
                        fontWeight: "bold",
                        cursor: "pointer",
                    }, children: "\uD83E\uDD16 \u0413\u0435\u043D\u0435\u0440\u0438\u0440\u0430\u0458 \u041F\u0440\u0430\u0448\u0430\u045A\u0430 \u0438 \u041E\u0434\u0433\u043E\u0432\u043E\u0440\u0438" }) }), _jsx(DocumentViewer, { file: document.file })] }));
};
export default DocumentDetailPage;
