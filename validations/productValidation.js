const Joi = require("joi");

// Product Validation
exports.validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
  });
  return schema.validate(data);
};
