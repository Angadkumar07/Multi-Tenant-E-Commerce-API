const express = require("express");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { validateProduct } = require("../validations/productValidation");
const { authenticateVendor } = require("../middlewares/authMiddleware");
const router = express.Router();

// Add Product
router.post(
  "/",
  authenticateVendor,
  (req, res, next) => {
    const { error } = validateProduct(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    next();
  },
  addProduct
);

// Get Products
router.get("/", authenticateVendor, getProducts);

// Update Product
router.put(
  "/:id",
  authenticateVendor,
  (req, res, next) => {
    const { error } = validateProduct(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    next();
  },
  updateProduct
);

// Delete Product
router.delete("/:id", authenticateVendor, deleteProduct);

module.exports = router;
