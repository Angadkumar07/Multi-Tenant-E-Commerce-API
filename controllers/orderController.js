const Order = require("../models/Order.model");
const Product = require("../models/Product.model");

// Get Orders
exports.getOrders = async (req, res) => {
  try {
    // Fetch products for the authenticated vendor
    const products = await Product.find({ vendor: req.vendor.id }).select(
      "_id"
    );

    // Extract product IDs for querying orders
    const productIds = products.map((product) => product._id);

    // Fetch orders for those products
    const orders = await Order.find({ product: { $in: productIds } }).populate(
      "product"
    );

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//mark as shipped
exports.markAsShipped = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the order and populate the product details
    const order = await Order.findById(id).populate("product");

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    // Check if the product belongs to the authenticated vendor
    if (order.product.vendor.toString() !== req.vendor.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this order." });
    }

    // Update the order status
    order.status = "shipped";
    await order.save();

    res.status(200).json({ message: "Order marked as shipped.", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    // Validate product
    const foundProduct = await Product.findById(product);
    if (!foundProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    // Ensure sufficient stock
    if (foundProduct.stock < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient stock." });
    }

    // Create the order
    const order = new Order({
      product,
      quantity,
      status: "pending",
    });

    // Save the order and update product stock
    await order.save();
    foundProduct.stock -= quantity;
    await foundProduct.save();

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
