const express = require('express');
const User = require('../models/UserModel');
const { addNews, getNews, getImageUrlNew, getParticularNews, editNews, deleteNews } = require('../controllers/NewsController');
const authMiddleware = require('../middlewares/AdminAuthMiddleware');


const newsRoute = express.Router();

newsRoute.post('/add-news', authMiddleware, addNews)
newsRoute.get('/get-news', authMiddleware, getNews)
newsRoute.post('/update-img-url', authMiddleware, getImageUrlNew)
newsRoute.get('/get-particular-news/:id', authMiddleware, getParticularNews)
newsRoute.post('/edit-news', authMiddleware, editNews)
newsRoute.get('/delete-news/:id', authMiddleware, deleteNews)

module.exports = newsRoute