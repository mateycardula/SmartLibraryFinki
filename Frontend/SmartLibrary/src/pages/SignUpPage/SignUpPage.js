import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./signUp.module.css";
import AuthButtonsComponent from "@features/auth/components/auth-component";
const SignUpPage = () => {
    return (_jsxs("div", { className: styles.authContainer, children: [_jsx(AuthButtonsComponent, { activeTab: "sign-up" }), _jsxs("form", { children: [_jsx("label", { children: "\u0418\u043C\u0435 \u0438 \u043F\u0440\u0435\u0437\u0438\u043C\u0435" }), _jsx("input", { type: "text", placeholder: "\u0408\u043E\u0432\u0430\u043D \u0408\u043E\u0432\u0430\u043D\u043E\u0432" }), _jsx("label", { children: "\u0415\u043C\u0430\u0438\u043B \u0430\u0434\u0440\u0435\u0441\u0430" }), _jsx("input", { type: "email", placeholder: "example@edu.com" }), _jsx("label", { children: "\u041B\u043E\u0437\u0438\u043D\u043A\u0430" }), _jsx("input", { type: "password", placeholder: "\u041A\u0440\u0435\u0438\u0440\u0430\u0458 \u043B\u043E\u0437\u0438\u043D\u043A\u0430" }), _jsx("button", { type: "submit", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0430\u0458 \u0441\u0435" })] })] }));
};
export default SignUpPage;
