// src/routes/adminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import UserListPage from "../pages/admin/UserListPage";
import UserCreatePage from "../pages/admin/UserCreatePage";
import UserEditPage from "../pages/admin/UserEditPage";

const adminRoutes = (
  <>
    <Route path="users" element={<UserListPage />} />
    <Route path="users/create" element={<UserCreatePage />} />
    <Route path="users/edit/:id" element={<UserEditPage />} />
  </>
);

export default adminRoutes;
