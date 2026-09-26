const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');
const { sendError } = require('../utils/response');

/**
 * Authentication middleware.
 * Extracts Bearer token, verifies JWT, loads user, attaches to req.user.
 */
const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 401, 'Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return sendError(res, 401, 'Access denied. No token provided.');
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return sendError(res, 401, 'Token has expired. Please login again.');
      }
      return sendError(res, 401, 'Invalid token.');
    }

    // Find user and ensure they are active
    const user = await User.findById(decoded.id).select('-password -otp -otpExpiresAt');
    if (!user) {
      return sendError(res, 401, 'User not found. Token is invalid.');
    }

    if (!user.isActive) {
      return sendError(res, 403, 'Account is deactivated. Contact administrator.');
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 500, 'Authentication error.');
  }
};

module.exports = { authenticate };
