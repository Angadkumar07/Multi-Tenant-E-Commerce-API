const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Create an index for optimized search
productSchema.index({ name: 1, vendor: 1 });

module.exports = mongoose.model("Product", productSchema);
