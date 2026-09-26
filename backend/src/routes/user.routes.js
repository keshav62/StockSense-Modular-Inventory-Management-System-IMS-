const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');
const { updateProfileSchema } = require('../validators/auth.validator');

// All user routes require authentication
router.use(authenticate);

// GET /api/users/me
router.get('/me', userController.getProfile);

// PUT /api/users/me
router.put('/me', validate(updateProfileSchema), userController.updateProfile);

module.exports = router;
