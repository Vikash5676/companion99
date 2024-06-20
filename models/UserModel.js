const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    logged_in: { type: Number, required: true },
    otp: { type: String },
    token: { type: String },
    role: { type: Number, required: true, default: 1 },
    student_detail: { type: Number, required: true, default: 1 },
    image: { type: String }

}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const User = mongoose.model('User', UserSchema);
module.exports = User