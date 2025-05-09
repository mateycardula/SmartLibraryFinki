import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./home.module.css";
import HeroSection from "./HeroSection";
import FeaturesList from "./FeaturesList";
const HomePage = () => {
    return (_jsxs("div", { className: styles.homeContainer, children: [_jsx(HeroSection, {}), _jsx(FeaturesList, {})] }));
};
export default HomePage;
