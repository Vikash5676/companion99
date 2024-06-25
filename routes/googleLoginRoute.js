const express = require('express');
const { login, verifyEmail } = require('../controllers/LoginController');

const googleRoute = express.Router();

googleRoute.post('/login', login)
googleRoute.get('/verify-email/:id', verifyEmail)

module.exports = googleRoute