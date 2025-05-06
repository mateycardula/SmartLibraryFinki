import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const DocumentCard = ({ document, onCategoryClick }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/documents/${document.id}`);
    };
    return (_jsx("div", { onClick: handleCardClick, style: {
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
        }, onMouseEnter: (e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"), onMouseLeave: (e) => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"), children: _jsxs("div", { children: [_jsx("h3", { style: { margin: "0 0 0.5rem" }, children: document.title }), _jsx("small", { style: { color: "#64748b" }, children: new Date(document.createdAt).toLocaleDateString() }), _jsx("div", { style: {
                        marginTop: "0.75rem",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.4rem",
                    }, onClick: (e) => e.stopPropagation(), children: document.categories.map((cat) => (_jsx("span", { onClick: () => onCategoryClick?.(cat), style: {
                            backgroundColor: "#e2e8f0",
                            color: "#1e293b",
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            userSelect: "none",
                        }, children: cat }, cat))) })] }) }));
};
export default DocumentCard;
