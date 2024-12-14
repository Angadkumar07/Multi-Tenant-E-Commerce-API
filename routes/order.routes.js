const express = require("express");
const {
  getOrders,
  markAsShipped,
  createOrder,
} = require("../controllers/orderController");
const { authenticateVendor } = require("../middlewares/authMiddleware");
const router = express.Router();

// Get Orders
router.get("/", authenticateVendor, getOrders);

// Mark Order as Shipped
router.put("/:id", authenticateVendor, markAsShipped);

// Create Order
router.post("/", authenticateVendor, createOrder);

module.exports = router;
