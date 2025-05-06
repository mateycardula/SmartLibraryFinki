import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import styles from "@styles/auth.module.css";
const AuthButtonsComponent = ({ activeTab }) => {
    return (_jsxs("div", { className: styles["toggle-buttons"], children: [_jsx(Link, { to: "/sign-in", children: _jsx("button", { className: activeTab === "sign-in" ? styles.active : "", children: "\uD83D\uDD10 \u041D\u0430\u0458\u0430\u0432\u0430" }) }), _jsx(Link, { to: "/sign-up", children: _jsx("button", { className: activeTab === "sign-up" ? styles.active : "", children: "\uD83D\uDCDD \u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0458\u0430" }) })] }));
};
export default AuthButtonsComponent;
