const express = require('express');
const User = require('../models/UserModel');
const { addNews, getNews, getImageUrlNew, getParticularNews, editNews, deleteNews } = require('../controllers/NewsController');
const authMiddleware = require('../middlewares/AdminAuthMiddleware');
const { UserGoogleLogin } = require('../controllers/UserController');

const userRoute = express.Router();

userRoute.post('/user-google-login', UserGoogleLogin)

module.exports = userRoute;