const Joi = require('joi');

const signupSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters',
        'any.required': 'Name is required',
      }),
    email: Joi.string().email().lowercase().trim().required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
      }),
    password: Joi.string().min(6).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .messages({
        'string.min': 'Password must be at least 6 characters',
        'string.max': 'Password cannot exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'any.required': 'Password is required',
      }),
  }),
};

const loginSchema = {
  body: Joi.object({
    email: Joi.string().email().lowercase().trim().required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Password is required',
      }),
  }),
};

const forgotPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().lowercase().trim().required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
      }),
  }),
};

const verifyOtpSchema = {
  body: Joi.object({
    email: Joi.string().email().lowercase().trim().required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
      }),
    otp: Joi.string().length(6).pattern(/^\d+$/).required()
      .messages({
        'string.length': 'OTP must be exactly 6 digits',
        'string.pattern.base': 'OTP must contain only digits',
        'any.required': 'OTP is required',
      }),
  }),
};

const resetPasswordSchema = {
  body: Joi.object({
    email: Joi.string().email().lowercase().trim().required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required',
      }),
    resetToken: Joi.string().required()
      .messages({
        'any.required': 'Reset token is required',
      }),
    newPassword: Joi.string().min(6).max(128).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .messages({
        'string.min': 'Password must be at least 6 characters',
        'string.max': 'Password cannot exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'any.required': 'New password is required',
      }),
  }),
};

const updateProfileSchema = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(100)
      .messages({
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters',
      }),
    email: Joi.string().email().lowercase().trim()
      .messages({
        'string.email': 'Please provide a valid email address',
      }),
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update',
  }),
};

module.exports = {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  verifyOtpSchema,
  resetPasswordSchema,
  updateProfileSchema,
};
