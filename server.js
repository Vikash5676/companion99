const express = require('express');
const cors = require('cors');
const dbConnection = require('./utils/db');
const newsRoute = require('./routes/newsRoute');
const googleRoute = require('./routes/googleLoginRoute');
const cookieParser = require('cookie-parser');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI

// engine for html template
app.set('view engine', 'ejs');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(cookieParser())
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/admin', newsRoute, googleRoute)

// MongoDB Connection
const dbConnect = dbConnection(mongoUri)
if (dbConnect) {
    // Start the server
    app.listen(port, () => {
        console.log(`Server running on port : ${port}`);
    });
}