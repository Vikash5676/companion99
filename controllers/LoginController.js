const { HttpStatusCode } = require("axios");
const User = require("../models/UserModel");

const login = async (req, res) => {
    try {
        const data = await req.body;
        const { email, name, token, image, expiration_time } = await req.body;
        if (data) {
            const user = await User.findOne({ email: email });
            // console.log(user)
            if (user !== null) {
                const savedUser = await User.updateOne({ email: email }, { $set: { token: token, image: image, logged_in: 1 } });
                const userModified = await User.findOne({ email: email });
                // console.log(savedUser)
                return res.status(200).json({ message: 'successfully', data: userModified, status_code: 200 })
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    token: token,
                    role: 2,
                    image: image,
                    logged_in: 1
                })
                const savedUser = await newUser.save();
                // console.log(savedUser)
                return res.status(200).json({ message: 'successfully', data: savedUser, status_code: 200 })
            }
        } else {
            return res.status(500).json({ errorMessage: 'No Data' })
        }
    } catch (error) {
        return Response.json({ errorMessage: error })
    }
}

module.exports = { login }