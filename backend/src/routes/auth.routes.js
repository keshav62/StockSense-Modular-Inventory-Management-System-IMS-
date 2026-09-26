const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validate } = require('../middleware/validation.middleware');
const { authLimiter, otpLimiter } = require('../middleware/rateLimit.middleware');
const { authenticate } = require('../middleware/auth.middleware');
const {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
} = require('../validators/auth.validator');

// POST /api/auth/signup
router.post('/signup', authLimiter, validate(signupSchema), authController.signup);

// POST /api/auth/login
router.post('/login', authLimiter, validate(loginSchema), authController.login);

// POST /api/auth/logout
router.post('/logout', authenticate, authController.logout);

// POST /api/auth/forgot-password
router.post('/forgot-password', otpLimiter, validate(forgotPasswordSchema), authController.forgotPassword);

// POST /api/auth/verify-otp
router.post('/verify-otp', otpLimiter, validate(verifyOtpSchema), authController.verifyOtp);

// POST /api/auth/reset-password
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), authController.resetPassword);

module.exports = router;
