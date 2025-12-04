import api from "../../utils/api"; 

const userService = {
  getUsers: () => api.get("/users"), 

  getUserById:(id) => api.get(`/user/${id}`),

  getDeleteUser:(id) => api.delete(`/user/${id}`),
};

export default userService;
