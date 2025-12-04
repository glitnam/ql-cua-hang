const router = require("express").Router();
const authController = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

// GET all users
router.get("/:id",middlewareController.verifyTokenAndAdminAuth, userController.getAllUser);
//get 1 user
router.get("/:id",middlewareController.verifyToken,userController.getUserByid);
//create user
router.post("/",userController.createUser);
//update user   
router.put("/:id",middlewareController.verifyToken,userController.updateUser);
// DELETE user by ID
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;
