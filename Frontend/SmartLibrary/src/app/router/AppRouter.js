import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage/HomePage";
import SignInPage from "@pages/SignInPage/SignInPage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
import DashboardPage from "@pages/DashboardPage/DashboardPage";
import DocumentDetailPage from "@pages/DocumentDetailsPage/DocumentDetails";
const AppRouter = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/sign-in", element: _jsx(SignInPage, {}) }), _jsx(Route, { path: "/sign-up", element: _jsx(SignUpPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/documents/:id", element: _jsx(DocumentDetailPage, {}) })] }));
};
export default AppRouter;
