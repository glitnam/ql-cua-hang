import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  // Giả sử bạn lấy user info từ localStorage hoặc context
  const user = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar menu */}
      <nav
        style={{
          width: 200,
          background: "#eee",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // đẩy footer xuống dưới
        }}
      >
        <div>
          <h2 className="textsize:50px">ADMIN HOME</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <NavLink
                to="/admin/users"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                Quản lý Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/employees"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                Quản lý Nhân viên
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                Quản lý Sản phẩm
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                })}
              >
                trang chu
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Phần session user ở dưới */}
        {user && (
          <div
            style={{
              marginTop: 20,
              borderTop: "1px solid #ccc",
              paddingTop: 10,
            }}
          >
            <p>
              <strong>Đăng nhập bởi:</strong>
            </p>
            <p>{user.name || user.email}</p>
          </div>
        )}
      </nav>

      {/* Nội dung chính */}
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet /> {/* Route con sẽ render ở đây */}
      </main>
    </div>
  );
}
