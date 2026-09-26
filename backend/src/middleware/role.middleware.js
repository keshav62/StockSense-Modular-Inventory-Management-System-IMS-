const { sendError } = require('../utils/response');

/**
 * Role-based authorization middleware.
 * Must be used AFTER authenticate middleware.
 * @param  {...string} roles - Allowed roles
 * @returns {Function} Express middleware
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 401, 'Authentication required.');
    }

    if (!roles.includes(req.user.role)) {
      return sendError(res, 403, 'You do not have permission to perform this action.');
    }

    next();
  };
};

module.exports = { authorize };
