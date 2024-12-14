const express = require("express");
const {
  registerVendor,
  loginVendor,
} = require("../controllers/authController")
const {
  validateVendorRegistration,
  validateVendorLogin,
} = require("../validations/vendorValidation");
const router = express.Router();

// Vendor Registration
router.post(
  "/register",
  (req, res, next) => {
    const { error } = validateVendorRegistration(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    next();
  },
  registerVendor
);

// Vendor Login
router.post(
  "/login",
  (req, res, next) => {
    const { error } = validateVendorLogin(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    next();
  },
  loginVendor
);

module.exports = router;
