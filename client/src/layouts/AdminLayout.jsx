import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();

  // Lắng nghe event userChanged
  useEffect(() => {
    const handleUserChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };
    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      <nav className="w-52 bg-gray-200 p-5 flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">ADMIN HOME</h2>
          <ul className="space-y-2">
            {[
              { to: "/admin/users", label: "Quản lý Users" },
              { to: "/admin/employees", label: "Quản lý Nhân viên" },
              { to: "/admin/products", label: "Quản lý Sản phẩm" },
              { to: "/", label: "Trang chủ" },
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-2 py-1 rounded transition-colors ${
                      isActive
                        ? "font-bold text-blue-600"
                        : "text-gray-700 hover:text-blue-500"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {user && (
          <div className="mt-5 border-t border-gray-300 pt-3">
            <p className="font-semibold text-gray-700">Đăng nhập bởi:</p>
            <p className="text-gray-600">{user.name || user.email}</p>
            <div>
              <button
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
}
