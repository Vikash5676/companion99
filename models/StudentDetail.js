const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Number, required: true },
    dob: { type: String, required: true },
    interest: { type: String, required: true },
    institute_name: { type: String, required: true },
    degree: { type: Number },
    year: { type: Number },
    branch: { type: String }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const StudentDetail = mongoose.model('StudentDetail', StudentSchema);
module.exports = StudentDetail