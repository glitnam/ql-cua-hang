import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { login } from "./authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login({ email, password }); // gọi API
      const role = user.admin ? "admin" : "user";
      console.log("Đăng nhập thành công:", user);

      //  Lưu token & user vào localStorage
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("refreshToken", user.refreshToken);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      //  Phát sự kiện để Navbar cập nhật lại
      window.dispatchEvent(new Event("userChanged"));

      //  Chuyển hướng trang sau login
      if (user.role === "admin" || user.role === "staff") {
        navigate("/admin/users", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.response?.data || err.message);
      alert("Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <LoginForm
        email={email}
        password={password}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Login;
