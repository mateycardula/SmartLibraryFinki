import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./home.module.css";
import AuthButtonsComponent from "@features/auth/components/auth-component";
const HeroSection = () => {
    return (_jsxs("section", { className: styles.heroSection, children: [_jsx("h1", { children: "\uD83D\uDCDA Smart Library" }), _jsx("p", { children: "\u041C\u043E\u045C\u0442\u0430 \u043D\u0430 AI \u0432\u043E \u0440\u0430\u0446\u0435\u0442\u0435 \u043D\u0430 \u0441\u0435\u043A\u043E\u0458 \u0435\u0434\u0443\u043A\u0430\u0442\u043E\u0440." }), _jsx("div", { className: styles.authButtons, children: _jsx(AuthButtonsComponent, {}) })] }));
};
export default HeroSection;
