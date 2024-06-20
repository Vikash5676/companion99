const express = require('express');
const User = require('../models/UserModel');
const { addNews, getNews, getImageUrlNew } = require('../controllers/NewsController');
const authMiddleware = require('../middlewares/AuthMiddleware');


const newsRoute = express.Router();

newsRoute.post('/add-news', authMiddleware, addNews)
newsRoute.get('/get-news', authMiddleware, getNews)
newsRoute.post('/update-img-url', authMiddleware, getImageUrlNew)

module.exports = newsRoute