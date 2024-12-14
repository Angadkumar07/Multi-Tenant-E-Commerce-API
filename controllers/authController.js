const Vendor = require("../models/Vendor.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (vendorId) => {
  return jwt.sign({ id: vendorId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Register Vendor
exports.registerVendor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor)
      return res.status(400).json({ message: "Email already exists." });

    const vendor = await Vendor.create({ name, email, password });
    res
      .status(201)
      .json({ message: "Vendor registered successfully.", vendor });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login Vendor
exports.loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) return res.status(404).json({ message: "Vendor not found." });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = generateToken(vendor._id);
    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
