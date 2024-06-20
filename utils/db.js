const mongoose = require('mongoose');

const dbConnection = async (uri) => {
    try {
        const connection = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'companion'
        })
        return true
    } catch (e) {
        console.log("something went wrong", e)
        return false
    }
}

module.exports = dbConnection