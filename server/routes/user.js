const router = require("express").Router();
const authController = require("../controllers/authControllers");
const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

// GET all users
router.get("/",middlewareController.verifyToken, userController.getAllUser);

// DELETE user by ID
router.delete("/:id",middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;
