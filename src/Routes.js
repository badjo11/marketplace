import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AdminContextProvider from "./contexts/AdminContext";
import AuthContextProvider from "./contexts/AuthContext";
import ClientContextProvider from "./contexts/ClientContext";
import AddPage from "./pages/AddPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import MainPage from "./pages/MainPage";

const MyRoutes = () => {
  return (
    <AuthContextProvider>
      <AdminContextProvider>
        <ClientContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/add" element={<AddPage />} />
              <Route path="/" element={<MainPage />} />
              <Route path="/phones/:id" element={<DetailPage />} />
              <Route path="/admin/edit/:id" element={<EditPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Navigate to="/" />
            </Routes>
          </BrowserRouter>
        </ClientContextProvider>
      </AdminContextProvider>
    </AuthContextProvider>
  );
};

export default MyRoutes;
