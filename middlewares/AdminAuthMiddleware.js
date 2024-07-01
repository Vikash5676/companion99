const User = require("../models/UserModel");

const authMiddleware = async (req, res, next) => {
    const header = req.headers.authorization;
    const token = header.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized', status_code: 401 });
    }

    const user = await User.findOne({ token: token });
    // console.log(user, token)
    if (user && user.role == 2) {
        req.user = user
        next()
    } else {
        res.status(401).json({ message: 'Unauthorized', status_code: 401 });
    }
};

module.exports = authMiddleware;