import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage/HomePage";
import SignInPage from "@pages/SignInPage/SignInPage";
import SignUpPage from "@pages/SignUpPage/SignUpPage";
import DashboardPage from "@pages/DashboardPage/DashboardPage";
import DocumentDetailPage from "@pages/DocumentDetailsPage/DocumentDetails";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/documents/:id" element={<DocumentDetailPage />} />
    </Routes>
  );
};

export default AppRouter;
