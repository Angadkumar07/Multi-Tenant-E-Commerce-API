const Joi = require("joi");

// Vendor Registration Validation
exports.validateVendorRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
  });
  return schema.validate(data);
};

// Vendor Login Validation
exports.validateVendorLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(128).required(),
  });
  return schema.validate(data);
};
