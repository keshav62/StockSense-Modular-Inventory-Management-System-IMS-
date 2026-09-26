const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const otpService = require('./otp.service');
const env = require('../config/env');

/**
 * Register a new user.
 */
const signup = async ({ name, email, password }) => {
  // Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { statusCode: 409, message: 'An account with this email already exists.' };
  }

  // Create user (password hashed via pre-save hook)
  const user = await User.create({ name, email, password });

  // Generate token
  const token = generateToken({ id: user._id, email: user.email, role: user.role });

  return {
    user: user.toSafeObject(),
    token,
  };
};

/**
 * Authenticate user and return token.
 */
const login = async ({ email, password }) => {
  // Find user with password field
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw { statusCode: 401, message: 'Invalid email or password.' };
  }

  if (!user.isActive) {
    throw { statusCode: 403, message: 'Account is deactivated. Contact administrator.' };
  }

  // Compare passwords
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw { statusCode: 401, message: 'Invalid email or password.' };
  }

  // Generate token
  const token = generateToken({ id: user._id, email: user.email, role: user.role });

  return {
    user: user.toSafeObject(),
    token,
  };
};

/**
 * Handle forgot password — generate and send OTP.
 */
const forgotPassword = async ({ email }) => {
  return otpService.generateAndSendOTP(email);
};

/**
 * Verify OTP and return a short-lived reset token.
 */
const verifyOTP = async ({ email, otp }) => {
  await otpService.verifyOTP(email, otp);

  // Generate a short-lived reset token
  const resetToken = generateToken(
    { email, purpose: 'password-reset' },
    env.JWT_RESET_EXPIRES_IN
  );

  return { resetToken };
};

/**
 * Reset password using reset token.
 */
const resetPassword = async ({ email, resetToken, newPassword }) => {
  // Verify reset token
  const jwt = require('jsonwebtoken');
  let decoded;
  try {
    decoded = jwt.verify(resetToken, env.JWT_SECRET);
  } catch (err) {
    throw { statusCode: 400, message: 'Invalid or expired reset token. Please request a new OTP.' };
  }

  if (decoded.purpose !== 'password-reset' || decoded.email !== email) {
    throw { statusCode: 400, message: 'Invalid reset token.' };
  }

  // Find user and update password
  const user = await User.findOne({ email });
  if (!user) {
    throw { statusCode: 404, message: 'User not found.' };
  }

  user.password = newPassword; // Will be hashed via pre-save hook
  await user.save();

  return { message: 'Password has been reset successfully. You can now login with your new password.' };
};

module.exports = {
  signup,
  login,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
