import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/router/AppRouter";
const root = createRoot(document.getElementById("root"));
root.render(_jsx(StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(AppRouter, {}) }) }));
