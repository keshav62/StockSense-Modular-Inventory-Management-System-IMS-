const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * GET /api/users/me
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return sendError(res, 404, 'User not found.');
    }
    sendSuccess(res, 200, 'Profile fetched successfully.', user.toSafeObject());
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/users/me
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return sendError(res, 404, 'User not found.');
    }

    // Check if email is being changed and is already taken
    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing) {
        return sendError(res, 409, 'An account with this email already exists.');
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    await user.save({ validateBeforeSave: true });

    sendSuccess(res, 200, 'Profile updated successfully.', user.toSafeObject());
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
