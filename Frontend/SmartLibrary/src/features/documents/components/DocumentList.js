import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import DocumentCard from "./DocumentCard";
const DocumentList = ({ documents }) => {
    const [activeCategories, setActiveCategories] = useState([]);
    const handleCategoryClick = (category) => {
        if (!activeCategories.includes(category)) {
            setActiveCategories((prev) => [...prev, category]);
        }
    };
    const handleRemoveCategory = (category) => {
        setActiveCategories((prev) => prev.filter((c) => c !== category));
    };
    const filteredDocs = activeCategories.length === 0
        ? documents
        : documents.filter((doc) => doc.categories.some((cat) => activeCategories.includes(cat)));
    const grouped = {};
    filteredDocs.forEach((doc) => {
        doc.categories.forEach((category) => {
            if (!grouped[category])
                grouped[category] = [];
            grouped[category].push(doc);
        });
    });
    return (_jsxs("div", { children: [activeCategories.length > 0 && (_jsxs("div", { style: {
                    marginBottom: "1.5rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                }, children: [activeCategories.map((cat) => (_jsxs("span", { style: {
                            backgroundColor: "#cbd5e1",
                            borderRadius: "9999px",
                            padding: "4px 10px",
                            fontSize: "0.85rem",
                        }, children: [cat, " ", _jsx("button", { onClick: () => handleRemoveCategory(cat), style: {
                                    marginLeft: 6,
                                    background: "transparent",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }, children: "\u00D7" })] }, cat))), _jsx("button", { onClick: () => setActiveCategories([]), style: {
                            background: "#f87171",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            padding: "4px 10px",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            marginLeft: "1rem",
                        }, children: "Reset filters" })] })), Object.entries(grouped).map(([category, docs]) => (_jsxs("div", { style: { marginBottom: "2rem" }, children: [_jsx("h2", { style: { marginBottom: "1rem" }, children: category }), _jsx("div", { style: { display: "flex", gap: "1rem", flexWrap: "wrap" }, children: docs.map((doc) => (_jsx(DocumentCard, { document: doc, onCategoryClick: handleCategoryClick }, `${category}-${doc.id}`))) })] }, category))), filteredDocs.length === 0 && (_jsx("p", { style: { fontStyle: "italic", color: "#6b7280" }, children: "\u041D\u0435\u043C\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0438 \u0437\u0430 \u0438\u0437\u0431\u0440\u0430\u043D\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438." }))] }));
};
export default DocumentList;
