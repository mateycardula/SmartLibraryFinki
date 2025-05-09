import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
const TopBar = ({ title, rightAction, showBackButton = true, }) => {
    const navigate = useNavigate();
    return (_jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: "1rem",
            borderBottom: "1px solid #e2e8f0",
            marginBottom: "1rem",
        }, children: [_jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem" }, children: [showBackButton && (_jsx("button", { onClick: () => navigate(-1), style: {
                            background: "transparent",
                            border: "none",
                            color: "#2563eb",
                            fontSize: "1rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }, children: "\u2190 \u041D\u0430\u0437\u0430\u0434" })), title && _jsx("h2", { style: { margin: 0 }, children: title })] }), _jsx("div", { children: rightAction })] }));
};
export default TopBar;
