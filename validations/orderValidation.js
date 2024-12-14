const Joi = require('joi');

// Order Validation
exports.validateOrder = (data) => {
  const schema = Joi.object({
    product: Joi.string().length(24).required(),
    quantity: Joi.number().integer().min(1).required(),
  });
  return schema.validate(data);
};
