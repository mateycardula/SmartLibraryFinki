// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "@components/SideBar.js";

const Layout: React.FC = () => {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <SideBar />
            <main style={{ flex: 1, padding: "1rem" }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
