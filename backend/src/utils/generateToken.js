const jwt = require('jsonwebtoken');
const env = require('../config/env');

/**
 * Generate a JWT token.
 * @param {Object} payload - Token payload (e.g., { id, email })
 * @param {string} expiresIn - Token expiry (default from env)
 * @returns {string} Signed JWT token
 */
const generateToken = (payload, expiresIn = env.JWT_EXPIRES_IN) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

module.exports = generateToken;
