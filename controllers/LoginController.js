const { HttpStatusCode } = require("axios");
const User = require("../models/UserModel");
const nodemailer = require('nodemailer')
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWD, // Your email password or app-specific password
    },
});

function sendVerificationLink(email, id) {
    try {
        // Load the HTML template
        const templatePath = path.join(__dirname.replace('controllers', 'templates'), 'verify_email.ejs');
        const template = fs.readFileSync(templatePath, 'utf-8');

        // Render the template with EJS, replacing placeholders with data
        const renderedHtml = ejs.render(template, { email, id });

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL_TO_SEND,
            subject: 'Please Verify this Email',
            html: renderedHtml,
        };
        return transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        return error;
    }

}

const login = async (req, res) => {
    try {
        const data = await req.body;
        const { email, name, token, image, expiration_time } = await req.body;
        if (data) {
            const user = await User.findOne({ email: email });
            // console.log(user)
            if (user !== null) {
                const savedUser = await User.updateOne({ email: email }, { $set: { token: token, image: image } });
                const userModified = await User.findOne({ email: email });
                // console.log(savedUser)
                if (userModified.logged_in == 2) {
                    sendVerificationLink(savedUser.email, savedUser['_id']);
                }
                return res.status(200).json({ message: 'successfully', data: userModified, status_code: 200 })
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    token: token,
                    role: 2,
                    image: image,
                    logged_in: 2
                });
                const savedUser = await newUser.save();

                sendVerificationLink(savedUser.email, savedUser['_id']);
                return res.status(200).json({ message: 'successfully', data: savedUser, status_code: 200 });
            }
        } else {
            return res.status(500).json({ errorMessage: 'No Data' })
        }
    } catch (error) {
        return Response.json({ errorMessage: error })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const id = await req.params.id;
        if (id) {
            const savedUser = await User.findByIdAndUpdate({ _id: id }, { $set: { logged_in: 1 } });
            return res.status(200).json({ message: 'successfully', statusCode: 200 });
        }
        return res.status(400).json({ message: 'id not found', statusCode: 400 })
    } catch (error) {
        return res.status(400).json({ errorMessage: error, statusCode: 400 });
    }
}

module.exports = { login, verifyEmail }