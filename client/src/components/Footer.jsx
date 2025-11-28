import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Nshop</h2>
          <p className="text-gray-400 text-sm">
            Mang đến trải nghiệm mua sắm hiện đại và tiện lợi cho bạn.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên kết</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white">
                Sản phẩm
              </Link>
            </li>
            <li>
              <Link to="/brands" className="hover:text-white">
                Thương hiệu
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Kết nối</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6 hover:text-blue-500" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 hover:text-pink-400" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6 hover:text-blue-300" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Nshop. All rights reserved.
      </div>
    </footer>
  );
}
