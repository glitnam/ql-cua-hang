import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoBagHandleSharp } from "react-icons/io5";
import Swal from "sweetalert2";

export default function Navbar({ cartCount = 0 }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔹 Lấy user từ localStorage khi load + khi có event userChanged
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    setUser(savedUser ? JSON.parse(savedUser) : null);

    const handleUserChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  // 🔹 Xử lý logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("userChanged")); // cho chắc
    navigate("/");
  };

  return (
    <header className="bg-customBeige shadow-md">
      <div className="mx-auto max-w-screen-xl flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Nshop</Link>
        </div>

        {/* Mobile search toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            <CiSearch className="w-6 h-6" />
          </button>
        </div>

        {/* Tìm kiếm */}
        <form className="hidden md:flex items-center border border-black rounded-lg mr-40 flex-1 mx-4 h-10 bg-customBeige">
          <CiSearch className="ml-3 w-5 h-5 text-black" />
          <input
            type="search"
            className="w-full px-2 py-1 outline-none bg-customBeige text-black placeholder-gray-400"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Menu sản phẩm */}
        <div className="relative group mr-4 z-50">
          <button className="flex items-center text-black hover:text-gray-900">
            Sản phẩm
          </button>
          <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
            <Link
              to=""
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Giày
            </Link>
            <Link
              to=""
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Áo
            </Link>
            <Link
              to=""
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Quần
            </Link>
            <Link
              to=""
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Phụ kiện
            </Link>
          </div>
        </div>

        <div className="relative mr-4">
          <button>Liên hệ</button>
        </div>

        {/* Links + Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Giỏ hàng */}
          {user ? (
            <Link
              to="/cart"
              className="relative flex flex-col items-center text-gray-700 hover:text-gray-900"
            >
              <IoBagHandleSharp className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setTimeout(() => {
                  Swal.fire({
                    icon: "warning",
                    title: "Chưa đăng nhập",
                    text: "Bạn cần đăng nhập để xem giỏ hàng!",
                    confirmButtonText: "OK",
                  });
                }, 300);
              }}
              className="relative flex flex-col items-center text-gray-700 hover:text-gray-900"
            >
              <IoBagHandleSharp className="w-6 h-6" />
            </button>
          )}

          {/* Đăng nhập / Tài khoản */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <CiUser className="w-6 h-6" />
              </button>
              {/* Dropdown khi login */}
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Thông tin cá nhân
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center text-black hover:text-gray-900"
            >
              <CiUser className="w-6 h-6" />
              <span className="ml-1 text-sm">Đăng nhập</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t">
          <form className="flex items-center p-4 border-b">
            <CiSearch className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="search"
              className="w-full outline-none"
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <nav className="flex flex-col p-4 space-y-2">
            <Link to="/cart" className="text-gray-700 hover:text-gray-900">
              Giỏ hàng
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Tài khoản
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-gray-700 hover:text-gray-900"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Đăng nhập
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
