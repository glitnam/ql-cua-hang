const User = require("../models/User");

const userController = {
  // GET all users
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json("User not found");
      }
      res.status(200).json("User deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
