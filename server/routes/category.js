const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const { verifyTokenAndAdminAuth } = require("../controllers/middlewareController"); 

// Admin CRUD
router.post("/", verifyTokenAndAdminAuth, categoryController.createCategory);
router.put("/:id", verifyTokenAndAdminAuth, categoryController.updateCategory);
router.delete("/:id", verifyTokenAndAdminAuth, categoryController.deleteCategory);

// Public đọc category
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);

module.exports = router;
