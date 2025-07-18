import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import RootLayout from "./layouts/RootLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ManagerPage from "./pages/ManagerPage.jsx"; // 오타: ManaerPage → ManagerPage
import AdminHome from "./pages/AdminHome.jsx";
import ProductEditAdmin from "./pages/ProductEditAdmin.jsx";
import ProductCreateAdmin from "./pages/ProductCreateAdmin.jsx"; // 오타: Creat → Create

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<App />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="admin" element={<ManagerPage />} />
          {/* 아래 두 라우트가 위 카드 클릭 시 이동하는 경로입니다 */}
          <Route
            path="/admin/product/create"
            element={<ProductCreateAdmin />}
          />
          <Route path="/admin/product/edit" element={<ProductEditAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
