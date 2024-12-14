const Product = require("../models/Product.model");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await Product.create({
      name,
      price,
      stock,
      vendor: req.vendor.id,
    });
    res.status(201).json({ message: "Product added successfully.", product });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Products (with Pagination)
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const products = await Product.find({ vendor: req.vendor.id })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const product = await Product.findOneAndUpdate(
      { _id: id, vendor: req.vendor.id },
      updates,
      { new: true }
    );
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Product updated successfully.", product });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({
      _id: id,
      vendor: req.vendor.id,
    });
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
