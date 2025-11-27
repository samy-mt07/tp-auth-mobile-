const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getMe } = require('../controllers/userController');

// GET /users/me
router.get('/me', authMiddleware, getMe);

module.exports = router;
