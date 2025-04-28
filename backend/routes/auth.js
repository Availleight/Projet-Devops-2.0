const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const db = require('../db');


const authController = require('../auth/auth'); // <-- path to your controller

// Routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);





module.exports = router;