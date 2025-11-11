import React from "react";

function RegisterForm({
  username,
  email,
  password,
  phone,
  birthday,
  address,
  onUsername,
  onEmailChange,
  onPasswordChange,
  onphoneChange,
  onbirthdayChange,
  onaddressChange,
  onSubmit,
}) {
  return (
    <div className="py-10">
      <div className="max-w-sm mx-auto p-6 py-3 bg-white border border-gray-300 rounded-lg shadow-lg">
        <form
          onSubmit={onSubmit}
          // className="max-w-md mx-auto bg-white p-6 shadow-md rounded"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>

          <div className="mb-4">
            <label className="block mb-1">Họ và tên:</label>
            <input
              type="username"
              value={username}
              onChange={onUsername}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={onEmailChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              autoComplete="off"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={onPasswordChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
              autoComplete="new-password"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Số điện thoại:</label>
            <input
              type="tel"
              value={phone}
              onChange={onphoneChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Ngày sinh:</label>
            <input
              type="date"
              value={birthday}
              onChange={onbirthdayChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1">Quê quán:</label>
            <input
              type="text"
              value={address}
              onChange={onaddressChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Đăng ký
          </button>
          <div class="flex justify-center py-2">
            <h2 class="text-center">
              or
              <a href="./Login" class="text-blue-600 hover:underline">
                {" "}
                Đăng Nhập
              </a>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
