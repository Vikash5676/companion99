const express = require('express');
const User = require('../models/UserModel');


const adminRoute = express.Router();



adminRoute.post('/add_news', async (req, res) => {
    try {
        const { image, title, content, email } = req.body();


    } catch (error) {

    }
})

adminRoute.post('/get_news', async (req, res) => {
    try {
        const { image, title, content, email } = req.body();


    } catch (error) {

    }
})