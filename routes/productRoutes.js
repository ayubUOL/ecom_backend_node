const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken, requireAdmin } = require("../middleware/auth");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", verifyToken, requireAdmin, productController.createProductHandler);
router.put("/:id", verifyToken, requireAdmin, productController.updateProductById);
router.delete("/:id", verifyToken, requireAdmin, productController.deleteProductById);

module.exports = router;