import axios from "axios";

export const login = async ({ email, password }) => {
  const res = await axios.post(
    "http://localhost:5000/v1/auth/login",
    { email, password },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data;
};

//Dang ki
export const register = async ({email, password, username,phone,birthday,address}) =>{
  const res = await axios.post(
    "http://localhost:5000/v1/auth/register",
    {email,password,username,phone,birthday,address},
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return res.data;
};
//dang xuat 
export const logout = async (refreshToken) => {
  return await axios.post(
    "http://localhost:5000/v1/auth/logout",
    { token: refreshToken },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
};