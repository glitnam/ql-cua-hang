import api from "../../utils/api"; 

const userService = {
  getUsers: () => api.get("/users"), 
};

export default userService;
