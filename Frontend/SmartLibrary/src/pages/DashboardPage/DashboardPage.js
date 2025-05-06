import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { mockDocuments } from "@features/documents/mockData";
import DocumentList from "@features/documents/components/DocumentList";
const DashboardPage = () => {
    return (_jsxs("div", { style: { padding: "2rem" }, children: [_jsx("h1", { style: { marginBottom: "2rem" }, children: "\uD83D\uDCC1 \u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0438" }), _jsx(DocumentList, { documents: mockDocuments })] }));
};
export default DashboardPage;
