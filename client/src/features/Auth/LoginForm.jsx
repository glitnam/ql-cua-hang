import React from "react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";

function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) {
  return (
    <div className="max-w-sm mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-semibold text-center mb-4">Đăng Nhập</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={onEmailChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mật khẩu:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={onPasswordChange}
            required
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <p className="text-center text-sm text-gray-600 mt-4 p-3">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Quên mật khẩu?
            </a>
          </p>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Đăng Nhập
        </button>
        <h2 className="text-center py-4 text-gray-500 text-sm">---or---</h2>
        <div className="flex space-x-4 justify-center p-3">
          <a
            href="https://facebook.com/nhunam23"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-6 h-6 hover:text-blue-500" />
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGoogle className="w-6 h-6 hover:text-red-500" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-6 h-6 hover:text-blue-300" />
          </a>
        </div>
        <div className="flex justify-center">
          <h2 className="text-center">
            Not register?{" "}
            <a href="./Register" className="text-blue-600 hover:underline">
              Create an account
            </a>
          </h2>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
