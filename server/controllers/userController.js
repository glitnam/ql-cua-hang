const User = require("../models/User");

const userController = {
  // GET all users
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      const formattedUsers = users.map(user => ({
        ...user._doc,
        birthday: user.birthday ? user.birthday.toISOString().split("T")[0] : null
      }));

      res.status(200).json(formattedUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get 1 user
  getUserByid: async (req,res)=>{
    try{
      const user = await user.findById(req.params.id);
      if(!user) return res.status(404).json("User not foud");

      const formattedUsers ={
        ...user._doc,
        birthday: user.birthday
        ?user.birthday.toISOString().split("T")[0]
        :null
      };
      res.status(200).json(formattedUsers);
    }catch(err){
      res.status(500).json(err);
    }
  },
// create user
  createUser: async (req,res) =>{
    try{
      const newUser = new User(req.body);
      const sevedUser = await newUser.save();
      res.status(201).json(sevedUser);

    }catch(err){
      res.status(500).json(err);
    }
  },
//update
updateUser: async (req,res) =>{
  try{
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );
     if(!updateUser){
      return res.status(404).json("User not found");
     }
     res.status(200).json(updateUser);
  }
  catch(err){
    res.status(500).json(err);
  }
},

//delete
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
