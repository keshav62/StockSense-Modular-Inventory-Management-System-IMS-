const { sendError } = require('../utils/response');

/**
 * Create a validation middleware from a Joi schema.
 * @param {Object} schema - Joi schema object with optional body, query, params keys
 * @returns {Function} Express middleware
 */
const validate = (schema) => {
  return (req, res, next) => {
    const errors = [];

    // Validate body
    if (schema.body) {
      const { error } = schema.body.validate(req.body, { abortEarly: false, stripUnknown: true });
      if (error) {
        errors.push(...error.details.map((d) => d.message));
      } else {
        // Replace body with validated/stripped data
        req.body = schema.body.validate(req.body, { stripUnknown: true }).value;
      }
    }

    // Validate query
    if (schema.query) {
      const { error } = schema.query.validate(req.query, { abortEarly: false, stripUnknown: true });
      if (error) {
        errors.push(...error.details.map((d) => d.message));
      } else {
        req.query = schema.query.validate(req.query, { stripUnknown: true }).value;
      }
    }

    // Validate params
    if (schema.params) {
      const { error } = schema.params.validate(req.params, { abortEarly: false, stripUnknown: true });
      if (error) {
        errors.push(...error.details.map((d) => d.message));
      }
    }

    if (errors.length > 0) {
      return sendError(res, 400, 'Validation failed', errors);
    }

    next();
  };
};

module.exports = { validate };
