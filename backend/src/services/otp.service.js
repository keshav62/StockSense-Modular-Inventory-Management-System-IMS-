const User = require('../models/User');
const generateOTP = require('../utils/generateOTP');
const bcrypt = require('bcryptjs');
const { sendMail } = require('../config/mail');
const env = require('../config/env');

/**
 * Generate OTP, hash and store it on user, send via email.
 * @param {string} email - User email
 * @returns {Object} { message }
 */
const generateAndSendOTP = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw { statusCode: 404, message: 'No account found with this email address.' };
  }

  if (!user.isActive) {
    throw { statusCode: 403, message: 'Account is deactivated. Contact administrator.' };
  }

  // Generate 6-digit OTP
  const otp = generateOTP();

  // Hash OTP before storing
  const salt = await bcrypt.genSalt(10);
  const hashedOTP = await bcrypt.hash(otp, salt);

  // Store hashed OTP with expiration
  user.otp = hashedOTP;
  user.otpExpiresAt = new Date(Date.now() + env.OTP_EXPIRES_MINUTES * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  // Send OTP via email
  await sendMail({
    to: email,
    subject: 'StockSense - Password Reset OTP',
    text: `Your OTP for password reset is: ${otp}\n\nThis OTP will expire in ${env.OTP_EXPIRES_MINUTES} minutes.\n\nIf you did not request this, please ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4F46E5;">StockSense Password Reset</h2>
        <p>Your OTP for password reset is:</p>
        <div style="background: #F3F4F6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1F2937;">${otp}</span>
        </div>
        <p>This OTP will expire in <strong>${env.OTP_EXPIRES_MINUTES} minutes</strong>.</p>
        <p style="color: #6B7280; font-size: 14px;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });

  return { message: 'OTP sent to your email address.' };
};

/**
 * Verify OTP for a given email.
 * @param {string} email - User email
 * @param {string} otp - Plaintext OTP from user
 * @returns {boolean} true if valid
 */
const verifyOTP = async (email, otp) => {
  const user = await User.findOne({ email }).select('+otp +otpExpiresAt');
  if (!user) {
    throw { statusCode: 404, message: 'No account found with this email address.' };
  }

  if (!user.otp || !user.otpExpiresAt) {
    throw { statusCode: 400, message: 'No OTP request found. Please request a new OTP.' };
  }

  // Check expiration
  if (new Date() > user.otpExpiresAt) {
    // Clear expired OTP
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });
    throw { statusCode: 400, message: 'OTP has expired. Please request a new one.' };
  }

  // Compare OTP
  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) {
    throw { statusCode: 400, message: 'Invalid OTP. Please try again.' };
  }

  // Clear OTP after successful verification (single-use)
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save({ validateBeforeSave: false });

  return true;
};

module.exports = { generateAndSendOTP, verifyOTP };
