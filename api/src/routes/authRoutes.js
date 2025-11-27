const express = require('express');
const router = express.Router();
const { register , login , logout} = require('../controllers/authController');

// POST /auth/register
router.post('/register', register);

// POST /auth/login
router.post('/login', login);

// POST /auth/logout
router.post('/logout', logout);

module.exports = router;
