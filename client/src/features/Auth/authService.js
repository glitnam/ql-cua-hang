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
//get list user
export const getListUser = (token) => {
  return axios.get("http://localhost:5000/v1/user", {
    headers: { token: `Bearer ${token}` },
  });
};
// get 1 user
export const getUser = (userId,token) => {
  return axios.get(`http://localhost:5000/v1/user/${userId}`,{
    headers:{token: `Bearer ${token}`}
  });
};
//update
export const updateUser = (token,userId,data) =>{
  return axios.put(`http://localhost:5000/v1/user/${userId}`,data,{
    headers:{token: `Bearer ${token}`}
  });
};
export const deleteUser = (userId,token)=>{
  return axios.delete(`http://localhost:5000/v1/user/${userId}`,{
    headers: {token: `Bearer ${token}`}
  });
};
