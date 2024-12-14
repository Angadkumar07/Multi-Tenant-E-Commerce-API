const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor.model");

// Authenticate Vendor
exports.authenticateVendor = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided." });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found." });

    req.vendor = vendor;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Unauthorized access.", error: err.message });
  }
};
