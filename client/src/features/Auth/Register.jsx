import React, { useState } from "react";
import RegisterForm from "./RegisterForm"; // Cập nhật đường dẫn nếu khác
import { register } from "../Auth/authService";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setphone] = useState("");
  const [birthday, setbirthday] = useState("");
  const [address, setaddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await register({
        username,
        email,
        password,
        phone,
        birthday,
        address,
      });
      console.log("Đăng ký thành công:", data);
      alert("Đăng ký thành công!");
      setUsername("");
      setEmail("");
      setPassword("");
      window.location.href = "login";
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
      alert("Đăng ký thất bại, vui lòng thử lại!");
    }
  };

  return (
    <RegisterForm
      username={username}
      email={email}
      password={password}
      phone={phone}
      birthday={birthday}
      address={address}
      onUsername={(e) => setUsername(e.target.value)}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onphoneChange={(e) => setphone(e.target.value)}
      onbirthdayChange={(e) => setbirthday(e.target.value)}
      onaddressChange={(e) => setaddress(e.target.value)}
      onSubmit={handleSubmit}
    />
  );
}

export default Register;
