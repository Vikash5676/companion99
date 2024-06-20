const express = require('express');
const { login } = require('../controllers/LoginController');

const googleRoute = express.Router();

googleRoute.post('/login', login)

module.exports = googleRoute